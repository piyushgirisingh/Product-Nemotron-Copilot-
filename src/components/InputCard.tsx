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
    <Card className="space-y-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-[var(--lc-text)] font-semibold">Describe your product</h2>
        </div>
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
            className="w-full rounded-md bg-[var(--lc-surface-soft)] border border-[var(--lc-border)] px-3 py-2 text-sm text-[var(--lc-text)] placeholder:text-[var(--lc-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--lc-accent)] focus:border-[var(--lc-accent)]"
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
            className="w-full rounded-md bg-[var(--lc-surface-soft)] border border-[var(--lc-border)] px-3 py-2 text-sm text-[var(--lc-text)] placeholder:text-[var(--lc-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--lc-accent)] focus:border-[var(--lc-accent)] resize-none"
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
              className="w-full rounded-md bg-[var(--lc-surface-soft)] border border-[var(--lc-border)] px-3 py-2 text-sm text-[var(--lc-text)] placeholder:text-[var(--lc-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--lc-accent)] focus:border-[var(--lc-accent)]"
            />
          </div>
          
          <div className="space-y-2 group/input">
            <Label htmlFor="timeline" className="text-sm text-[var(--lc-muted)]">
              Timeline
            </Label>
            <Select
              value={productInput.timeline}
              onValueChange={(value) => setProductInput({ ...productInput, timeline: value })}
              disabled={isGenerating}
            >
              <SelectTrigger id="timeline" className="w-full rounded-md bg-[var(--lc-surface-soft)] border border-[var(--lc-border)] px-3 py-2 text-sm text-[var(--lc-text)] focus:outline-none focus:ring-2 focus:ring-[var(--lc-accent)] focus:border-[var(--lc-accent)]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 months</SelectItem>
                <SelectItem value="6">6 months</SelectItem>
                <SelectItem value="12">12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {error && (
          <Alert variant="destructive" className="border-red-800 bg-red-900/20">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm text-[var(--lc-text)]">{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="pt-2 flex items-center justify-between">
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
