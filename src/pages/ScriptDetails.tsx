
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar, 
  ExternalLink, 
  Play, 
  Download, 
  Eye,
  Shield,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const ScriptDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [script, setScript] = useState<any>(null);

  useEffect(() => {
    // Simulate fetching script details
    const mockScript = {
      id: id,
      title: `Advanced Script ${id}`,
      description: `This is a comprehensive security testing script designed for ethical hacking and penetration testing. The script includes multiple modules for network scanning, vulnerability assessment, and system enumeration. All functions are designed with stealth capabilities and advanced evasion techniques.

Features include:
• Multi-threaded scanning capabilities
• Custom payload generation
• Anti-detection mechanisms
• Comprehensive logging system
• Advanced exploitation techniques
• Post-exploitation modules`,
      uploadDate: "2025-01-15",
      status: Math.random() > 0.5 ? "Updated" : Math.random() > 0.5 ? "Working" : "Outdated",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
      youtubeLink: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      downloadLink: "https://link.example.com/script-download",
      clickCount: Math.floor(Math.random() * 5000) + 100,
      category: "Network Security",
      author: "Anonymous",
      version: "v2.1.3",
      language: "Python",
      requirements: ["python3", "nmap", "metasploit"],
      tags: ["penetration-testing", "network-scanning", "ethical-hacking"]
    };
    setScript(mockScript);
    setClickCount(mockScript.clickCount);
  }, [id]);

  const handleDownload = () => {
    setClickCount(prev => prev + 1);
    // Track click in real-time
    console.log(`Script ${id} downloaded. Total clicks: ${clickCount + 1}`);
    // Redirect to external link
    window.open(script?.downloadLink, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Updated": return "bg-green-500";
      case "Working": return "bg-blue-500";
      case "Outdated": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Updated": return <CheckCircle className="w-4 h-4" />;
      case "Working": return <Shield className="w-4 h-4" />;
      case "Outdated": return <AlertTriangle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  if (!script) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center">
        <div className="text-xl font-mono animate-pulse">LOADING SCRIPT DATA...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400">
      {/* Header */}
      <div className="border-b border-green-400/30 bg-black/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={() => navigate('/scripts')}
              className="border-green-400 text-green-400 hover:bg-green-400/20 font-mono"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              BACK TO SCRIPTS
            </Button>
            <div className="text-cyan-400 font-mono text-sm">
              Script ID: {script.id}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Status */}
            <div>
              <h1 className="text-4xl font-mono font-bold text-green-400 mb-4">
                {script.title}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <Badge className={`${getStatusColor(script.status)} text-white font-mono`}>
                  {getStatusIcon(script.status)}
                  <span className="ml-1">{script.status}</span>
                </Badge>
                <div className="flex items-center text-gray-400 font-mono text-sm">
                  <Calendar className="w-4 h-4 mr-1" />
                  {script.uploadDate}
                </div>
                <div className="flex items-center text-cyan-400 font-mono text-sm">
                  <Download className="w-4 h-4 mr-1" />
                  {clickCount.toLocaleString()} downloads
                </div>
              </div>
            </div>

            {/* Script Image */}
            {script.image && (
              <Card className="bg-gray-900 border-green-400/30">
                <CardContent className="p-0">
                  <img
                    src={script.image}
                    alt={script.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </CardContent>
              </Card>
            )}

            {/* Description */}
            <Card className="bg-gray-900 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-400 font-mono">DESCRIPTION</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                  {script.description}
                </pre>
              </CardContent>
            </Card>

            {/* YouTube Video */}
            {script.youtubeLink && (
              <Card className="bg-gray-900 border-green-400/30">
                <CardHeader>
                  <CardTitle className="text-green-400 font-mono flex items-center">
                    <Play className="w-5 h-5 mr-2" />
                    DEMONSTRATION VIDEO
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video">
                    <iframe
                      src={script.youtubeLink.replace('watch?v=', 'embed/')}
                      className="w-full h-full rounded border border-green-400/30"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Download Action */}
            <Card className="bg-gray-900 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-400 font-mono">GET SCRIPT</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  onClick={handleDownload}
                  className="w-full bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black font-mono text-lg py-3"
                >
                  <Download className="w-5 h-5 mr-2" />
                  GET SCRIPT NOW
                </Button>
                <div className="text-xs text-gray-400 font-mono text-center">
                  Secure download via encrypted proxy
                </div>
              </CardContent>
            </Card>

            {/* Script Info */}
            <Card className="bg-gray-900 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-400 font-mono text-sm">SCRIPT INFO</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Version:</span>
                  <span className="text-cyan-400">{script.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span className="text-cyan-400">{script.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-cyan-400">{script.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Author:</span>
                  <span className="text-cyan-400">{script.author}</span>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card className="bg-gray-900 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-400 font-mono text-sm">REQUIREMENTS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {script.requirements.map((req: string, index: number) => (
                    <div key={index} className="text-cyan-400 font-mono text-sm">
                      • {req}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="bg-gray-900 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-400 font-mono text-sm">TAGS</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {script.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-cyan-400 text-cyan-400 font-mono text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Real-time Stats */}
            <Card className="bg-gray-900 border-green-400/30">
              <CardHeader>
                <CardTitle className="text-green-400 font-mono text-sm">LIVE STATS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm font-mono">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Downloads:</span>
                  <span className="text-green-400 animate-pulse">{clickCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last 24h:</span>
                  <span className="text-cyan-400">+{Math.floor(clickCount * 0.1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Success Rate:</span>
                  <span className="text-green-400">98.7%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptDetails;
