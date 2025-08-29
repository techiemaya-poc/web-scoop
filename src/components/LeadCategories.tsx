import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Flame, Snowflake, Thermometer, TrendingUp, Eye, Users, ArrowLeft, ExternalLink } from 'lucide-react';

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
  const [selectedCategory, setSelectedCategory] = useState<'hot' | 'warm' | 'cold' | null>(null);
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
      category: 'hot' as const,
      description: 'High urgency, ready to engage',
      color: 'text-red-500'
    },
    {
      name: 'Warm Leads',
      leads: warmLeads,
      category: 'warm' as const, 
      description: 'Interested, needs nurturing',
      color: 'text-orange-500'
    },
    {
      name: 'Cold Leads',
      leads: coldLeads,
      category: 'cold' as const,
      description: 'Low urgency, long-term prospects',
      color: 'text-blue-500'
    }
  ];

  const getSelectedLeads = () => {
    if (!selectedCategory) return [];
    return categorizedLeads.filter(lead => lead.category === selectedCategory);
  };

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
            <Card 
              key={categoryData.category} 
              className="p-6 bg-card shadow-card border border-border cursor-pointer hover:shadow-elegant transition-all duration-300 hover:scale-105"
              onClick={() => setSelectedCategory(categoryData.category)}
            >
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
              <div className="text-center">
                <Button variant="outline" size="sm" className="w-full">
                  View Details
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Lead Details Modal */}
      <Dialog open={selectedCategory !== null} onOpenChange={(open) => !open && setSelectedCategory(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className="mr-2"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              {selectedCategory && (
                <>
                  {React.createElement(getCategoryIcon(selectedCategory), { 
                    className: `h-6 w-6 ${categories.find(c => c.category === selectedCategory)?.color}` 
                  })}
                  <DialogTitle className="text-xl">
                    {categories.find(c => c.category === selectedCategory)?.name} ({getSelectedLeads().length})
                  </DialogTitle>
                </>
              )}
            </div>
          </DialogHeader>
          
          <div className="overflow-y-auto max-h-[60vh] pr-2">
            <div className="space-y-4">
              {getSelectedLeads().map((lead) => (
                <Card key={lead.id} className="p-4 border border-border">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{lead.username}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary">{lead.platform}</Badge>
                          <Badge variant={lead.category === 'hot' ? 'destructive' : lead.category === 'warm' ? 'default' : 'outline'}>
                            {lead.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{lead.engagement.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Score: <span className="font-bold">{lead.urgencyScore.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-3 mb-3">
                    <p className="text-sm text-foreground leading-relaxed">
                      {lead.content}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Platform: {lead.platform}
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(lead.profileUrl, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View Profile
                    </Button>
                  </div>
                </Card>
              ))}
              
              {getSelectedLeads().length === 0 && selectedCategory && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-3">
                    {React.createElement(getCategoryIcon(selectedCategory), { 
                      className: 'h-8 w-8 text-muted-foreground' 
                    })}
                  </div>
                  <p className="text-muted-foreground">
                    No {selectedCategory} leads found
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};