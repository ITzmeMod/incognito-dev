
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Users, FileText, Activity } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Script {
  id: string;
  title: string;
  description: string;
  image_url: string;
  youtube_link: string;
  download_link: string;
  status: string;
  click_count: number;
  created_at: string;
}

export const AdminDashboard = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingScript, setEditingScript] = useState<Script | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    youtube_link: '',
    download_link: '',
    status: 'Working'
  });

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
    } catch (error) {
      console.error('Error fetching scripts:', error);
      toast({
        title: "Error",
        description: "Failed to fetch scripts",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingScript) {
        const { error } = await supabase
          .from('scripts')
          .update(formData)
          .eq('id', editingScript.id);

        if (error) throw error;
        toast({ title: "Success", description: "Script updated successfully" });
      } else {
        const { error } = await supabase
          .from('scripts')
          .insert([formData]);

        if (error) throw error;
        toast({ title: "Success", description: "Script created successfully" });
      }

      fetchScripts();
      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving script:', error);
      toast({
        title: "Error",
        description: "Failed to save script",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this script?')) return;

    try {
      const { error } = await supabase
        .from('scripts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Success", description: "Script deleted successfully" });
      fetchScripts();
    } catch (error) {
      console.error('Error deleting script:', error);
      toast({
        title: "Error",
        description: "Failed to delete script",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      youtube_link: '',
      download_link: '',
      status: 'Working'
    });
    setEditingScript(null);
  };

  const openEditDialog = (script: Script) => {
    setEditingScript(script);
    setFormData({
      title: script.title,
      description: script.description,
      image_url: script.image_url || '',
      youtube_link: script.youtube_link || '',
      download_link: script.download_link || '',
      status: script.status
    });
    setIsDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-green-400">
        <div className="text-xl font-mono">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-green-400 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-mono font-bold text-red-400 mb-2">
            ADMIN DASHBOARD
          </h1>
          <p className="text-cyan-400 font-mono">Complete system control and management</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-900 border-green-400">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">Total Scripts</CardTitle>
              <FileText className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">{scripts.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-green-400">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">Total Downloads</CardTitle>
              <Activity className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">
                {scripts.reduce((sum, script) => sum + script.click_count, 0)}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-green-400">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">Active Status</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">ONLINE</div>
            </CardContent>
          </Card>
        </div>

        {/* Scripts Management */}
        <Card className="bg-gray-900 border-green-400">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-green-400 font-mono">Scripts Management</CardTitle>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    onClick={resetForm}
                    className="bg-green-600 hover:bg-green-500 text-black font-mono"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Script
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black border-green-400 text-green-400 max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-green-400 font-mono">
                      {editingScript ? 'Edit Script' : 'Add New Script'}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      placeholder="Script Title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                      className="bg-gray-900 border-green-400 text-green-400"
                    />
                    <Textarea
                      placeholder="Description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="bg-gray-900 border-green-400 text-green-400"
                    />
                    <Input
                      placeholder="Image URL"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      className="bg-gray-900 border-green-400 text-green-400"
                    />
                    <Input
                      placeholder="YouTube Link (optional)"
                      value={formData.youtube_link}
                      onChange={(e) => setFormData({...formData, youtube_link: e.target.value})}
                      className="bg-gray-900 border-green-400 text-green-400"
                    />
                    <Input
                      placeholder="Download Link"
                      value={formData.download_link}
                      onChange={(e) => setFormData({...formData, download_link: e.target.value})}
                      required
                      className="bg-gray-900 border-green-400 text-green-400"
                    />
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full p-2 bg-gray-900 border border-green-400 text-green-400 rounded"
                    >
                      <option value="Working">Working</option>
                      <option value="Updated">Updated</option>
                      <option value="Outdated">Outdated</option>
                    </select>
                    <div className="flex space-x-2">
                      <Button type="submit" className="bg-green-600 hover:bg-green-500 text-black">
                        {editingScript ? 'Update' : 'Create'} Script
                      </Button>
                      <Button 
                        type="button" 
                        onClick={() => setIsDialogOpen(false)}
                        variant="outline"
                        className="border-red-400 text-red-400 hover:bg-red-400 hover:text-black"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-green-400">
                  <TableHead className="text-green-400">Title</TableHead>
                  <TableHead className="text-green-400">Status</TableHead>
                  <TableHead className="text-green-400">Downloads</TableHead>
                  <TableHead className="text-green-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scripts.map((script) => (
                  <TableRow key={script.id} className="border-gray-700">
                    <TableCell className="text-cyan-400">{script.title}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-mono ${
                        script.status === 'Working' ? 'bg-green-600 text-black' :
                        script.status === 'Updated' ? 'bg-blue-600 text-white' :
                        'bg-red-600 text-white'
                      }`}>
                        {script.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-yellow-400">{script.click_count}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => openEditDialog(script)}
                          className="bg-blue-600 hover:bg-blue-500 text-white"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleDelete(script.id)}
                          className="bg-red-600 hover:bg-red-500 text-white"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
