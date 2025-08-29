import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Filter, Search, ExternalLink, User, MessageCircle, Flame, Thermometer, Snowflake } from 'lucide-react';

interface ScrapedData {
  id: string;
  username: string;
  platform: string;
  postContent: string;
  engagement: number;
  location?: string;
  profileUrl: string;
  timestamp: string;
  postType: 'post' | 'comment';
}

interface DataTableProps {
  data?: ScrapedData[];
}

// Lead categorization logic
const categorizeLeadFromContent = (content: string, engagement: number) => {
  const text = content.toLowerCase();
  let score = 0;
  
  const hotKeywords = ['urgent', 'asap', 'immediate', 'need now', 'looking for', 'hiring', 'budget approved', 'ready to buy'];
  const warmKeywords = ['interested', 'considering', 'planning', 'researching', 'exploring', 'thinking about'];
  const coldKeywords = ['maybe', 'someday', 'future', 'not sure', 'just looking'];
  
  hotKeywords.forEach(keyword => {
    if (text.includes(keyword)) score += 3;
  });
  
  warmKeywords.forEach(keyword => {
    if (text.includes(keyword)) score += 2;
  });
  
  coldKeywords.forEach(keyword => {
    if (text.includes(keyword)) score -= 1;
  });
  
  if (engagement > 1000) score += 1;
  if (engagement > 500) score += 0.5;
  
  if (score >= 4) return { category: 'hot' as const, score };
  if (score >= 2) return { category: 'warm' as const, score };
  return { category: 'cold' as const, score };
};

const mockData: ScrapedData[] = [
  {
    id: '1',
    username: 'tech_guru_2024',
    platform: 'Twitter',
    postContent: 'Just launched my new AI startup! Excited to share what we\'ve been building...',
    engagement: 1247,
    location: 'San Francisco, CA',
    profileUrl: 'https://twitter.com/tech_guru_2024',
    timestamp: '2024-01-15T14:30:00Z',
    postType: 'post'
  },
  {
    id: '2',
    username: 'marketing_pro',
    platform: 'LinkedIn',
    postContent: 'Great insights on social media marketing trends for 2024',
    engagement: 834,
    location: 'New York, NY',
    profileUrl: 'https://linkedin.com/in/marketing-pro',
    timestamp: '2024-01-15T12:15:00Z',
    postType: 'comment'
  },
  {
    id: '3',
    username: 'data_scientist',
    platform: 'Reddit',
    postContent: 'Analysis of recent machine learning developments and their impact',
    engagement: 2156,
    location: 'London, UK',
    profileUrl: 'https://reddit.com/u/data_scientist',
    timestamp: '2024-01-14T18:45:00Z',
    postType: 'post'
  }
];

export const DataTable = ({ data: propData }: DataTableProps) => {
  const [data] = useState<ScrapedData[]>(propData || mockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = data.filter(item => {
    const matchesSearch = item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.postContent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || item.platform.toLowerCase() === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = (format: string) => {
    // Export functionality will be implemented with backend
    console.log(`Exporting data as ${format}`);
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card className="p-6 bg-card shadow-card border border-border">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-semibold">Scraped Data Results</h2>
            <p className="text-muted-foreground">{filteredData.length} total results</p>
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => handleExport('csv')} 
              variant="outline"
              className="transition-smooth hover:shadow-glow"
            >
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button 
              onClick={() => handleExport('json')} 
              variant="outline"
              className="transition-smooth hover:shadow-glow"
            >
              <Download className="h-4 w-4 mr-2" />
              Export JSON
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by username or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 transition-smooth focus:shadow-glow"
            />
          </div>
          
          <Select value={platformFilter} onValueChange={setPlatformFilter}>
            <SelectTrigger className="w-full sm:w-48 transition-smooth focus:shadow-glow">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="twitter">Twitter</SelectItem>
              <SelectItem value="linkedin">LinkedIn</SelectItem>
              <SelectItem value="reddit">Reddit</SelectItem>
              <SelectItem value="instagram">Instagram</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>User</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Content Preview</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Lead Score</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((item) => {
                const leadData = categorizeLeadFromContent(item.postContent, item.engagement);
                const getCategoryIcon = (category: string) => {
                  switch (category) {
                    case 'hot': return Flame;
                    case 'warm': return Thermometer;
                    case 'cold': return Snowflake;
                    default: return MessageCircle;
                  }
                };
                const getCategoryColor = (category: string) => {
                  switch (category) {
                    case 'hot': return 'text-red-500';
                    case 'warm': return 'text-orange-500';
                    case 'cold': return 'text-blue-500';
                    default: return 'text-muted-foreground';
                  }
                };
                const Icon = getCategoryIcon(leadData.category);
                
                return (
                <TableRow key={item.id} className="hover:bg-muted/30 transition-smooth">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      {item.username}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{item.platform}</Badge>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="truncate text-sm">{item.postContent}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                      {item.engagement.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Icon className={`h-4 w-4 ${getCategoryColor(leadData.category)}`} />
                      <Badge 
                        variant={leadData.category === 'hot' ? 'destructive' : leadData.category === 'warm' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {leadData.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {leadData.score.toFixed(1)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{item.location || 'N/A'}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatTimestamp(item.timestamp)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={item.postType === 'post' ? 'default' : 'outline'}>
                      {item.postType}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(item.profileUrl, '_blank')}
                      className="transition-smooth hover:shadow-glow"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="transition-smooth"
            >
              Previous
            </Button>
            <span className="flex items-center px-4 text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="transition-smooth"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};