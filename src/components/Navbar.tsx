import { Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-200/60 px-6 h-16 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3 group/logo">
        <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-500/30 group-hover/logo:scale-110 group-hover/logo:rotate-6 transition-all duration-300">
          <Sparkles className="w-5 h-5 text-white group-hover/logo:animate-pulse" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-neutral-900 text-base">Lifecycle Copilot</span>
          <span className="text-xs text-neutral-500">Product Planning AI</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2.5 px-4 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200/60 hover:border-green-300 transition-all hover:scale-105 group/status">
        <div className="relative">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
        </div>
        <span className="text-neutral-700 text-xs font-medium">Powered by Nemotron</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-neutral-600 border-neutral-300 bg-white/50 text-xs px-3 py-1 hover:bg-neutral-50 hover:scale-105 transition-all cursor-pointer">
          NVIDIA
        </Badge>
        <Badge variant="outline" className="text-neutral-600 border-neutral-300 bg-white/50 text-xs px-3 py-1 hover:bg-neutral-50 hover:scale-105 transition-all cursor-pointer">
          PNC
        </Badge>
      </div>
    </nav>
  );
}
