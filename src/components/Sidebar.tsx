import { Plus, Folder } from 'lucide-react';
import { Button } from './ui/button';

export function Sidebar() {
  return (
    <aside className="w-60 bg-neutral-900 border-r border-neutral-800 flex flex-col">
      <div className="p-4 space-y-6 flex-1">
        <div>
          <div className="text-xs uppercase tracking-wider text-neutral-500 mb-3 px-2">
            Products
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2 px-2 py-1.5 bg-neutral-800 rounded-md text-neutral-100 text-sm">
              <Folder className="w-4 h-4 text-neutral-400" />
              <span>Demo Product</span>
            </div>
          </div>
        </div>
        
        <Button
          variant="ghost"
          className="w-full justify-start text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800 h-9 px-2 text-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Product
        </Button>
      </div>
      
      <div className="p-4 border-t border-neutral-800">
        <div className="text-xs text-neutral-500">
          Linear-inspired design
        </div>
      </div>
    </aside>
  );
}
