
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Terminal, Code, Zap, Shield, Lock, Eye } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);

  const StatusDialog = ({ 
    trigger, 
    title, 
    children, 
    dialogKey 
  }: { 
    trigger: React.ReactNode; 
    title: string; 
    children: React.ReactNode;
    dialogKey: string;
  }) => (
    <Dialog open={activeDialog === dialogKey} onOpenChange={(open) => setActiveDialog(open ? dialogKey : null)}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="bg-black border-green-400 text-green-400 font-mono max-w-md">
        <DialogHeader>
          <DialogTitle className="text-green-400 font-mono text-lg">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
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

        {/* Subtitle */}
        <div className="text-center mb-12">
          <p className="text-xl md:text-2xl text-cyan-300 font-mono mb-4">
            {">"} Underground Script Repository
          </p>
          <p className="text-green-500 font-mono text-lg">
            Access Level: <span className="text-red-400 animate-pulse">CLASSIFIED</span>
          </p>
        </div>

        {/* Description */}
        <div className="text-center mb-8 max-w-2xl">
          <p className="text-gray-400 font-mono text-sm leading-relaxed">
            Welcome to the most secure underground script repository. All scripts are tested, 
            verified and anonymously distributed through encrypted channels. Your identity 
            remains protected through our advanced tunneling protocols.
          </p>
        </div>

        {/* Main action button */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/scripts')}
            className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black font-mono text-xl px-12 py-6 rounded-lg border-2 border-green-400 shadow-lg shadow-green-400/50 hover:shadow-green-400/70 transition-all duration-300 transform hover:scale-105"
          >
            <Code className="w-6 h-6 mr-3" />
            PROVIDE ME A SCHEMA: GET SCRIPT
          </Button>
        </div>

        {/* Interactive status indicators */}
        <div className="mt-16 flex space-x-8 text-sm font-mono">
          <StatusDialog
            dialogKey="secure"
            title="CONNECTION STATUS"
            trigger={
              <button className="flex items-center text-green-400 hover:text-green-300 transition-colors cursor-pointer group">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2 group-hover:bg-green-300"></div>
                SECURE CONNECTION
              </button>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center text-green-400">
                <Shield className="w-5 h-5 mr-2" />
                <span>TLS 1.3 ENCRYPTION ACTIVE</span>
              </div>
              <div className="text-cyan-400 text-xs">
                {">"} Certificate: VALID (SHA-256)
                <br />
                {">"} Protocol: HTTPS/2.0
                <br />
                {">"} Cipher: AES-256-GCM
                <br />
                {">"} Key Exchange: ECDHE-RSA
              </div>
              <div className="text-green-500 text-xs animate-pulse">
                CONNECTION IS SECURE ✓
              </div>
            </div>
          </StatusDialog>

          <StatusDialog
            dialogKey="encrypted"
            title="TUNNEL STATUS"
            trigger={
              <button className="flex items-center text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer group">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2 group-hover:bg-cyan-300"></div>
                ENCRYPTED TUNNEL
              </button>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center text-cyan-400">
                <Lock className="w-5 h-5 mr-2" />
                <span>END-TO-END ENCRYPTION</span>
              </div>
              <div className="text-green-400 text-xs">
                {">"} Tunnel Type: SECURE_PROXY
                <br />
                {">"} Encryption: AES-256-CBC
                <br />
                {">"} Routing: MULTI-HOP VPN
                <br />
                {">"} DNS: ENCRYPTED (DoH)
              </div>
              <div className="text-cyan-500 text-xs animate-pulse">
                CONNECTION IS ENCRYPTED ✓
              </div>
            </div>
          </StatusDialog>

          <StatusDialog
            dialogKey="anonymous"
            title="STEALTH MODE"
            trigger={
              <button className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer group">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-2 group-hover:bg-yellow-300"></div>
                ANONYMOUS MODE
              </button>
            }
          >
            <div className="space-y-4">
              <div className="flex items-center text-yellow-400">
                <Eye className="w-5 h-5 mr-2" />
                <span>STEALTH PROTOCOLS ACTIVE</span>
              </div>
              <div className="text-red-400 text-xs">
                {">"} IP Address: MASKED
                <br />
                {">"} Browser Fingerprint: SPOOFED
                <br />
                {">"} DNS Queries: RANDOMIZED
                <br />
                {">"} Traffic Pattern: OBFUSCATED
              </div>
              <div className="text-yellow-500 text-xs animate-pulse">
                SCRIPT IS UNDETECTABLE ✓
              </div>
            </div>
          </StatusDialog>
        </div>

        {/* Policy Notice */}
        <div className="mt-12 text-center max-w-xl">
          <p className="text-gray-600 font-mono text-xs leading-relaxed">
            By accessing this repository, you agree to use all scripts for educational 
            and authorized testing purposes only. Users are responsible for compliance 
            with local laws and regulations. Unauthorized usage is strictly prohibited.
          </p>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 text-green-400 font-mono text-xs opacity-50 animate-pulse">
        {">"} root@incognito:~$
      </div>
      <div className="absolute bottom-20 right-10 text-cyan-400 font-mono text-xs opacity-50 animate-pulse">
        {">"} connection_secure=true
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-green-400/30 bg-black/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs font-mono">
            <div className="text-green-400 mb-2 md:mb-0">
              INCOGNITO © 2025 - UNDERGROUND SCRIPT REPOSITORY
            </div>
            <div className="flex space-x-4 text-gray-500">
              <span>PRIVACY POLICY</span>
              <span>•</span>
              <span>TERMS OF SERVICE</span>
              <span>•</span>
              <span>CONTACT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
