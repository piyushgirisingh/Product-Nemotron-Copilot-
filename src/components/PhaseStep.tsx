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
        return 'bg-green-500 border-green-500';
      case 'active':
        return 'bg-blue-600 border-blue-600 shadow-sm shadow-blue-500/50';
      case 'upcoming':
        return 'bg-neutral-100 border-neutral-300';
    }
  };

  const getTextColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-700';
      case 'active':
        return 'text-blue-700';
      case 'upcoming':
        return 'text-neutral-500';
    }
  };

  return (
    <div className="flex items-start gap-3 flex-1">
      <div className="flex flex-col items-center">
        <div
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${getStatusColor()}`}
        >
          {status === 'completed' ? (
            <Check className="w-4 h-4 text-white" />
          ) : status === 'active' ? (
            <div className="w-2 h-2 rounded-full bg-white"></div>
          ) : (
            <div className="w-2 h-2 rounded-full bg-neutral-400"></div>
          )}
        </div>
        {!isLast && (
          <div className={`w-0.5 h-8 mt-1 ${status === 'completed' ? 'bg-green-300' : 'bg-neutral-200'}`}></div>
        )}
      </div>
      <div className="flex-1 pt-0.5">
        <div className={`text-sm font-medium mb-0.5 ${getTextColor()}`}>
          {name}
        </div>
        <div className="text-xs text-neutral-500 leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
}
