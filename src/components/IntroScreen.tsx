
import { useState, useEffect } from "react";
import { UserX, Shield, Terminal } from "lucide-react";

interface IntroScreenProps {
  onComplete: () => void;
}

const loadingMessages = [
  "Entering the Website...",
  "Analyzing...",
  "Drinking Some Coffee...",
  "You are In!"
];

export const IntroScreen = ({ onComplete }: IntroScreenProps) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < loadingMessages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(messageInterval);
          setShowFinalMessage(true);
          setTimeout(() => {
            onComplete();
          }, 1500);
          return prev;
        }
      });
    }, 1200);

    return () => clearInterval(messageInterval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black text-green-400 flex flex-col items-center justify-center z-50 font-mono">
      {/* Matrix-style background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBmZjAwIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMiIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPgo8L3N2Zz4=')] animate-pulse"></div>
      </div>

      {/* Animated character */}
      <div className="relative mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <UserX className="w-24 h-24 text-green-400 animate-bounce" />
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-ping"></div>
            <Shield className="absolute -bottom-2 -left-2 w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
        </div>
        
        {/* Walking animation simulation */}
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-8 bg-green-400 animate-pulse delay-0"></div>
          <div className="w-2 h-8 bg-green-400 animate-pulse delay-100"></div>
          <div className="w-2 h-8 bg-green-400 animate-pulse delay-200"></div>
        </div>
      </div>

      {/* Final message */}
      {showFinalMessage ? (
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold text-red-400 mb-4 animate-pulse">
            YOU'VE RECEIVED THIS RESPONSE
          </h1>
          <p className="text-2xl text-cyan-400 animate-bounce">
            Thank you for spying.
          </p>
        </div>
      ) : (
        <>
          {/* Loading message */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Terminal className="w-6 h-6 mr-2 animate-spin" />
              <span className="text-xl text-green-400 animate-pulse">
                {loadingMessages[currentMessageIndex]}
              </span>
            </div>
            
            {/* Loading bar */}
            <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-cyan-400 transition-all duration-1000 ease-out"
                style={{ 
                  width: `${((currentMessageIndex + 1) / loadingMessages.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>

          {/* Loading dots */}
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full bg-green-400 animate-bounce`}
                style={{ animationDelay: `${i * 0.2}s` }}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
