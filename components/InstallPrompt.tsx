import React, { useEffect, useState } from 'react';
import { Icons } from './Icon';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // 检查是否之前已经关闭过提示
      const dismissed = localStorage.getItem('install-prompt-dismissed');
      if (!dismissed) {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA安装成功');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    localStorage.setItem('install-prompt-dismissed', 'true');
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-gradient-to-r from-[#193ce6] to-[#2f54eb] rounded-2xl shadow-2xl p-4 z-50 animate-slide-up">
      <button 
        onClick={handleDismiss}
        className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors"
      >
        <Icons.X size={20} />
      </button>
      
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
          <Icons.Download size={24} className="text-white" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-white font-bold text-base mb-1">
            安装到手机桌面
          </h3>
          <p className="text-white/80 text-sm mb-3">
            添加到主屏幕，像APP一样使用，支持离线访问
          </p>
          
          <div className="flex gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-white text-[#193ce6] font-semibold py-2 px-4 rounded-lg hover:bg-white/90 transition-colors text-sm"
            >
              立即安装
            </button>
            <button
              onClick={handleDismiss}
              className="bg-white/10 text-white font-medium py-2 px-4 rounded-lg hover:bg-white/20 transition-colors text-sm"
            >
              稍后
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
