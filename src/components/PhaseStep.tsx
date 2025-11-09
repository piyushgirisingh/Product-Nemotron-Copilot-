import { Check } from 'lucide-react';
import { Phase } from '../App';

interface PhaseStepProps {
  name: string;
  description: string;
  status: Phase['status'];
  isLast: boolean;
}

export function PhaseStep({ name, description, status, isLast }: PhaseStepProps) {
  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 border-green-500 shadow-lg shadow-green-500/30';
      case 'active':
        return 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-500/50 animate-pulse';
      case 'upcoming':
        return 'bg-neutral-100 border-neutral-300';
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-700';
      case 'active':
        return 'text-blue-700 font-semibold';
      case 'upcoming':
        return 'text-neutral-500';
    }
  };

  return (
    <div className="flex items-start gap-3 flex-1 group/phase hover:translate-y-[-2px] transition-all duration-300">
      <div className="flex flex-col items-center">
        <div
          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${getStatusColor()} group-hover/phase:scale-110`}
        >
          {status === 'completed' ? (
            <Check className="w-5 h-5 text-white animate-in zoom-in duration-300" />
          ) : status === 'active' ? (
            <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div>
          ) : (
            <div className="w-2 h-2 rounded-full bg-neutral-400 group-hover/phase:bg-neutral-500 transition-colors"></div>
          )}
        </div>
        {!isLast && (
          <div className={`w-0.5 h-8 mt-1 transition-all duration-500 ${status === 'completed' ? 'bg-gradient-to-b from-green-500 to-green-300' : 'bg-neutral-200'}`}></div>
        )}
      </div>
      <div className="flex-1 pt-0.5">
        <div className={`text-sm font-medium mb-1 transition-colors ${getTextColor()}`}>
          {name}
        </div>
        <div className="text-xs text-neutral-500 leading-relaxed">
          {description}
        </div>
        {status === 'active' && (
          <div className="mt-2 flex items-center gap-1.5">
            <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></div>
            <span className="text-xs text-blue-600 font-medium">In Progress</span>
          </div>
        )}
      </div>
    </div>
  );
}
