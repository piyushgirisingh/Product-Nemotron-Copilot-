import { AlertTriangle, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

interface RisksMetricsCardProps {
  risks: string[];
  kpis: string[];
}

export function RisksMetricsCard({ risks, kpis }: RisksMetricsCardProps) {
  return (
    <Card className="p-6 bg-white border border-neutral-200 shadow-sm rounded-xl">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-orange-600" />
            </div>
            <h3 className="text-neutral-900 font-medium">Key Risks</h3>
          </div>
          <ul className="space-y-2.5">
            {risks.map((risk, index) => (
              <li key={index} className="flex items-start gap-2.5 text-neutral-700">
                <span className="text-orange-400 mt-1.5 text-xs">●</span>
                <span className="text-sm leading-relaxed">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <h3 className="text-neutral-900 font-medium">KPIs & Metrics</h3>
          </div>
          <ul className="space-y-2.5">
            {kpis.map((kpi, index) => (
              <li key={index} className="flex items-start gap-2.5 text-neutral-700">
                <span className="text-blue-400 mt-1.5 text-xs">●</span>
                <span className="text-sm leading-relaxed">{kpi}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}
