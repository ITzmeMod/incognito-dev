
import { useAuth } from "@/contexts/AuthContext";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, AlertTriangle } from "lucide-react";

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex items-center justify-center">
        <div className="text-xl font-mono animate-pulse">Verifying admin access...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center">
        <AlertTriangle className="w-16 h-16 text-red-400 mb-4" />
        <h1 className="text-3xl font-mono font-bold text-red-400 mb-4">ACCESS DENIED</h1>
        <p className="text-cyan-400 mb-6">Authentication required to access admin panel</p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-green-600 hover:bg-green-500 text-black font-mono"
        >
          Return to Main Site
        </Button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-black text-green-400 flex flex-col items-center justify-center">
        <Shield className="w-16 h-16 text-red-400 mb-4" />
        <h1 className="text-3xl font-mono font-bold text-red-400 mb-4">INSUFFICIENT PRIVILEGES</h1>
        <p className="text-cyan-400 mb-2">Admin access required</p>
        <p className="text-gray-400 text-sm mb-6">Contact system administrator for elevated permissions</p>
        <Button 
          onClick={() => navigate('/')}
          className="bg-green-600 hover:bg-green-500 text-black font-mono"
        >
          Return to Main Site
        </Button>
      </div>
    );
  }

  return <AdminDashboard />;
};

export default Admin;
