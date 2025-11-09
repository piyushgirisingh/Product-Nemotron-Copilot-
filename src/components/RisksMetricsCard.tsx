import { AlertTriangle, TrendingUp } from 'lucide-react';
import { Card } from './ui/card';

interface RisksMetricsCardProps {
  risks: string[];
  kpis: string[];
}

export function RisksMetricsCard({ risks, kpis }: RisksMetricsCardProps) {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group relative overflow-hidden">
      {/* Gradient accent on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Key Risks Section */}
          <div className="group/section">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover/section:scale-110 transition-transform duration-300">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-neutral-900 font-semibold">Key Risks</h3>
            </div>
            <ul className="space-y-3">
              {risks.map((risk, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-neutral-700 p-2.5 rounded-lg hover:bg-orange-50/50 transition-all duration-200 group/item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-orange-500 mt-1 text-sm group-hover/item:scale-125 transition-transform">
                    ⚠️
                  </span>
                  <span className="text-sm leading-relaxed group-hover/item:text-neutral-900 transition-colors">
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
              <h3 className="text-neutral-900 font-semibold">KPIs & Metrics</h3>
            </div>
            <ul className="space-y-3">
              {kpis.map((kpi, index) => (
                <li 
                  key={index} 
                  className="flex items-start gap-3 text-neutral-700 p-2.5 rounded-lg hover:bg-blue-50/50 transition-all duration-200 group/item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="text-blue-500 mt-1 text-sm group-hover/item:scale-125 transition-transform">
                    📊
                  </span>
                  <span className="text-sm leading-relaxed group-hover/item:text-neutral-900 transition-colors">
                    {kpi}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
