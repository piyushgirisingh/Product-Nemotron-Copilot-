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
    <Card className="p-6 bg-white/80 backdrop-blur-sm border border-neutral-200/60 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl group relative overflow-hidden">
      {/* Gradient accent on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-neutral-900 font-semibold">Describe your product</h2>
          </div>
        </div>
      
      <div className="space-y-5">
        <div className="space-y-2 group/input">
          <Label htmlFor="product-name" className="text-sm text-neutral-700 group-focus-within/input:text-blue-600 transition-colors">
            Product Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="product-name"
            value={productInput.name}
            onChange={(e) => setProductInput({ ...productInput, name: e.target.value })}
            placeholder="e.g., Smart Health Tracker"
            disabled={isGenerating}
            className="border-neutral-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 hover:border-neutral-300"
          />
        </div>
        
        <div className="space-y-2 group/input">
          <div className="flex items-center justify-between">
            <Label htmlFor="description" className="text-sm text-neutral-700 group-focus-within/input:text-blue-600 transition-colors">
              Short Description <span className="text-red-500">*</span>
            </Label>
            <span className={`text-xs transition-colors ${
              descriptionLength > maxDescriptionLength ? 'text-red-500' : 
              descriptionLength > maxDescriptionLength * 0.8 ? 'text-amber-500' : 
              'text-neutral-400'
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
            className="border-neutral-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none transition-all duration-200 hover:border-neutral-300"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 group/input">
            <Label htmlFor="target-users" className="text-sm text-neutral-700 group-focus-within/input:text-blue-600 transition-colors">
              Target Users
            </Label>
            <Input
              id="target-users"
              value={productInput.targetUsers}
              onChange={(e) => setProductInput({ ...productInput, targetUsers: e.target.value })}
              placeholder="e.g., Healthcare professionals"
              disabled={isGenerating}
              className="border-neutral-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 hover:border-neutral-300"
            />
          </div>
          
          <div className="space-y-2 group/input">
            <Label htmlFor="timeline" className="text-sm text-neutral-700 group-focus-within/input:text-blue-600 transition-colors">
              Timeline
            </Label>
            <Select
              value={productInput.timeline}
              onValueChange={(value) => setProductInput({ ...productInput, timeline: value })}
              disabled={isGenerating}
            >
              <SelectTrigger id="timeline" className="border-neutral-200 hover:border-neutral-300 transition-colors">
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
          <Alert variant="destructive" className="border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="pt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-xs text-neutral-500">
              AI-powered lifecycle planning with Nemotron
            </p>
          </div>
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 px-6 group/btn"
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
      </div>
    </Card>
  );
}
