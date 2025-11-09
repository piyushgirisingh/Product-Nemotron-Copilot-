import { AlertTriangle, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

interface RisksMetricsCardProps {
  risks: string[];
  kpis: string[];
}

export function RisksMetricsCard({ risks, kpis }: RisksMetricsCardProps) {
  return (
    <Card className="space-y-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Key Risks Section */}
          <div className="group/section">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover/section:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-[var(--lc-text)] font-semibold">Key Risks</h3>
            </div>
            <ul className="space-y-3">
              {risks.map((risk, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-[var(--lc-muted)] p-2.5 rounded-lg hover:bg-[var(--lc-surface)] transition-colors duration-150 group/item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-orange-500 mt-1 text-sm group-hover/item:scale-125 transition-transform">
                    ⚠️
                  </span>
                  <span className="text-sm leading-relaxed group-hover/item:text-[var(--lc-text)] transition-colors duration-150">
                    {risk}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* KPIs Section */}
          <div className="group/section">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover/section:scale-110 transition-transform duration-300">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-[var(--lc-text)] font-semibold">KPIs & Metrics</h3>
            </div>
            <ul className="space-y-3">
              {kpis.map((kpi, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-[var(--lc-muted)] p-2.5 rounded-lg hover:bg-[var(--lc-surface)] transition-colors duration-150 group/item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-blue-500 mt-1 text-sm group-hover/item:scale-125 transition-transform">
                    📊
                  </span>
                  <span className="text-sm leading-relaxed group-hover/item:text-[var(--lc-text)] transition-colors duration-150">
                    {kpi}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
    </Card>
  );
}
