import React, { useState, useEffect } from 'react';
import emblemImg from '../../assets/images/ochre_lifestyle_emblem.png';
import {
  Monitor,
  Download,
  ShieldCheck,
  KeyRound,
  CheckCircle2,
  Lock,
  Sparkles,
  Layers,
  ArrowRight,
  ExternalLink,
  Laptop,
  Check,
  Copy
} from 'lucide-react';

interface PcAppDownloadModalProps {
  onClose?: () => void;
}

export const PcAppDownloadModal: React.FC<PcAppDownloadModalProps> = ({ onClose }) => {
  const [installPromptEvent, setInstallPromptEvent] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [copiedShortcut, setCopiedShortcut] = useState(false);

  useEffect(() => {
    // Check if running in standalone desktop mode
    if (window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPromptEvent(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const [installNotice, setInstallNotice] = useState<string | null>(null);

  const handleInstallClick = async () => {
    if (installPromptEvent) {
      installPromptEvent.prompt();
      const choiceResult = await installPromptEvent.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsInstalled(true);
      }
      setInstallPromptEvent(null);
    } else {
      setInstallNotice(
        'To install on your PC: Click the "Install" icon (💻) in your browser address bar, or click Browser Menu (⋮) → "Install The Ochre Atelier OS". It will instantly launch in a dedicated desktop window!'
      );
      setTimeout(() => setInstallNotice(null), 7000);
    }
  };

  const copyUrl = () => {
    const desktopUrl = `${window.location.origin}/?app=atelier-desktop`;
    navigator.clipboard.writeText(desktopUrl);
    setCopiedShortcut(true);
    setTimeout(() => setCopiedShortcut(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#231B1A] via-[#2B2220] to-[#1C1615] p-6 sm:p-8 rounded-2xl border border-[#C17D3C]/40 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden bg-[#FAF6F0] p-1.5 ring-2 ring-[#C17D3C]/60 shadow-lg shrink-0 flex items-center justify-center">
              <img src={emblemImg} alt="The Ochre Lifestyle Emblem" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C17D3C]/20 border border-[#C17D3C]/40 text-[#C17D3C] text-xs font-semibold uppercase tracking-wider mb-1">
                <Laptop size={14} />
                <span>Standalone Executive PC Software Edition</span>
              </div>
              <div className="text-xs text-[#D8CEBD] font-medium">The Ochre Lifestyle Atelier OS</div>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif text-[#FAF6F0] font-bold">
            Download & Install Ochre Atelier OS on your PC
          </h2>

          <p className="text-sm text-[#D8CEBD] mt-2 leading-relaxed">
            Run your luxury furniture workshop, sales analytics, financial graphs, and inventory management in a dedicated, distraction-free desktop window on your PC. <strong>Completely hidden from public website visitors.</strong>
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              onClick={handleInstallClick}
              className="px-6 py-3 bg-[#C17D3C] hover:bg-[#A8652A] text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <Download size={18} />
              <span>{isInstalled ? 'App Ready in Standalone Mode' : 'Install App to PC Desktop'}</span>
            </button>

            <button
              onClick={copyUrl}
              className="px-4 py-3 bg-[#1C1615] hover:bg-[#2B2220] text-[#FAF6F0] border border-[#3A2E2B] rounded-xl text-xs font-medium flex items-center gap-2 transition-all cursor-pointer"
            >
              {copiedShortcut ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-[#C17D3C]" />}
              <span>{copiedShortcut ? 'Direct Desktop Link Copied!' : 'Copy Direct Desktop URL'}</span>
            </button>
          </div>

          {installNotice && (
            <div className="mt-4 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2.5 animate-in fade-in duration-200">
              <Sparkles size={16} className="text-[#C17D3C] shrink-0 mt-0.5" />
              <span>{installNotice}</span>
            </div>
          )}
        </div>
      </div>

      {/* 3 Steps Guide for Windows & Mac */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Windows 10 & 11 Guide */}
        <div className="bg-[#231B1A] p-6 rounded-2xl border border-amber-900/20 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl">
              <Monitor size={20} />
            </div>
            <div>
              <h3 className="font-serif text-[#FAF6F0] font-bold text-base">Windows 10 / 11 Installation</h3>
              <p className="text-xs text-[#D8CEBD]">Chrome, Microsoft Edge, or Brave on PC</p>
            </div>
          </div>

          <ol className="space-y-3 text-xs text-[#D8CEBD]">
            <li className="flex items-start gap-2.5 p-2.5 bg-[#1C1615] rounded-xl border border-[#3A2E2B]">
              <span className="w-5 h-5 rounded-full bg-[#C17D3C] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
              <div>
                <strong className="text-[#FAF6F0] block">Click the Install Icon</strong>
                <span>Look at the right side of your browser URL bar for the <strong>"Install Ochre Atelier"</strong> icon, or click the 3 dots menu &gt; <em>"Install app"</em>.</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5 p-2.5 bg-[#1C1615] rounded-xl border border-[#3A2E2B]">
              <span className="w-5 h-5 rounded-full bg-[#C17D3C] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
              <div>
                <strong className="text-[#FAF6F0] block">Pin to Windows Taskbar</strong>
                <span>When prompted, check <strong>"Pin to taskbar"</strong> and <strong>"Pin to Start"</strong> for instant 1-click access from your PC desktop.</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5 p-2.5 bg-[#1C1615] rounded-xl border border-[#3A2E2B]">
              <span className="w-5 h-5 rounded-full bg-[#C17D3C] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
              <div>
                <strong className="text-[#FAF6F0] block">Master PIN Secured</strong>
                <span>Opens in a native borderless desktop window protected by your Master PIN (Default: <strong>8921</strong>).</span>
              </div>
            </li>
          </ol>
        </div>

        {/* macOS & Linux Guide */}
        <div className="bg-[#231B1A] p-6 rounded-2xl border border-amber-900/20 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
              <Laptop size={20} />
            </div>
            <div>
              <h3 className="font-serif text-[#FAF6F0] font-bold text-base">macOS & Apple Silicon</h3>
              <p className="text-xs text-[#D8CEBD]">Safari, Chrome, or Edge on Mac</p>
            </div>
          </div>

          <ol className="space-y-3 text-xs text-[#D8CEBD]">
            <li className="flex items-start gap-2.5 p-2.5 bg-[#1C1615] rounded-xl border border-[#3A2E2B]">
              <span className="w-5 h-5 rounded-full bg-[#C17D3C] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
              <div>
                <strong className="text-[#FAF6F0] block">Add to Dock (Safari / Chrome)</strong>
                <span>In Safari: File &gt; <em>"Add to Dock"</em>. In Chrome: Settings &gt; <em>"Install The Ochre Atelier OS"</em>.</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5 p-2.5 bg-[#1C1615] rounded-xl border border-[#3A2E2B]">
              <span className="w-5 h-5 rounded-full bg-[#C17D3C] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
              <div>
                <strong className="text-[#FAF6F0] block">Dedicated App Window</strong>
                <span>Runs as a standalone macOS application in its own Space with full multi-monitor support.</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5 p-2.5 bg-[#1C1615] rounded-xl border border-[#3A2E2B]">
              <span className="w-5 h-5 rounded-full bg-[#C17D3C] text-white font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
              <div>
                <strong className="text-[#FAF6F0] block">Local Offline-Ready Storage</strong>
                <span>All customer database, order histories, and sales reports remain safely stored on your local SSD.</span>
              </div>
            </li>
          </ol>
        </div>
      </div>

      {/* Security & Access Protection Card */}
      <div className="bg-[#231B1A] p-6 rounded-2xl border border-amber-900/20">
        <h3 className="font-serif text-[#FAF6F0] font-bold text-base mb-4 flex items-center gap-2">
          <ShieldCheck size={18} className="text-[#C17D3C]" />
          <span>Executive Security & Isolation Guarantee</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-[#1C1615] rounded-xl border border-[#3A2E2B] space-y-1.5">
            <div className="text-[#C17D3C] font-semibold flex items-center gap-1.5">
              <Lock size={14} />
              <span>Zero Public Footprint</span>
            </div>
            <p className="text-[#9E8E87] leading-relaxed">
              No links or buttons exist on the public customer website. Only you can launch the app.
            </p>
          </div>

          <div className="p-4 bg-[#1C1615] rounded-xl border border-[#3A2E2B] space-y-1.5">
            <div className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <KeyRound size={14} />
              <span>Keyboard Quick Launch</span>
            </div>
            <p className="text-[#9E8E87] leading-relaxed">
              Press <kbd className="px-1.5 py-0.5 bg-[#2B2220] rounded border border-[#3A2E2B] text-white">Ctrl + Shift + A</kbd> anywhere on your PC to summon the console.
            </p>
          </div>

          <div className="p-4 bg-[#1C1615] rounded-xl border border-[#3A2E2B] space-y-1.5">
            <div className="text-blue-400 font-semibold flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>Instant Data Backup</span>
            </div>
            <p className="text-[#9E8E87] leading-relaxed">
              Export encrypted JSON snapshots of all orders, sales graphs, and custom CAD drawings with 1 click.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
