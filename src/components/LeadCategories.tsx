import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  IconButton,
  Link,
} from '@mui/material';
import {
  LocalFireDepartment,
  AcUnit,
  DeviceThermostat,
  TrendingUp,
  Groups,
  ArrowBack,
  OpenInNew,
} from '@mui/icons-material';

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

export const LeadCategories: React.FC<LeadCategoriesProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<'hot' | 'warm' | 'cold' | null>(null);
  const categorizedLeads = categorizeLeads(data);
  
  const hotLeads = categorizedLeads.filter(lead => lead.category === 'hot');
  const warmLeads = categorizedLeads.filter(lead => lead.category === 'warm');
  const coldLeads = categorizedLeads.filter(lead => lead.category === 'cold');
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'hot': return LocalFireDepartment;
      case 'warm': return DeviceThermostat;
      case 'cold': return AcUnit;
      default: return Groups;
    }
  };
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hot': return 'error';
      case 'warm': return 'warning';
      case 'cold': return 'info';
      default: return 'default';
    }
  };

  const categories = [
    {
      name: 'Hot Leads',
      leads: hotLeads,
      category: 'hot' as const,
      description: 'High urgency, ready to engage',
      color: 'error.main'
    },
    {
      name: 'Warm Leads',
      leads: warmLeads,
      category: 'warm' as const, 
      description: 'Interested, needs nurturing',
      color: 'warning.main'
    },
    {
      name: 'Cold Leads',
      leads: coldLeads,
      category: 'cold' as const,
      description: 'Low urgency, long-term prospects',
      color: 'info.main'
    }
  ];

  const getSelectedLeads = () => {
    if (!selectedCategory) return [];
    return categorizedLeads.filter(lead => lead.category === selectedCategory);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <TrendingUp sx={{ color: 'primary.main' }} />
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Lead Categories
        </Typography>
      </Box>
      
      {/* Summary Cards */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 3
      }}>
        {categories.map((categoryData) => {
          const Icon = getCategoryIcon(categoryData.category);
          return (
            <Card 
              key={categoryData.category} 
              sx={{ 
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4
                }
              }}
              onClick={() => setSelectedCategory(categoryData.category)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: categoryData.color }}>
                      <Icon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                        {categoryData.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {categoryData.description}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: categoryData.color }}>
                      {categoryData.leads.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      leads
                    </Typography>
                  </Box>
                </Box>
                <Button variant="outlined" fullWidth>
                  View Details
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Box>

      {/* Lead Details Modal */}
      <Dialog 
        open={selectedCategory !== null} 
        onClose={() => setSelectedCategory(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton
              onClick={() => setSelectedCategory(null)}
              sx={{ mr: 1 }}
            >
              <ArrowBack />
            </IconButton>
            {selectedCategory && (
              <>
                {React.createElement(getCategoryIcon(selectedCategory), { 
                  sx: { color: categories.find(c => c.category === selectedCategory)?.color }
                })}
                <Typography variant="h6" component="h2">
                  {categories.find(c => c.category === selectedCategory)?.name} ({getSelectedLeads().length})
                </Typography>
              </>
            )}
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {getSelectedLeads().map((lead) => (
              <Card key={lead.id} variant="outlined">
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Groups />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" component="h4" sx={{ fontWeight: 600 }}>
                          {lead.username}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip label={lead.platform} size="small" variant="outlined" />
                          <Chip 
                            label={lead.category} 
                            size="small" 
                            color={getCategoryColor(lead.category)}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <TrendingUp sx={{ fontSize: '1rem', color: 'text.secondary' }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {lead.engagement.toLocaleString()}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        Score: <strong>{lead.urgencyScore.toFixed(1)}</strong>
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ bgcolor: 'grey.50', borderRadius: 2, p: 2, mb: 2 }}>
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {lead.content}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="caption" color="text.secondary">
                      Platform: {lead.platform}
                    </Typography>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<OpenInNew />}
                      onClick={() => window.open(lead.profileUrl, '_blank')}
                    >
                      View Profile
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ))}
            
            {getSelectedLeads().length === 0 && selectedCategory && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Avatar sx={{ bgcolor: 'grey.100', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                  {React.createElement(getCategoryIcon(selectedCategory), { 
                    sx: { fontSize: '2rem', color: 'text.secondary' }
                  })}
                </Avatar>
                <Typography color="text.secondary">
                  No {selectedCategory} leads found
                </Typography>
              </Box>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};