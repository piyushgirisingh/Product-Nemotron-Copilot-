import { Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200/60 px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-md flex items-center justify-center shadow-sm">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-medium text-neutral-900">Lifecycle Copilot</span>
      </div>
      
      <div className="flex items-center gap-2 px-3 py-1 bg-neutral-100/70 rounded-full border border-neutral-200/60">
        <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"></div>
        <span className="text-neutral-600 text-xs">Powered by Nemotron</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-neutral-600 border-neutral-300 bg-white/50 text-xs px-2.5 py-0.5">
          NVIDIA
        </Badge>
        <Badge variant="outline" className="text-neutral-600 border-neutral-300 bg-white/50 text-xs px-2.5 py-0.5">
          PNC
        </Badge>
      </div>
    </nav>
  );
}
