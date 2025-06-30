
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, Shield, User } from "lucide-react";

export const AuthButton = () => {
  const { user, isAdmin, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) {
    return (
      <Button disabled className="bg-gray-600 text-gray-400">
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 text-green-400">
          <User className="w-4 h-4" />
          <span className="text-sm font-mono">
            {user.user_metadata?.full_name || user.email}
          </span>
          {isAdmin && (
            <div className="flex items-center space-x-1 text-red-400">
              <Shield className="w-4 h-4" />
              <span className="text-xs">ADMIN</span>
            </div>
          )}
        </div>
        <Button
          onClick={signOut}
          variant="outline"
          className="border-red-400 text-red-400 hover:bg-red-400 hover:text-black"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={signInWithGoogle}
      className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-500 hover:to-red-500 text-white font-mono"
    >
      <LogIn className="w-4 h-4 mr-2" />
      Sign in with Google
    </Button>
  );
};
