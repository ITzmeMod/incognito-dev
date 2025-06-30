
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Terminal, Code, Shield } from "lucide-react";
import { StatusDialog } from "@/components/StatusDialog";
import { RealTimeStats } from "@/components/RealTimeStats";
import { FloatingElements } from "@/components/FloatingElements";
import { Footer } from "@/components/Footer";
import { IntroScreen } from "@/components/IntroScreen";
import { AuthButton } from "@/components/AuthButton";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [showIntro, setShowIntro] = useState(true);
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [connectionInfo, setConnectionInfo] = useState<any>(null);
  const [activeUsers, setActiveUsers] = useState(42);
  const [realTimeClicks, setRealTimeClicks] = useState(1337);

  useEffect(() => {
    // Detect real connection information
    const detectConnection = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const isSecure = location.protocol === 'https:';
      const hasVPN = Math.random() > 0.7;
      
      setConnectionInfo({
        isSecure,
        protocol: location.protocol,
        hostname: location.hostname,
        connectionType: connection?.effectiveType || 'unknown',
        downlink: connection?.downlink || 'unknown',
        rtt: connection?.rtt || 'unknown',
        hasVPN,
        userAgent: navigator.userAgent.substring(0, 50) + '...'
      });
    };

    detectConnection();
    
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
      setRealTimeClicks(prev => prev + Math.floor(Math.random() * 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (showIntro) {
    return <IntroScreen onComplete={() => setShowIntro(false)} />;
  }

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      {/* Auth Button - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <AuthButton />
      </div>

      {/* Admin Dashboard Link - Only show for admins */}
      {isAdmin && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={() => navigate('/admin')}
            className="bg-red-600 hover:bg-red-500 text-white font-mono"
          >
            <Shield className="w-4 h-4 mr-2" />
            Admin Dashboard
          </Button>
        </div>
      )}

      {/* Real-time stats */}
      <RealTimeStats activeUsers={activeUsers} realTimeClicks={realTimeClicks} />

      {/* Matrix-style background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBmZjAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMiIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header with glowing effect */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Terminal className="w-12 h-12 text-cyan-400 mr-4 animate-pulse" />
            <h1 className="text-6xl md:text-8xl font-mono font-bold bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 bg-clip-text text-transparent animate-pulse">
              INCOGNITO
            </h1>
          </div>
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>
        </div>

        <div className="text-center mb-12">
          <p className="text-xl md:text-2xl text-cyan-300 font-mono mb-4">
            {">"} Underground Script Repository
          </p>
          <p className="text-green-500 font-mono text-lg">
            Access Level: <span className="text-red-400 animate-pulse">CLASSIFIED</span>
          </p>
        </div>

        <div className="text-center mb-8 max-w-2xl">
          <p className="text-gray-400 font-mono text-sm leading-relaxed">
            Welcome to the most secure underground script repository. All scripts are tested, 
            verified and anonymously distributed through encrypted channels. Your identity 
            remains protected through our advanced tunneling protocols.
          </p>
        </div>

        <div className="text-center">
          <Button
            onClick={() => navigate('/scripts')}
            className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black font-mono text-xl px-12 py-6 rounded-lg border-2 border-green-400 shadow-lg shadow-green-400/50 hover:shadow-green-400/70 transition-all duration-300 transform hover:scale-105"
          >
            <Code className="w-6 h-6 mr-3" />
            Get the Script!
          </Button>
        </div>

        <div className="mt-16 flex space-x-8 text-sm font-mono">
          <StatusDialog
            dialogKey="secure"
            title="REAL-TIME CONNECTION STATUS"
            activeDialog={activeDialog}
            setActiveDialog={setActiveDialog}
            connectionInfo={connectionInfo}
            trigger={
              <button className="flex items-center text-green-400 hover:text-green-300 transition-colors cursor-pointer group">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2 group-hover:bg-green-300"></div>
                SECURE CONNECTION
              </button>
            }
          />

          <StatusDialog
            dialogKey="encrypted"
            title="ENCRYPTION TUNNEL ANALYSIS"
            activeDialog={activeDialog}
            setActiveDialog={setActiveDialog}
            connectionInfo={connectionInfo}
            trigger={
              <button className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2 group-hover:bg-cyan-300"></div>
                ENCRYPTED TUNNEL
              </button>
            }
          />

          <StatusDialog
            dialogKey="anonymous"
            title="ANONYMITY ANALYSIS"
            activeDialog={activeDialog}
            setActiveDialog={setActiveDialog}
            connectionInfo={connectionInfo}
            trigger={
              <button className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer group">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-2 group-hover:bg-yellow-300"></div>
                ANONYMOUS MODE
              </button>
            }
          />
        </div>

        <div className="mt-12 text-center max-w-xl">
          <p className="text-gray-600 font-mono text-xs leading-relaxed mb-4">
            By accessing this repository, you agree to use all scripts for educational 
            and authorized testing purposes only. Users are responsible for compliance 
            with local laws and regulations. Unauthorized usage is strictly prohibited.
          </p>
          <p className="text-gray-500 font-mono text-xs">
            This platform employs advanced security measures including real-time threat detection,
            encrypted communications, and comprehensive audit logging to ensure user safety.
          </p>
        </div>
      </div>

      <FloatingElements connectionInfo={connectionInfo} />
      <Footer activeDialog={activeDialog} setActiveDialog={setActiveDialog} />
    </div>
  );
};

export default Index;
