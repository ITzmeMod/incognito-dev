import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Download, Youtube, Eye, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthButton } from "@/components/AuthButton";
import { useAuth } from "@/contexts/AuthContext";

interface Script {
  id: string;
  title: string;
  description: string;
  image_url: string;
  youtube_link: string;
  download_link: string;
  status: string;
  click_count: number;
}

const Scripts = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [scripts, setScripts] = useState<Script[]>([]);
  const [filteredScripts, setFilteredScripts] = useState<Script[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScripts();
  }, []);

  const fetchScripts = async () => {
    try {
      const { data, error } = await supabase
        .from('scripts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setScripts(data || []);
      setFilteredScripts(data || []);
    } catch (error) {
      console.error('Error fetching scripts:', error);
      toast({
        title: "Error",
        description: "Failed to load scripts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (script: Script) => {
    try {
      // Increment click count
      const { error } = await supabase
        .from('scripts')
        .update({ click_count: script.click_count + 1 })
        .eq('id', script.id);

      if (error) throw error;

      // Open download link
      window.open(script.download_link, '_blank');
      
      // Update local state
      const updatedScripts = scripts.map(s => 
        s.id === script.id ? { ...s, click_count: s.click_count + 1 } : s
      );
      setScripts(updatedScripts);
      setFilteredScripts(updatedScripts.filter(filterScript));

      toast({ 
        title: "Download Started", 
        description: "Script download initiated successfully" 
      });
    } catch (error) {
      console.error('Error updating click count:', error);
      // Still open download link even if count update fails
      window.open(script.download_link, '_blank');
    }
  };

  const filterScript = (script: Script) => {
    const matchesSearch = script.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         script.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || script.status === selectedStatus;
    return matchesSearch && matchesStatus;
  };

  useEffect(() => {
    setFilteredScripts(scripts.filter(filterScript));
  }, [searchTerm, selectedStatus, scripts]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center">
        <div className="text-xl font-mono animate-pulse">Loading underground arsenal...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 relative">
      {/* Auth Button */}
      <div className="fixed top-4 right-4 z-50">
        <AuthButton />
      </div>

      {/* Admin Dashboard Link */}
      {isAdmin && (
        <div className="fixed top-4 left-4 z-50">
          <Button
            onClick={() => navigate('/admin')}
            className="bg-red-600 hover:bg-red-500 text-white font-mono"
          >
            <Shield className="w-4 h-4 mr-2" />
            Admin
          </Button>
        </div>
      )}

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBmZjAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMiIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')] opacity-20"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="mr-4 border-green-400 text-green-400 hover:bg-green-400 hover:text-black"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <h1 className="text-4xl font-mono font-bold text-red-400">
              SCRIPT REPOSITORY
            </h1>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-400 w-4 h-4" />
            <Input
              placeholder="Search scripts by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-green-400 text-green-400 placeholder-gray-500"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-green-400 text-green-400 rounded-md font-mono"
          >
            <option value="All">All Status</option>
            <option value="Working">Working</option>
            <option value="Updated">Updated</option>
            <option value="Outdated">Outdated</option>
          </select>
        </div>

        {/* Scripts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScripts.map((script) => (
            <Card key={script.id} className="bg-gray-900 border-green-400 hover:border-cyan-400 transition-colors">
              <CardHeader>
                <div className="aspect-video bg-gray-800 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={script.image_url}
                    alt={script.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop';
                    }}
                  />
                </div>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-green-400 font-mono text-lg">
                    {script.title}
                  </CardTitle>
                  <Badge 
                    className={`font-mono text-xs ${
                      script.status === 'Working' ? 'bg-green-600 text-black' :
                      script.status === 'Updated' ? 'bg-blue-600 text-white' :
                      'bg-red-600 text-white'
                    }`}
                  >
                    {script.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-400 mb-4 font-mono text-sm">
                  {script.description}
                </CardDescription>
                
                <div className="flex items-center text-yellow-400 mb-4 font-mono text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  {script.click_count.toLocaleString()} downloads
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownload(script)}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-black font-mono"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  
                  {script.youtube_link && (
                    <Button
                      onClick={() => window.open(script.youtube_link, '_blank')}
                      variant="outline"
                      className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      <Youtube className="w-4 h-4" />
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => navigate(`/scripts/details/${script.id}`)}
                    variant="outline"
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {filteredScripts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-red-400 font-mono text-xl mb-2">No scripts found</p>
            <p className="text-gray-400 font-mono">Try adjusting your search criteria</p>
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
