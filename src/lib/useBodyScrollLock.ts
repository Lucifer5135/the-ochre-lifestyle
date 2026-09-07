import { useEffect } from 'react';

/**
 * Custom hook to lock body scrolling when a modal or drawer is open.
 * Completely prevents background scroll chaining, iOS Safari rubber-band bleed,
 * and nested scroll traps on both mobile touch devices and desktop mice.
 */
export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;

    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;
    const originalPaddingRight = document.body.style.paddingRight;

    // Calculate scrollbar width to prevent desktop layout shift
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'contain';
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}
