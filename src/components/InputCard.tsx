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
  return (
    <Card className="p-6 bg-white border border-neutral-200 shadow-sm rounded-xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-neutral-900">1. Describe your product</h2>
      </div>
      
      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="product-name" className="text-sm text-neutral-700">
            Product Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="product-name"
            value={productInput.name}
            onChange={(e) => setProductInput({ ...productInput, name: e.target.value })}
            placeholder="Enter product name"
            disabled={isGenerating}
            className="border-neutral-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm text-neutral-700">
            Short Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            value={productInput.description}
            onChange={(e) => setProductInput({ ...productInput, description: e.target.value })}
            placeholder="Describe what your product does"
            rows={3}
            disabled={isGenerating}
            className="border-neutral-200 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="target-users" className="text-sm text-neutral-700">
              Target Users
            </Label>
            <Input
              id="target-users"
              value={productInput.targetUsers}
              onChange={(e) => setProductInput({ ...productInput, targetUsers: e.target.value })}
              placeholder="Who will use this?"
              disabled={isGenerating}
              className="border-neutral-200 focus:border-blue-500 focus:ring-blue-500/20"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="timeline" className="text-sm text-neutral-700">
              Timeline
            </Label>
            <Select
              value={productInput.timeline}
              onValueChange={(value) => setProductInput({ ...productInput, timeline: value })}
              disabled={isGenerating}
            >
              <SelectTrigger id="timeline" className="border-neutral-200">
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
          <p className="text-xs text-neutral-500">
            AI-powered lifecycle planning with Nemotron
          </p>
          <Button
            onClick={onGenerate}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 shadow-sm px-5"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Lifecycle Plan
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
