
import { useEffect, useState } from "react";

interface SecurityProviderProps {
  children: React.ReactNode;
}

export const SecurityProvider = ({ children }: SecurityProviderProps) => {
  const [isSecure, setIsSecure] = useState(false);
  const [honeypotValue, setHoneypotValue] = useState("");
  const [rateLimitCount, setRateLimitCount] = useState(0);

  useEffect(() => {
    // Set security headers
    const setSecurityHeaders = () => {
      const meta = document.createElement('meta');
      meta.httpEquiv = "Content-Security-Policy";
      meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;";
      document.head.appendChild(meta);

      // X-Frame-Options
      const xFrame = document.createElement('meta');
      xFrame.httpEquiv = "X-Frame-Options";
      xFrame.content = "DENY";
      document.head.appendChild(xFrame);

      // X-Content-Type-Options
      const xContent = document.createElement('meta');
      xContent.httpEquiv = "X-Content-Type-Options";
      xContent.content = "nosniff";
      document.head.appendChild(xContent);

      // Referrer Policy
      const referrer = document.createElement('meta');
      referrer.name = "referrer";
      referrer.content = "strict-origin-when-cross-origin";
      document.head.appendChild(referrer);
    };

    // Force HTTPS
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable developer tools shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (e.key === 'F12' || 
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
          (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        return false;
      }
    };

    // Rate limiting
    const handleRateLimit = () => {
      setRateLimitCount(prev => {
        const newCount = prev + 1;
        if (newCount > 100) { // 100 requests per session
          console.warn('Rate limit exceeded');
          return prev;
        }
        return newCount;
      });
    };

    // Bot detection - honeypot
    const createHoneypot = () => {
      const honeypot = document.createElement('input');
      honeypot.type = 'text';
      honeypot.name = 'email_address';
      honeypot.style.position = 'absolute';
      honeypot.style.left = '-9999px';
      honeypot.style.opacity = '0';
      honeypot.tabIndex = -1;
      honeypot.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        if (target.value) {
          console.warn('Bot detected via honeypot');
          setHoneypotValue(target.value);
        }
      });
      document.body.appendChild(honeypot);
    };

    // Anti-clickjacking
    if (window.top !== window.self) {
      window.top!.location = window.self.location;
    }

    setSecurityHeaders();
    createHoneypot();
    
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('click', handleRateLimit);

    setIsSecure(true);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('click', handleRateLimit);
    };
  }, []);

  // Block if honeypot is triggered
  if (honeypotValue) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center font-mono">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">ACCESS DENIED</h1>
          <p className="text-xl">Automated access detected</p>
        </div>
      </div>
    );
  }

  // Block if rate limit exceeded
  if (rateLimitCount > 100) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center font-mono">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">RATE LIMIT EXCEEDED</h1>
          <p className="text-xl">Too many requests</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
