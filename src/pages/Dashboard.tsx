import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import {
  TrendingUp,
  People,
  Timeline,
  Speed,
  Search,
  Download,
  QueryStats,
} from "@mui/icons-material";
import { SearchForm, SearchParams } from "@/components/SearchForm";
import { LeadCategories } from "@/components/LeadCategories";
import { DataTable } from "@/components/DataTable";

const mockData = [
  {
    id: '1',
    username: 'tech_guru_2024',
    platform: 'Twitter',
    postContent: 'Just launched my new AI startup! Looking for urgent investment and technical partners. Need to scale ASAP!',
    engagement: 1247,
    location: 'San Francisco, CA',
    profileUrl: 'https://twitter.com/tech_guru_2024',
    timestamp: '2024-01-15T14:30:00Z',
    postType: 'post' as const
  },
  {
    id: '2',
    username: 'marketing_pro',
    platform: 'LinkedIn',
    postContent: 'Interested in exploring new marketing automation tools for our team. Researching different options.',
    engagement: 834,
    location: 'New York, NY',
    profileUrl: 'https://linkedin.com/in/marketing-pro',
    timestamp: '2024-01-15T12:15:00Z',
    postType: 'comment' as const
  },
  {
    id: '3',
    username: 'data_scientist',
    platform: 'Reddit',
    postContent: 'Maybe looking into machine learning solutions someday. Not sure about timeline yet.',
    engagement: 2156,
    location: 'London, UK',
    profileUrl: 'https://reddit.com/u/data_scientist',
    timestamp: '2024-01-14T18:45:00Z',
    postType: 'post' as const
  },
  {
    id: '4',
    username: 'startup_founder',
    platform: 'Twitter',
    postContent: 'Hiring immediately! Need experienced developers for our fintech startup. Budget approved, ready to onboard!',
    engagement: 892,
    location: 'Austin, TX',
    profileUrl: 'https://twitter.com/startup_founder',
    timestamp: '2024-01-14T16:20:00Z',
    postType: 'post' as const
  }
];

// Stats data
const stats = [
  {
    title: "Total Leads",
    value: "2,847",
    change: "+12.5%",
    icon: <People />,
  },
  {
    title: "Hot Leads",
    value: "342",
    change: "+23.1%",
    icon: <TrendingUp />,
  },
  {
    title: "Conversion Rate",
    value: "18.2%",
    change: "+3.2%",
    icon: <Timeline />,
  },
  {
    title: "Avg. Response Time",
    value: "2.4h",
    change: "-15.3%",
    icon: <Speed />,
  },
];

export const Dashboard: React.FC = () => {
  const handleSearch = (params: SearchParams) => {
    console.log("Search params:", params);
  };

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Welcome back! 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your social media intelligence today.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 4 
      }}>
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
              </Box>
              <Chip
                label={stat.change}
                color={stat.change.startsWith('+') ? 'success' : 'error'}
                size="small"
                variant="outlined"
              />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Search Form */}
      <Box sx={{ mb: 4 }}>
        <SearchForm onSearch={handleSearch} />
      </Box>

      {/* Lead Categories */}
      <Box sx={{ mb: 4 }}>
        <LeadCategories data={mockData} />
      </Box>

      {/* Recent Results */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <QueryStats sx={{ color: 'primary.main' }} />
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              Recent Scraping Results
            </Typography>
          </Box>
          <DataTable data={mockData} />
        </CardContent>
      </Card>
    </Box>
  );
};