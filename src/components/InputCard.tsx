import React from 'react';
import { Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { ProductInput } from '../App';

interface InputCardProps {
  productInput: ProductInput;
  setProductInput: (input: ProductInput) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  error: string | null;
}

export function InputCard({
  productInput,
  setProductInput,
  onGenerate,
  isGenerating,
  error,
}: InputCardProps) {
  const descriptionLength = productInput.description.length;
  const maxDescriptionLength = 500;

  return (
    <Card className="space-y-5 border-2 border-blue-400 max-w-2xl mx-auto pt-8" style={{ borderColor: '#60a5fa' }}>
      <div className="flex items-center justify-center mb-6 mt-4">
        <h2 className="text-[var(--lc-text)] font-semibold">Describe your product</h2>
      </div>
    
      <div className="space-y-5">
        <div className="space-y-2 group/input">
          <Label htmlFor="product-name" className="text-sm text-[var(--lc-muted)]">
            Product Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="product-name"
            value={productInput.name}
            onChange={(e) => setProductInput({ ...productInput, name: e.target.value })}
            placeholder="e.g., Smart Health Tracker"
            disabled={isGenerating}
            className="!bg-blue-400/10 !border-2 !border-blue-400 w-full rounded-md px-3 py-2 text-sm text-[var(--lc-text)] placeholder:text-[var(--lc-muted)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:!border-blue-500 focus:!bg-blue-400/15 disabled:!bg-blue-400/10 disabled:!opacity-100"
            style={{ 
              backgroundColor: isGenerating ? 'rgba(96, 165, 250, 0.1)' : 'rgba(96, 165, 250, 0.1)', 
              borderColor: '#60a5fa', 
              borderWidth: '2px',
              opacity: isGenerating ? 1 : 1
            }}
          />
        </div>
        
        <div className="space-y-2 group/input">
          <div className="flex items-center justify-between">
            <Label htmlFor="description" className="text-sm text-[var(--lc-muted)]">
              Short Description <span className="text-red-500">*</span>
            </Label>
            <span className={`text-xs transition-colors ${
              descriptionLength > maxDescriptionLength ? 'text-red-500' : 
              descriptionLength > maxDescriptionLength * 0.8 ? 'text-amber-500' : 
              'text-[var(--lc-muted)]'
            }`}>
              {descriptionLength}/{maxDescriptionLength}
            </span>
          </div>
          <Textarea
            id="description"
            value={productInput.description}
            onChange={(e) => {
              if (e.target.value.length <= maxDescriptionLength) {
                setProductInput({ ...productInput, description: e.target.value });
              }
            }}
            placeholder="Describe what your product does, its key features, and value proposition..."
            rows={3}
            disabled={isGenerating}
            className="!bg-blue-400/10 !border-2 !border-blue-400 w-full rounded-md px-3 py-2 text-sm text-[var(--lc-text)] placeholder:text-[var(--lc-muted)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:!border-blue-500 focus:!bg-blue-400/15 resize-none"
            style={{ backgroundColor: 'rgba(96, 165, 250, 0.1)', borderColor: '#60a5fa', borderWidth: '2px' }}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 group/input">
            <Label htmlFor="target-users" className="text-sm text-[var(--lc-muted)]">
              Target Users
            </Label>
            <Input
              id="target-users"
              value={productInput.targetUsers}
              onChange={(e) => setProductInput({ ...productInput, targetUsers: e.target.value })}
              placeholder="e.g., Healthcare professionals"
              disabled={isGenerating}
              className="!bg-blue-400/10 !border-2 !border-blue-400 w-full rounded-md px-3 py-2 text-sm text-[var(--lc-text)] placeholder:text-[var(--lc-muted)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:!border-blue-500 focus:!bg-blue-400/15"
              style={{ backgroundColor: 'rgba(96, 165, 250, 0.1)', borderColor: '#60a5fa', borderWidth: '2px' }}
            />
          </div>
          
          <div className="space-y-2 group/input">
            <Label htmlFor="timeline" className="text-sm text-[var(--lc-muted)]">
              Timeline
            </Label>
            <div className="flex gap-2">
              <Input
                id="timeline-value"
                type="number"
                min="1"
                value={productInput.timeline.split(' ')[0]}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || (parseInt(value) > 0)) {
                    const unit = productInput.timeline.split(' ')[1] || 'months';
                    setProductInput({ ...productInput, timeline: value ? `${value} ${unit}` : `1 ${unit}` });
                  }
                }}
                placeholder="e.g., 6"
                disabled={isGenerating}
                className="!bg-blue-400/10 !border-2 !border-blue-400 w-24 rounded-md px-3 py-2 text-sm text-[var(--lc-text)] placeholder:text-[var(--lc-muted)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:!border-blue-500 focus:!bg-blue-400/15"
                style={{ backgroundColor: 'rgba(96, 165, 250, 0.1)', borderColor: '#60a5fa', borderWidth: '2px' }}
              />
              <Select
                value={productInput.timeline.split(' ')[1] || 'months'}
                onValueChange={(unit) => {
                  const value = productInput.timeline.split(' ')[0] || '6';
                  setProductInput({ ...productInput, timeline: `${value} ${unit}` });
                }}
                disabled={isGenerating}
              >
                <SelectTrigger id="timeline-unit" className="!bg-blue-400/10 !border-2 !border-blue-400 flex-1 rounded-md px-3 py-2 text-sm text-[var(--lc-text)] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:!border-blue-500 focus:!bg-blue-400/15" style={{ backgroundColor: 'rgba(96, 165, 250, 0.1)', borderColor: '#60a5fa', borderWidth: '2px' }}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="days">days</SelectItem>
                  <SelectItem value="months">months</SelectItem>
                  <SelectItem value="years">years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {error && (
          <Alert variant="destructive" className="border-red-800 bg-red-900/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm text-[var(--lc-text)]">{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="pt-4 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-xs text-[var(--lc-muted)]">
              AI-powered lifecycle planning with Nemotron
            </p>
          </div>
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            variant="primary"
            className="!ml-auto !px-8 !py-3 !text-base !font-semibold !rounded-lg !shadow-lg hover:!shadow-xl hover:!scale-105 !transition-all !duration-200 !mr-2 !mb-2"
            style={{ 
              backgroundColor: '#60a5fa',
              color: 'white',
              padding: '12px 32px',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              border: 'none',
              marginRight: '8px',
              marginBottom: '8px',
              cursor: isGenerating ? 'not-allowed' : 'pointer'
            }}
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                Generate Lifecycle Plan
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default InputCard;
