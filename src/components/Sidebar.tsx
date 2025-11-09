import { Plus, Folder } from 'lucide-react';
import { Button } from './ui/button';

export function Sidebar() {
  return (
    <aside className="w-60 bg-gradient-to-b from-neutral-900 to-neutral-950 border-r border-neutral-800/60 flex flex-col shadow-xl relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 to-indigo-900/5 pointer-events-none"></div>
      
      <div className="relative z-10 p-4 space-y-6 flex-1">
        <div>
          <div className="text-xs uppercase tracking-wider text-neutral-500 mb-3 px-2 font-semibold flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-blue-500"></div>
            Products
          </div>
          <div className="space-y-1">
            <div className="group flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-neutral-800 to-neutral-800/80 rounded-lg text-neutral-100 text-sm border border-neutral-700/50 hover:border-blue-500/30 transition-all cursor-pointer shadow-sm">
              <Folder className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
              <span className="flex-1 group-hover:text-white transition-colors">Demo Product</span>
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse group-hover:scale-125 transition-transform"></div>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          className="w-full justify-start text-neutral-400 hover:text-white hover:bg-neutral-800/80 h-10 px-3 text-sm group border border-transparent hover:border-neutral-700/50 transition-all rounded-lg"
        >
          <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          <span>New Product</span>
        </Button>
      </div>
      
      <div className="relative z-10 p-4 border-t border-neutral-800/60 bg-neutral-950/50">
        <div className="flex items-center gap-2 text-xs text-neutral-500 group hover:text-neutral-400 transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover:animate-pulse"></div>
          <span>Linear-inspired design</span>
        </div>
      </div>
    </aside>
  );
}
