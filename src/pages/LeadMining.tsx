import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Badge,
  InputAdornment,
} from '@mui/material';
import {
  TrendingUp,
  Search,
  FilterList,
  Refresh,
  Instagram,
  YouTube,
  Facebook,
  Twitter,
  LinkedIn,
  LocationOn,
  AccessTime,
  Visibility,
  PersonAdd,
  Chat,
} from '@mui/icons-material';

interface Lead {
  id: string;
  name: string;
  platform: string;
  avatar: string;
  content: string;
  location: string;
  timestamp: string;
  engagement: number;
  category: 'hot' | 'warm' | 'cold';
}

const mockLeads: Lead[] = [
  {
    id: '1',
    name: 'Aditya Roy',
    platform: 'Instagram',
    avatar: '/api/placeholder/40/40',
    content: 'Looking for Thailand packages for summer vacation with friends',
    location: 'Mumbai, India',
    timestamp: '2 hours ago',
    engagement: 156,
    category: 'hot',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    platform: 'YouTube',
    avatar: '/api/placeholder/40/40',
    content: 'Subscribed to Thailand travel vlogs, commented on budget travel tips',
    location: 'London, UK',
    timestamp: '4 hours ago',
    engagement: 89,
    category: 'warm',
  },
  {
    id: '3',
    name: 'Mike Chen',
    platform: 'Facebook',
    avatar: '/api/placeholder/40/40',
    content: 'Liked several posts about Asian destinations',
    location: 'Sydney, Australia',
    timestamp: '6 hours ago',
    engagement: 23,
    category: 'cold',
  },
];

const stats = [
  { title: 'Active Monitors', value: '12', change: '+2 today', icon: <Search /> },
  { title: 'Leads Detected', value: '847', change: '+156 today', icon: <TrendingUp /> },
  { title: 'Hot Leads', value: '124', change: '+34 today', icon: <TrendingUp /> },
  { title: 'Conversion Rate', value: '18.5%', change: '+2.3% this week', icon: <TrendingUp /> },
];

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'instagram': return <Instagram sx={{ color: '#E4405F' }} />;
    case 'youtube': return <YouTube sx={{ color: '#FF0000' }} />;
    case 'facebook': return <Facebook sx={{ color: '#1877F2' }} />;
    case 'twitter': return <Twitter sx={{ color: '#1DA1F2' }} />;
    case 'linkedin': return <LinkedIn sx={{ color: '#0A66C2' }} />;
    default: return <Chat />;
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

export const LeadMining: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [platformFilter, setPlatformFilter] = useState('all');
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true);

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = platformFilter === 'all' || lead.platform.toLowerCase() === platformFilter;
    return matchesSearch && matchesPlatform;
  });

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          AI Lead Mining Dashboard 🎯
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Real-time detection of potential travelers across social platforms
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card>
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
                  color="success"
                  size="small"
                  variant="outlined"
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Monitoring Controls */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
              <TextField
                placeholder="Search keywords (e.g., Thailand trips)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 200, flex: 1 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Platform</InputLabel>
                <Select
                  value={platformFilter}
                  label="Platform"
                  onChange={(e) => setPlatformFilter(e.target.value)}
                  startAdornment={<FilterList />}
                >
                  <MenuItem value="all">All Platforms</MenuItem>
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="youtube">YouTube</MenuItem>
                  <MenuItem value="facebook">Facebook</MenuItem>
                  <MenuItem value="twitter">Twitter</MenuItem>
                  <MenuItem value="linkedin">LinkedIn</MenuItem>
                </Select>
              </FormControl>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={realTimeMonitoring}
                    onChange={(e) => setRealTimeMonitoring(e.target.checked)}
                    color="primary"
                  />
                }
                label="Real-time Monitoring"
              />
              <Button
                variant="outlined"
                startIcon={<Refresh />}
                onClick={() => console.log('Refreshing leads')}
              >
                Refresh
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Live Feed */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
              Live Lead Detection Feed
            </Typography>
            <Badge badgeContent={filteredLeads.length} color="primary">
              <TrendingUp />
            </Badge>
          </Box>
          
          <List>
            {filteredLeads.map((lead) => (
              <ListItem key={lead.id} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, mb: 1 }}>
                <ListItemAvatar>
                  <Avatar src={lead.avatar} sx={{ width: 48, height: 48 }}>
                    {lead.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography variant="h6" component="span">
                        {lead.name}
                      </Typography>
                      <Chip
                        icon={getPlatformIcon(lead.platform)}
                        label={lead.platform}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        label={lead.category.toUpperCase()}
                        size="small"
                        color={getCategoryColor(lead.category) as any}
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {lead.content}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, fontSize: '0.75rem', color: 'text.secondary' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <LocationOn fontSize="inherit" />
                          {lead.location}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <AccessTime fontSize="inherit" />
                          {lead.timestamp}
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <Visibility fontSize="inherit" />
                          {lead.engagement}
                        </Box>
                      </Box>
                    </Box>
                  }
                />
                
                <ListItemSecondaryAction>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton size="small" color="primary">
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="success">
                      <PersonAdd />
                    </IconButton>
                    <IconButton size="small" color="info">
                      <Chat />
                    </IconButton>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};