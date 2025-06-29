
import { PolicyDialog } from "./PolicyDialog";

interface FooterProps {
  activeDialog: string | null;
  setActiveDialog: (key: string | null) => void;
}

export const Footer = ({ activeDialog, setActiveDialog }: FooterProps) => (
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
            activeDialog={activeDialog}
            setActiveDialog={setActiveDialog}
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
            activeDialog={activeDialog}
            setActiveDialog={setActiveDialog}
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
            activeDialog={activeDialog}
            setActiveDialog={setActiveDialog}
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
);
