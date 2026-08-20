/**
 * The Ochre Lifestyle - Security & Defense Utilities
 * Provides input sanitization, XSS mitigation, strict character limiting,
 * prototype pollution defense, rate limiting, and secure storage handling.
 */

// 1. Text & HTML Sanitization (Prevents XSS, Script Injections, Control Character Exploits)
export function sanitizeText(input: unknown, maxLength = 250): string {
  if (typeof input !== 'string') return '';
  
  // Remove null bytes, control characters, script/iframe/event handler fragments
  const cleaned = input
    .replace(/\0/g, '') // Null bytes
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '') // Control chars
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Strip script tags
    .replace(/<[^>]*>?/gm, '') // Strip arbitrary HTML tags
    .replace(/javascript:/gi, '') // Strip JS protocol
    .replace(/data:\s*text\/html/gi, '') // Strip data HTML
    .replace(/on\w+\s*=/gi, ''); // Strip inline event handlers like onerror=, onclick=

  return cleaned.slice(0, maxLength);
}

// 2. Email Sanitization & Validation
export function sanitizeEmail(email: unknown, maxLength = 100): string {
  if (typeof email !== 'string') return '';
  const trimmed = email.trim().toLowerCase().slice(0, maxLength);
  // Remove dangerous control characters and quotes
  return trimmed.replace(/[<>\'"\\`\s]/g, '');
}

export function isValidEmail(email: string): boolean {
  if (!email || email.length > 100) return false;
  // RFC 5322 standard compliant lightweight regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email);
}

// 3. Phone Number Sanitization & Validation
export function sanitizePhone(phone: unknown, maxLength = 20): string {
  if (typeof phone !== 'string') return '';
  // Only permit digits, +, spaces, hyphens, and parentheses
  return phone.replace(/[^0-9+\s\-()]/g, '').slice(0, maxLength);
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}

// 4. Indian PIN Code Sanitization & Validation
export function sanitizePincode(pincode: unknown): string {
  if (typeof pincode !== 'string') return '';
  // Only digits, maximum 6 chars
  return pincode.replace(/\D/g, '').slice(0, 6);
}

export function isValidPincode(pincode: string): boolean {
  return /^[1-9][0-9]{5}$/.test(pincode);
}

// 5. Order Tracking / Reference Code Sanitizer
export function sanitizeOrderCode(code: unknown, maxLength = 30): string {
  if (typeof code !== 'string') return '';
  // Only uppercase alphanumeric and hyphens
  return code.toUpperCase().replace(/[^A-Z0-9\-]/g, '').slice(0, maxLength);
}

// 6. Coupon Code Sanitizer
export function sanitizeCouponCode(coupon: unknown, maxLength = 20): string {
  if (typeof coupon !== 'string') return '';
  return coupon.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, maxLength);
}

// 7. Search Query Sanitizer (Regex-safe escaping)
export function sanitizeSearchQuery(query: unknown, maxLength = 60): string {
  if (typeof query !== 'string') return '';
  // Strip control chars, limit length, prevent regex special crashes
  return query
    .replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, ' ')
    .replace(/[<>{}[\]]/g, '')
    .slice(0, maxLength);
}

// 8. Number Bound Clamping (Prevents NaN, Infinity, Negative Exploits, Buffer Overflows)
export function clampNumber(value: unknown, min: number, max: number, defaultValue: number): number {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    if (typeof value === 'string') {
      const parsed = parseFloat(value);
      if (!isNaN(parsed) && isFinite(parsed)) {
        return Math.min(Math.max(parsed, min), max);
      }
    }
    return defaultValue;
  }
  return Math.min(Math.max(value, min), max);
}

export function sanitizeNumber(value: unknown, min = 0, max = 100000000, fallback = 0): number {
  return clampNumber(value, min, max, fallback);
}

// 9. Safe LocalStorage Operations (With Prototype Pollution & JSON Bomb Defense)
export const safeStorage = {
  getItem: <T>(key: string, fallback: T): T => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return fallback;
      const raw = window.localStorage.getItem(key);
      if (!raw) return fallback;
      
      // Prevent massive JSON payloads (> 1MB) from causing memory exhaustion (JSON bomb)
      if (raw.length > 1048576) {
        window.localStorage.removeItem(key);
        return fallback;
      }

      const parsed = JSON.parse(raw, (k, v) => {
        // Prototype pollution defense
        if (k === '__proto__' || k === 'constructor' || k === 'prototype') {
          return undefined;
        }
        return v;
      });

      return parsed as T;
    } catch (e) {
      console.warn(`[Security] SafeStorage parse failed for key: ${key}`, e);
      return fallback;
    }
  },

  setItem: (key: string, value: unknown): boolean => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return false;
      
      // Strip prototype polluters before serializing
      const serialized = JSON.stringify(value, (k, v) => {
        if (k === '__proto__' || k === 'constructor' || k === 'prototype') {
          return undefined;
        }
        return v;
      });

      // Limit key value size to 512KB per key
      if (serialized.length > 524288) {
        console.warn(`[Security] Payload too large for key: ${key}`);
        return false;
      }

      window.localStorage.setItem(key, serialized);
      return true;
    } catch (e) {
      console.warn(`[Security] SafeStorage set failed for key: ${key}`, e);
      return false;
    }
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`[Security] SafeStorage remove failed for key: ${key}`, e);
    }
  },
};

// 10. Client-Side Rate Limiter & Cooldown Protection (Prevents automated form submission spam)
class ClientRateLimiter {
  private timestamps: Map<string, number[]> = new Map();

  /**
   * Checks if an action is permitted within rate limit thresholds.
   * @param actionKey Unique identifier for the action (e.g. 'contact-form', 'coupon-check')
   * @param maxAttempts Max allowed attempts within the window
   * @param windowMs Time window in milliseconds
   */
  public isAllowed(actionKey: string, maxAttempts = 5, windowMs = 60000): { allowed: boolean; waitSeconds?: number } {
    const now = Date.now();
    const attempts = this.timestamps.get(actionKey) || [];
    
    // Filter attempts within the time window
    const validAttempts = attempts.filter((t) => now - t < windowMs);
    
    if (validAttempts.length >= maxAttempts) {
      const oldest = validAttempts[0];
      const waitSeconds = Math.ceil((windowMs - (now - oldest)) / 1000);
      return { allowed: false, waitSeconds: Math.max(1, waitSeconds) };
    }

    validAttempts.push(now);
    this.timestamps.set(actionKey, validAttempts);
    return { allowed: true };
  }
}

export const rateLimiter = new ClientRateLimiter();
