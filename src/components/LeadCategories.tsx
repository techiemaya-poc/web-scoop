import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Flame, Snowflake, Thermometer, TrendingUp, Eye, Users } from 'lucide-react';

interface Lead {
  id: string;
  username: string;
  platform: string;
  content: string;
  engagement: number;
  category: 'hot' | 'warm' | 'cold';
  urgencyScore: number;
  profileUrl: string;
}

// Lead scoring logic based on content keywords and engagement
const categorizeLeads = (data: any[]): Lead[] => {
  return data.map(item => {
    const content = item.postContent.toLowerCase();
    let score = 0;
    
    // High urgency keywords (Hot leads)
    const hotKeywords = ['urgent', 'asap', 'immediate', 'need now', 'looking for', 'hiring', 'budget approved', 'ready to buy'];
    const warmKeywords = ['interested', 'considering', 'planning', 'researching', 'exploring', 'thinking about'];
    const coldKeywords = ['maybe', 'someday', 'future', 'not sure', 'just looking'];
    
    // Calculate urgency score
    hotKeywords.forEach(keyword => {
      if (content.includes(keyword)) score += 3;
    });
    
    warmKeywords.forEach(keyword => {
      if (content.includes(keyword)) score += 2;
    });
    
    coldKeywords.forEach(keyword => {
      if (content.includes(keyword)) score -= 1;
    });
    
    // Engagement factor
    if (item.engagement > 1000) score += 1;
    if (item.engagement > 500) score += 0.5;
    
    // Determine category
    let category: 'hot' | 'warm' | 'cold';
    if (score >= 4) category = 'hot';
    else if (score >= 2) category = 'warm';
    else category = 'cold';
    
    return {
      id: item.id,
      username: item.username,
      platform: item.platform,
      content: item.postContent,
      engagement: item.engagement,
      category,
      urgencyScore: Math.max(0, score),
      profileUrl: item.profileUrl
    };
  });
};

interface LeadCategoriesProps {
  data: any[];
}

export const LeadCategories = ({ data }: LeadCategoriesProps) => {
  const categorizedLeads = categorizeLeads(data);
  
  const hotLeads = categorizedLeads.filter(lead => lead.category === 'hot');
  const warmLeads = categorizedLeads.filter(lead => lead.category === 'warm');
  const coldLeads = categorizedLeads.filter(lead => lead.category === 'cold');
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hot': return Flame;
      case 'warm': return Thermometer;
      case 'cold': return Snowflake;
      default: return Users;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hot': return 'text-red-500 bg-red-50 border-red-200';
      case 'warm': return 'text-orange-500 bg-orange-50 border-orange-200';
      case 'cold': return 'text-blue-500 bg-blue-50 border-blue-200';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const categories = [
    {
      name: 'Hot Leads',
      leads: hotLeads,
      category: 'hot',
      description: 'High urgency, ready to engage',
      color: 'text-red-500'
    },
    {
      name: 'Warm Leads',
      leads: warmLeads,
      category: 'warm', 
      description: 'Interested, needs nurturing',
      color: 'text-orange-500'
    },
    {
      name: 'Cold Leads',
      leads: coldLeads,
      category: 'cold',
      description: 'Low urgency, long-term prospects',
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-semibold">Lead Categories</h2>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((categoryData) => {
          const Icon = getCategoryIcon(categoryData.category);
          return (
            <Card key={categoryData.category} className="p-6 bg-card shadow-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(categoryData.category)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{categoryData.name}</h3>
                    <p className="text-sm text-muted-foreground">{categoryData.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${categoryData.color}`}>
                    {categoryData.leads.length}
                  </div>
                  <p className="text-sm text-muted-foreground">leads</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Detailed Lead Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {categories.map((categoryData) => {
          const Icon = getCategoryIcon(categoryData.category);
          return (
            <Card key={`${categoryData.category}-details`} className="p-6 bg-card shadow-card border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Icon className={`h-5 w-5 ${categoryData.color}`} />
                <h3 className="font-semibold">{categoryData.name}</h3>
                <Badge variant="outline" className="ml-auto">
                  {categoryData.leads.length}
                </Badge>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {categoryData.leads.slice(0, 5).map((lead) => (
                  <div key={lead.id} className="p-3 border border-border rounded-lg bg-muted/20 hover:bg-muted/40 transition-smooth">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-sm">{lead.username}</p>
                        <Badge variant="secondary" className="text-xs">
                          {lead.platform}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        {lead.engagement}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {lead.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-medium">Score:</span>
                        <span className={`text-xs font-bold ${categoryData.color}`}>
                          {lead.urgencyScore.toFixed(1)}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(lead.profileUrl, '_blank')}
                        className="h-6 px-2 text-xs"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {categoryData.leads.length > 5 && (
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View All {categoryData.leads.length} Leads
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};