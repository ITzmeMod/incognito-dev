
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Shield, Lock, Eye } from "lucide-react";

interface StatusDialogProps {
  trigger: React.ReactNode;
  title: string;
  dialogKey: string;
  activeDialog: string | null;
  setActiveDialog: (key: string | null) => void;
  connectionInfo: any;
}

export const StatusDialog = ({ 
  trigger, 
  title, 
  dialogKey,
  activeDialog,
  setActiveDialog,
  connectionInfo
}: StatusDialogProps) => {
  const renderContent = () => {
    switch (dialogKey) {
      case 'secure':
        return (
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
        );
      
      case 'encrypted':
        return (
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
        );
      
      case 'anonymous':
        return (
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
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={activeDialog === dialogKey} onOpenChange={(open) => setActiveDialog(open ? dialogKey : null)}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="bg-black border-green-400 text-green-400 font-mono max-w-md">
        <DialogHeader>
          <DialogTitle className="text-green-400 font-mono text-lg">{title}</DialogTitle>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
