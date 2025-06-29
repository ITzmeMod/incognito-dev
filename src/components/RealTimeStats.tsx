
import { Users, Activity } from "lucide-react";

interface RealTimeStatsProps {
  activeUsers: number;
  realTimeClicks: number;
}

export const RealTimeStats = ({ activeUsers, realTimeClicks }: RealTimeStatsProps) => (
  <div className="absolute top-4 right-4 z-20 bg-black/80 border border-green-400/30 rounded-lg p-3 font-mono text-xs">
    <div className="flex items-center space-x-4">
      <div className="flex items-center text-green-400">
        <Users className="w-4 h-4 mr-1" />
        <span>{activeUsers} online</span>
      </div>
      <div className="flex items-center text-cyan-400">
        <Activity className="w-4 h-4 mr-1" />
        <span>{realTimeClicks.toLocaleString()} clicks</span>
      </div>
    </div>
  </div>
);
