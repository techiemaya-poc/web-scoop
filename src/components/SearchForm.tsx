import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, Filter, Search } from 'lucide-react';

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export interface SearchParams {
  keywords: string;
  location: string;
  platform: string;
  dateRange: string;
  engagementLevel: string;
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [params, setParams] = useState<SearchParams>({
    keywords: '',
    location: '',
    platform: '',
    dateRange: '',
    engagementLevel: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(params);
  };

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-sm shadow-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold">Search Parameters</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords</Label>
            <Input
              id="keywords"
              placeholder="Enter keywords to search for..."
              value={params.keywords}
              onChange={(e) => setParams(prev => ({ ...prev, keywords: e.target.value }))}
              className="transition-smooth focus:shadow-glow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              id="location"
              placeholder="City, Country, or Region"
              value={params.location}
              onChange={(e) => setParams(prev => ({ ...prev, location: e.target.value }))}
              className="transition-smooth focus:shadow-glow"
            />
          </div>

          <div className="space-y-2">
            <Label>Platform</Label>
            <Select value={params.platform} onValueChange={(value) => setParams(prev => ({ ...prev, platform: value }))}>
              <SelectTrigger className="transition-smooth focus:shadow-glow">
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="twitter">Twitter/X</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="reddit">Reddit</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Date Range
            </Label>
            <Select value={params.dateRange} onValueChange={(value) => setParams(prev => ({ ...prev, dateRange: value }))}>
              <SelectTrigger className="transition-smooth focus:shadow-glow">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Engagement Level
            </Label>
            <Select value={params.engagementLevel} onValueChange={(value) => setParams(prev => ({ ...prev, engagementLevel: value }))}>
              <SelectTrigger className="transition-smooth focus:shadow-glow">
                <SelectValue placeholder="Select engagement level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any engagement</SelectItem>
                <SelectItem value="low">Low (1-10 interactions)</SelectItem>
                <SelectItem value="medium">Medium (11-100 interactions)</SelectItem>
                <SelectItem value="high">High (100+ interactions)</SelectItem>
                <SelectItem value="viral">Viral (1000+ interactions)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-gradient-primary hover:shadow-elegant transition-smooth"
          size="lg"
        >
          <Search className="h-4 w-4 mr-2" />
          Start Scraping
        </Button>
      </form>
    </Card>
  );
};