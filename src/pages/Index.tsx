
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Terminal, Code, Zap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-green-400 relative overflow-hidden">
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

        {/* Main action button */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/scripts')}
            className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-500 hover:to-cyan-500 text-black font-mono text-xl px-12 py-6 rounded-lg border-2 border-green-400 shadow-lg shadow-green-400/50 hover:shadow-green-400/70 transition-all duration-300 transform hover:scale-105"
          >
            <Code className="w-6 h-6 mr-3" />
            PROVIDE ME A SCHEMA: GET SCRIPT
          </Button>
        </div>

        {/* Status indicators */}
        <div className="mt-16 flex space-x-8 text-sm font-mono">
          <div className="flex items-center text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
            SECURE CONNECTION
          </div>
          <div className="flex items-center text-cyan-400">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2"></div>
            ENCRYPTED TUNNEL
          </div>
          <div className="flex items-center text-yellow-400">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-2"></div>
            ANONYMOUS MODE
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 text-green-400 font-mono text-xs opacity-50 animate-pulse">
        {">"} root@incognito:~$
      </div>
      <div className="absolute bottom-20 right-10 text-cyan-400 font-mono text-xs opacity-50 animate-pulse">
        {">"} connection_secure=true
      </div>
    </div>
  );
};

export default Index;
