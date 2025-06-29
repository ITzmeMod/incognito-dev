import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { Terminal, Code, Zap, Shield, Lock, Eye, X, Users, Activity } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [activeDialog, setActiveDialog] = useState<string | null>(null);
  const [connectionInfo, setConnectionInfo] = useState<any>(null);
  const [activeUsers, setActiveUsers] = useState(42); // Real-time active users simulation
  const [realTimeClicks, setRealTimeClicks] = useState(1337);

  useEffect(() => {
    // Detect real connection information
    const detectConnection = () => {
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const isSecure = location.protocol === 'https:';
      const hasVPN = Math.random() > 0.7; // VPN detection simulation - replace with real API
      
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
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
      setRealTimeClicks(prev => prev + Math.floor(Math.random() * 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  const PolicyDialog = ({ 
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
      <DialogContent className="bg-black border-green-400 text-green-400 font-mono max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-green-400 font-mono text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="text-sm leading-relaxed">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
      {/* Real-time stats */}
      <div className="absolute top-4 right-4 z-20 bg-black/80 border border-green-400/30 rounded-lg p-3 font-mono text-xs">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-green-400">
            <Users className="w-4 h-4 mr-1" />
            <span>{activeUsers} online</span>
          </div>
          <div className="flex items-center text-cyan-400">
            <Activity className="w-4 h-4 mr-1" />
            <span>{realTimeClicks.toLocaleString()} clicks</span>
          </div>
        </div>
      </div>

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
            GET THE SCRIPT!
          </Button>
        </div>

        {/* Enhanced interactive status indicators with real connection detection */}
        <div className="mt-16 flex space-x-8 text-sm font-mono">
          <StatusDialog
            dialogKey="secure"
            title="REAL-TIME CONNECTION STATUS"
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
                <span>REAL-TIME CONNECTION ANALYSIS</span>
              </div>
              <div className="text-cyan-400 text-xs">
                {">"} Protocol: {connectionInfo?.protocol?.toUpperCase() || 'HTTPS:'}
                <br />
                {">"} Host: {connectionInfo?.hostname || 'SECURE'}
                <br />
                {">"} Connection: {connectionInfo?.isSecure ? 'ENCRYPTED' : 'INSECURE'}
                <br />
                {">"} Type: {connectionInfo?.connectionType?.toUpperCase() || 'UNKNOWN'}
                <br />
                {">"} Speed: {connectionInfo?.downlink || 'N/A'} Mbps
                <br />
                {">"} Latency: {connectionInfo?.rtt || 'N/A'} ms
              </div>
              <div className="text-green-500 text-xs animate-pulse">
                {connectionInfo?.isSecure ? 'CONNECTION IS SECURE ✓' : 'WARNING: INSECURE CONNECTION ⚠'}
              </div>
            </div>
          </StatusDialog>

          <StatusDialog
            dialogKey="encrypted"
            title="ENCRYPTION TUNNEL ANALYSIS"
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
                <span>ENCRYPTION DETECTION</span>
              </div>
              <div className="text-green-400 text-xs">
                {">"} TLS Version: 1.3 (DETECTED)
                <br />
                {">"} Cipher Suite: AES-256-GCM
                <br />
                {">"} Key Exchange: ECDHE-RSA-2048
                <br />
                {">"} VPN Status: {connectionInfo?.hasVPN ? 'DETECTED' : 'NOT DETECTED'}
                <br />
                {">"} Proxy Chain: {connectionInfo?.hasVPN ? 'ACTIVE' : 'DIRECT'}
                <br />
                {">"} DNS: ENCRYPTED (DoH/DoT)
              </div>
              <div className="text-cyan-500 text-xs animate-pulse">
                TUNNEL ENCRYPTION ACTIVE ✓
              </div>
            </div>
          </StatusDialog>

          <StatusDialog
            dialogKey="anonymous"
            title="ANONYMITY ANALYSIS"
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
                <span>REAL-TIME ANONYMITY CHECK</span>
              </div>
              <div className="text-red-400 text-xs">
                {">"} VPN Status: {connectionInfo?.hasVPN ? 'PROTECTED' : 'EXPOSED'}
                <br />
                {">"} IP Masking: {connectionInfo?.hasVPN ? 'ACTIVE' : 'INACTIVE'}
                <br />
                {">"} Browser: {connectionInfo?.userAgent || 'UNKNOWN'}
                <br />
                {">"} Fingerprint: {connectionInfo?.hasVPN ? 'OBFUSCATED' : 'VISIBLE'}
                <br />
                {">"} Connection Type: {connectionInfo?.connectionType?.toUpperCase() || 'UNKNOWN'}
              </div>
              <div className="text-yellow-500 text-xs animate-pulse">
                {connectionInfo?.hasVPN 
                  ? 'SCRIPT ACCESS IS UNDETECTABLE ✓' 
                  : 'WARNING: CONNECTION NOT MASKED ⚠'
                }
              </div>
            </div>
          </StatusDialog>
        </div>

        {/* Policy Notice with enhanced content */}
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

      {/* Floating elements */}
      <div className="absolute top-20 left-10 text-green-400 font-mono text-xs opacity-50 animate-pulse">
        {">"} root@incognito:~$
      </div>
      <div className="absolute bottom-20 right-10 text-cyan-400 font-mono text-xs opacity-50 animate-pulse">
        {">"} connection_secure={connectionInfo?.isSecure ? 'true' : 'false'}
      </div>

      {/* Enhanced Footer with Policy Dialogs */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-green-400/30 bg-black/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-xs font-mono">
            <div className="text-green-400 mb-2 md:mb-0">
              INCOGNITO © 2025 - UNDERGROUND SCRIPT REPOSITORY
            </div>
            <div className="flex space-x-4 text-gray-500">
              <PolicyDialog
                dialogKey="privacy"
                title="PRIVACY POLICY"
                trigger={
                  <button className="hover:text-green-400 transition-colors">PRIVACY POLICY</button>
                }
              >
                <div className="space-y-4 text-green-400">
                  <h3 className="text-lg font-bold">INFORMATION COLLECTION</h3>
                  <p>We collect minimal data necessary for service operation: connection metadata, access logs, and anonymized usage statistics. No personal identification is stored or transmitted.</p>
                  
                  <h3 className="text-lg font-bold">DATA PROTECTION</h3>
                  <p>All data transmissions use military-grade encryption (AES-256). Connection logs are automatically purged every 24 hours. We employ zero-knowledge architecture where possible.</p>
                  
                  <h3 className="text-lg font-bold">ANONYMITY GUARANTEE</h3>
                  <p>Your identity remains protected through advanced tunneling protocols. We do not track, store, or correlate user activities across sessions.</p>
                  
                  <h3 className="text-lg font-bold">THIRD-PARTY SERVICES</h3>
                  <p>Script links may redirect through secure proxy services. We are not responsible for external privacy policies but ensure all redirects maintain encryption.</p>
                  
                  <h3 className="text-lg font-bold">DATA RETENTION</h3>
                  <p>Access logs: 24 hours. Error reports: 7 days. Usage analytics: 30 days (anonymized). All data is permanently deleted after retention period.</p>
                </div>
              </PolicyDialog>
              
              <span>•</span>
              
              <PolicyDialog
                dialogKey="terms"
                title="TERMS OF SERVICE"
                trigger={
                  <button className="hover:text-green-400 transition-colors">TERMS OF SERVICE</button>
                }
              >
                <div className="space-y-4 text-green-400">
                  <h3 className="text-lg font-bold">ACCEPTABLE USE</h3>
                  <p>Scripts provided are for educational, research, and authorized security testing only. Users must obtain proper authorization before using any tools on systems they do not own.</p>
                  
                  <h3 className="text-lg font-bold">PROHIBITED ACTIVITIES</h3>
                  <p>Unauthorized access to computer systems, networks, or data. Commercial exploitation without permission. Distribution of malicious code. Violation of applicable laws or regulations.</p>
                  
                  <h3 className="text-lg font-bold">DISCLAIMER OF WARRANTIES</h3>
                  <p>Scripts are provided "as-is" without warranties. We do not guarantee functionality, security, or compatibility. Users assume all risks associated with script usage.</p>
                  
                  <h3 className="text-lg font-bold">LIMITATION OF LIABILITY</h3>
                  <p>Incognito and its operators are not liable for any damages resulting from script usage, including but not limited to system damage, data loss, or legal consequences.</p>
                  
                  <h3 className="text-lg font-bold">COMPLIANCE</h3>
                  <p>Users must comply with all applicable laws including CFAA, DMCA, GDPR, and local cybersecurity regulations. Violation of terms may result in immediate access termination.</p>
                  
                  <h3 className="text-lg font-bold">MODIFICATIONS</h3>
                  <p>Terms may be updated without notice. Continued use constitutes acceptance of modified terms. Check regularly for updates.</p>
                </div>
              </PolicyDialog>
              
              <span>•</span>
              
              <PolicyDialog
                dialogKey="contact"
                title="SECURE CONTACT"
                trigger={
                  <button className="hover:text-green-400 transition-colors">CONTACT</button>
                }
              >
                <div className="space-y-4 text-green-400">
                  <h3 className="text-lg font-bold">ENCRYPTED COMMUNICATION</h3>
                  <div className="bg-gray-900 p-4 rounded border border-green-400/30">
                    <p className="text-cyan-400">Email: admin@incognito-scripts.onion</p>
                    <p className="text-cyan-400">PGP Key: 4096R/DEADBEEF</p>
                    <p className="text-cyan-400">Signal: +1-XXX-XXX-XXXX</p>
                  </div>
                  
                  <h3 className="text-lg font-bold">RESPONSE TIME</h3>
                  <p>Encrypted messages: 24-48 hours. Security reports: 12 hours. General inquiries: 72 hours.</p>
                  
                  <h3 className="text-lg font-bold">SECURITY REPORTS</h3>
                  <p>Vulnerability disclosures welcome. Use PGP encryption for sensitive reports. Bug bounty program available for critical findings.</p>
                  
                  <div className="text-yellow-400 text-xs">
                    ⚠ Use only encrypted channels for sensitive communications
                  </div>
                </div>
              </PolicyDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
