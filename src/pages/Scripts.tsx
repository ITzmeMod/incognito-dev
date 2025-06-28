
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ArrowDown, Code, File, Link, MessageSquare, Youtube, Zap } from "lucide-react";

interface Script {
  id: string;
  title: string;
  description: string;
  dateUploaded: string;
  status: "Updated" | "Outdated" | "Working";
  link: string;
  imageUrl?: string;
  youtubeUrl?: string;
}

const Scripts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Sample scripts data
  const scripts: Script[] = [
    {
      id: "1",
      title: "Advanced Network Scanner",
      description: "Comprehensive network reconnaissance tool with stealth capabilities and advanced fingerprinting techniques.",
      dateUploaded: "2024-06-25",
      status: "Updated",
      link: "https://work.ink/scanner-v2",
      imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop",
      youtubeUrl: "https://youtube.com/watch?v=example1"
    },
    {
      id: "2",
      title: "Crypto Wallet Analyzer",
      description: "Analyze blockchain transactions and wallet activities with advanced pattern recognition.",
      dateUploaded: "2024-06-20",
      status: "Working",
      link: "https://linkvertise.com/crypto-analyzer",
      imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=200&fit=crop",
    },
    {
      id: "3",
      title: "Social Engineering Toolkit",
      description: "Educational framework for security awareness training and penetration testing.",
      dateUploaded: "2024-06-15",
      status: "Outdated",
      link: "https://work.ink/social-eng-kit",
      youtubeUrl: "https://youtube.com/watch?v=example3"
    },
    {
      id: "4",
      title: "DNS Enumeration Suite",
      description: "Complete DNS reconnaissance toolkit with subdomain discovery and zone transfer capabilities.",
      dateUploaded: "2024-06-28",
      status: "Updated",
      link: "https://linkvertise.com/dns-enum",
      imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=200&fit=crop",
    },
    {
      id: "5",
      title: "Wireless Security Auditor",
      description: "Comprehensive WiFi security assessment tool with WPA/WPA2 testing capabilities.",
      dateUploaded: "2024-06-22",
      status: "Working",
      link: "https://work.ink/wifi-auditor",
      imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=200&fit=crop",
      youtubeUrl: "https://youtube.com/watch?v=example5"
    },
    {
      id: "6",
      title: "Database Exploitation Framework",
      description: "Advanced SQL injection testing framework with automated payload generation.",
      dateUploaded: "2024-06-18",
      status: "Working",
      link: "https://linkvertise.com/db-exploit",
    }
  ];

  const filteredScripts = scripts.filter(script =>
    script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    script.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Updated":
        return "bg-green-600 text-green-100 border-green-400";
      case "Working":
        return "bg-cyan-600 text-cyan-100 border-cyan-400";
      case "Outdated":
        return "bg-red-600 text-red-100 border-red-400";
      default:
        return "bg-gray-600 text-gray-100 border-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400">
      {/* Header */}
      <div className="bg-gray-900 border-b-2 border-green-400 shadow-lg shadow-green-400/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                onClick={() => navigate('/')}
                variant="ghost"
                className="text-cyan-400 hover:text-cyan-300 hover:bg-gray-800 font-mono mr-4"
              >
                {"<"} BACK TO HQ
              </Button>
              <div className="flex items-center">
                <Code className="w-8 h-8 text-green-400 mr-3" />
                <h1 className="text-3xl font-mono font-bold text-green-400">
                  SCRIPT REPOSITORY
                </h1>
              </div>
            </div>
            <div className="text-right font-mono text-sm">
              <div className="text-cyan-400">ACTIVE SCRIPTS: {filteredScripts.length}</div>
              <div className="text-green-400">STATUS: ONLINE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading animation */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center text-green-400 font-mono text-lg mb-4">
            <ArrowDown className="w-5 h-5 mr-2 animate-bounce" />
            LOADING SCRIPT DATABASE
            <ArrowDown className="w-5 h-5 ml-2 animate-bounce" />
          </div>
          <div className="w-64 h-2 bg-gray-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Search bar */}
        <div className="mb-8 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search scripts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-900 border-green-400 text-green-400 placeholder-green-600 font-mono focus:border-cyan-400 focus:ring-cyan-400"
          />
        </div>

        {/* Scripts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScripts.map((script) => (
            <Card key={script.id} className="bg-gray-900 border-green-400 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-400/20 group">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-green-400 font-mono text-lg group-hover:text-cyan-400 transition-colors">
                    {script.title}
                  </CardTitle>
                  <Badge className={`font-mono text-xs ${getStatusColor(script.status)}`}>
                    {script.status}
                  </Badge>
                </div>
                {script.imageUrl && (
                  <div className="w-full h-32 overflow-hidden rounded-md mb-3">
                    <img
                      src={script.imageUrl}
                      alt={script.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-400 font-mono text-sm leading-relaxed">
                  {script.description}
                </CardDescription>
                
                <div className="text-xs font-mono text-cyan-400">
                  UPLOADED: {script.dateUploaded}
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() => window.open(script.link, '_blank')}
                    size="sm"
                    className="bg-green-600 hover:bg-green-500 text-black font-mono text-xs flex-1"
                  >
                    <Link className="w-4 h-4 mr-1" />
                    GET SCRIPT
                  </Button>
                  {script.youtubeUrl && (
                    <Button
                      onClick={() => window.open(script.youtubeUrl, '_blank')}
                      size="sm"
                      variant="outline"
                      className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-mono text-xs"
                    >
                      <Youtube className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredScripts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-red-400 font-mono text-xl mb-4">
              NO SCRIPTS FOUND
            </div>
            <div className="text-gray-500 font-mono">
              Try adjusting your search criteria
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-16 border-t-2 border-green-400 bg-gray-900 py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="text-green-400 font-mono text-sm">
            {">"} INCOGNITO SCRIPT REPOSITORY - CLASSIFIED ACCESS ONLY {"<"}
          </div>
          <div className="text-gray-600 font-mono text-xs mt-2">
            All scripts are for educational and authorized testing purposes only
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scripts;
