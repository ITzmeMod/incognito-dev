
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Calendar, 
  ExternalLink, 
  Play, 
  ArrowLeft,
  Download,
  Eye,
  Shield,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const Scripts = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock scripts data with real-time click tracking
  const scripts = [
    {
      id: "1",
      title: "Advanced Network Scanner",
      description: "Comprehensive network discovery and vulnerability assessment tool with stealth capabilities and custom payload generation.",
      uploadDate: "2025-01-15",
      status: "Updated",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
      youtubeLink: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      downloadLink: "https://linkvertise.com/12345/advanced-scanner",
      clickCount: 2847
    },
    {
      id: "2", 
      title: "SQL Injection Toolkit",
      description: "Advanced SQL injection testing framework with automated detection and exploitation capabilities for ethical penetration testing.",
      uploadDate: "2025-01-12",
      status: "Working",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
      youtubeLink: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      downloadLink: "https://work.ink/sql-toolkit-secure",
      clickCount: 1923
    },
    {
      id: "3",
      title: "Web Application Fuzzer",
      description: "Intelligent web application security testing tool with machine learning-based payload optimization and comprehensive reporting.",
      uploadDate: "2025-01-08",
      status: "Outdated",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop",
      youtubeLink: null,
      downloadLink: "https://linkvertise.com/54321/web-fuzzer",
      clickCount: 756
    },
    {
      id: "4",
      title: "Wireless Security Auditor", 
      description: "Complete wireless network security assessment suite with support for WPA3, enterprise networks, and IoT device testing.",
      uploadDate: "2025-01-20",
      status: "Updated",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
      youtubeLink: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      downloadLink: "https://work.ink/wireless-auditor",
      clickCount: 3421
    },
    {
      id: "5",
      title: "Social Engineering Toolkit",
      description: "Comprehensive social engineering framework for security awareness training and authorized penetration testing scenarios.",
      uploadDate: "2025-01-18",
      status: "Working",
      image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=300&fit=crop",
      youtubeLink: "https://youtube.com/watch?v=dQw4w9WgXcQ",
      downloadLink: "https://linkvertise.com/67890/social-toolkit",
      clickCount: 1567
    },
    {
      id: "6",
      title: "Forensic Data Recovery",
      description: "Advanced digital forensics tool for data recovery, analysis, and evidence collection with chain of custody documentation.",
      uploadDate: "2025-01-05",
      status: "Updated",
      image: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=400&h=300&fit=crop",
      youtubeLink: null,
      downloadLink: "https://work.ink/forensic-recovery",
      clickCount: 892
    }
  ];

  const filteredScripts = scripts.filter(script =>
    script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    script.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const handleScriptClick = (scriptId: string) => {
    navigate(`/scripts/details/${scriptId}`);
  };

  return (
    <div className="min-h-screen bg-black text-green-400">
      {/* Header */}
      <div className="border-b border-green-400/30 bg-black/80 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="border-green-400 text-green-400 hover:bg-green-400/20 font-mono"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              BACK TO HOME
            </Button>
            <div className="text-center">
              <h1 className="text-4xl font-mono font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                SCRIPT REPOSITORY
              </h1>
              <p className="text-cyan-300 font-mono mt-2">{">"} CLASSIFIED TOOLS & EXPLOITS</p>
            </div>
            <div className="w-32"></div>
          </div>
          
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search scripts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-green-400/30 text-green-400 placeholder-gray-500 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Scripts Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScripts.map((script) => (
            <Card 
              key={script.id} 
              className="bg-gray-900 border-green-400/30 hover:border-green-400/60 transition-colors cursor-pointer group"
              onClick={() => handleScriptClick(script.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-green-400 font-mono text-lg group-hover:text-cyan-400 transition-colors">
                    {script.title}
                  </CardTitle>
                  <Badge className={`${getStatusColor(script.status)} text-white font-mono text-xs`}>
                    {getStatusIcon(script.status)}
                    <span className="ml-1">{script.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Image */}
                {script.image && (
                  <div className="aspect-video rounded-lg overflow-hidden border border-green-400/20">
                    <img
                      src={script.image}
                      alt={script.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                {/* Description */}
                <p className="text-gray-300 font-mono text-sm leading-relaxed line-clamp-3">
                  {script.description}
                </p>
                
                {/* Stats and Date */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    {script.uploadDate}
                  </div>
                  <div className="flex items-center text-cyan-400">
                    <Download className="w-3 h-3 mr-1" />
                    {script.clickCount.toLocaleString()} clicks
                  </div>
                </div>
                
                {/* Action Links */}
                <div className="flex items-center justify-between pt-2 border-t border-green-400/20">
                  {script.youtubeLink && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10 font-mono"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(script.youtubeLink, '_blank');
                      }}
                    >
                      <Play className="w-4 h-4 mr-1" />
                      VIDEO
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-400/10 font-mono ml-auto"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    VIEW DETAILS
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredScripts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 font-mono text-lg">No scripts found matching your search.</p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="border-t border-green-400/30 bg-black/80 backdrop-blur mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-gray-500 font-mono text-sm">
            {">"} {filteredScripts.length} SCRIPTS AVAILABLE • UPDATED DAILY • SECURE DOWNLOADS
          </p>
        </div>
      </div>
    </div>
  );
};

export default Scripts;
