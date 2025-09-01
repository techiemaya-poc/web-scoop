import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tab,
  Tabs,
  LinearProgress,
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  Paper,
  Alert,
} from '@mui/material';
import {
  Person,
  LocationOn,
  TrendingUp,
  Analytics,
  AttachMoney,
  Schedule,
  Flight,
  Hotel,
  Restaurant,
  PhotoCamera,
  WhatsApp,
  Instagram,
  Email,
  Phone,
  Lightbulb,
  Psychology,
  Star,
} from '@mui/icons-material';

interface CustomerProfile {
  id: string;
  name: string;
  avatar: string;
  age: number;
  location: string;
  travelStyle: string[];
  budget: string;
  travelWindow: string;
  preferences: string[];
  engagementScore: number;
  conversionProbability: number;
  totalInteractions: number;
  stage: 'research' | 'engagement' | 'decision' | 'booking';
}

interface Interaction {
  id: string;
  type: 'dm' | 'whatsapp' | 'call' | 'email' | 'website';
  content: string;
  timestamp: string;
  channel: string;
}

const mockProfile: CustomerProfile = {
  id: '1',
  name: 'Aditya Roy',
  avatar: '/api/placeholder/80/80',
  age: 29,
  location: 'Mumbai, India',
  travelStyle: ['Adventure', 'Group Travel', 'Photography'],
  budget: '₹80,000 - ₹1,20,000',
  travelWindow: 'June - August 2024',
  preferences: ['Beach destinations', 'Cultural experiences', 'Local cuisine', 'Budget-friendly'],
  engagementScore: 85,
  conversionProbability: 78,
  totalInteractions: 23,
  stage: 'decision',
};

const mockInteractions: Interaction[] = [
  {
    id: '1',
    type: 'instagram',
    content: 'Commented on Thailand beach photos',
    timestamp: '2024-01-15 14:30',
    channel: 'Instagram',
  },
  {
    id: '2',
    type: 'whatsapp',
    content: 'Asked about group package pricing',
    timestamp: '2024-01-15 16:45',
    channel: 'WhatsApp',
  },
  {
    id: '3',
    type: 'call',
    content: '15-minute consultation call',
    timestamp: '2024-01-16 11:00',
    channel: 'Phone',
  },
  {
    id: '4',
    type: 'email',
    content: 'Requested detailed itinerary',
    timestamp: '2024-01-16 18:20',
    channel: 'Email',
  },
];

const aiInsights = [
  {
    type: 'recommendation',
    title: 'Best Time to Follow Up',
    content: 'Customer is most active between 6-9 PM IST. Schedule next outreach accordingly.',
    priority: 'high',
  },
  {
    type: 'offer',
    title: 'Personalized Package',
    content: 'Create custom Thailand package focusing on adventure activities and group discounts.',
    priority: 'high',
  },
  {
    type: 'timing',
    title: 'Booking Window',
    content: 'Customer likely to book within next 7 days based on interaction patterns.',
    priority: 'medium',
  },
  {
    type: 'competition',
    title: 'Price Sensitivity',
    content: 'Comparing prices with 2 other agencies. Consider offering limited-time discount.',
    priority: 'medium',
  },
];

const getStageColor = (stage: string) => {
  switch (stage) {
    case 'research': return 'info';
    case 'engagement': return 'warning';
    case 'decision': return 'success';
    case 'booking': return 'primary';
    default: return 'default';
  }
};

const getInteractionIcon = (type: string) => {
  switch (type) {
    case 'instagram': return <Instagram sx={{ color: '#E4405F' }} />;
    case 'whatsapp': return <WhatsApp sx={{ color: '#25D366' }} />;
    case 'call': return <Phone sx={{ color: '#2196F3' }} />;
    case 'email': return <Email sx={{ color: '#EA4335' }} />;
    default: return <Person />;
  }
};

export const Customer360: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Customer 360° Dashboard 🎯
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Complete customer journey and AI-powered insights
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Customer Profile Card */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: 'fit-content', mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={mockProfile.avatar}
                  sx={{ width: 80, height: 80, mr: 2 }}
                >
                  {mockProfile.name.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {mockProfile.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {mockProfile.age} years old
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <LocationOn sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      {mockProfile.location}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Journey Stage */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Journey Stage
                </Typography>
                <Chip
                  label={mockProfile.stage.charAt(0).toUpperCase() + mockProfile.stage.slice(1)}
                  color={getStageColor(mockProfile.stage) as any}
                  sx={{ textTransform: 'capitalize' }}
                />
              </Box>

              {/* Engagement Score */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Engagement Score
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h4" color="primary" sx={{ mr: 1 }}>
                    {mockProfile.engagementScore}%
                  </Typography>
                  <Chip label="Highly Engaged" color="success" size="small" />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={mockProfile.engagementScore}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              {/* Conversion Probability */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                  Conversion Probability
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="h4" color="success.main" sx={{ mr: 1 }}>
                    {mockProfile.conversionProbability}%
                  </Typography>
                  <Chip label="High Intent" color="success" size="small" />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={mockProfile.conversionProbability}
                  color="success"
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              {/* Key Stats */}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary">
                      {mockProfile.totalInteractions}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Interactions
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="h5" color="primary">
                      7
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Days Active
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Psychology sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  AI Insights
                </Typography>
              </Box>
              
              <Box sx={{ space: 1 }}>
                {aiInsights.map((insight, index) => (
                  <Alert
                    key={index}
                    severity={insight.priority === 'high' ? 'warning' : 'info'}
                    sx={{ mb: 1 }}
                    icon={<Lightbulb />}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {insight.title}
                    </Typography>
                    <Typography variant="body2">
                      {insight.content}
                    </Typography>
                  </Alert>
                ))}
              </Box>

              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                startIcon={<Star />}
              >
                Generate Action Plan
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Tabs
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 3 }}
              >
                <Tab label="Travel Profile" />
                <Tab label="Interaction History" />
                <Tab label="Preferences" />
                <Tab label="Analytics" />
              </Tabs>

              {/* Travel Profile Tab */}
              {tabValue === 0 && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Travel Preferences
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary="Travel Window"
                          secondary={mockProfile.travelWindow}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Budget Range"
                          secondary={mockProfile.budget}
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Travel Style"
                          secondary={
                            <Box sx={{ mt: 0.5 }}>
                              {mockProfile.travelStyle.map((style) => (
                                <Chip key={style} label={style} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                              ))}
                            </Box>
                          }
                        />
                      </ListItem>
                    </List>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Interests & Preferences
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {mockProfile.preferences.map((pref) => (
                        <Chip
                          key={pref}
                          label={pref}
                          variant="outlined"
                          icon={
                            pref.includes('Beach') ? <PhotoCamera /> :
                            pref.includes('Cultural') ? <Restaurant /> :
                            pref.includes('cuisine') ? <Restaurant /> :
                            <Flight />
                          }
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              )}

              {/* Interaction History Tab */}
              {tabValue === 1 && (
                <Timeline>
                  {mockInteractions.map((interaction, index) => (
                    <TimelineItem key={interaction.id}>
                      <TimelineSeparator>
                        <TimelineDot color="primary">
                          {getInteractionIcon(interaction.type)}
                        </TimelineDot>
                        {index < mockInteractions.length - 1 && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Paper sx={{ p: 2, mb: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {interaction.channel}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {interaction.content}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {interaction.timestamp}
                          </Typography>
                        </Paper>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              )}

              {/* Preferences Tab */}
              {tabValue === 2 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Detailed Travel Preferences
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Hotel sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              Accommodation
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            3-4 star hotels, good location, group-friendly
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Flight sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              Transportation
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Economy flights, local transport included
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <Restaurant sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              Food & Dining
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Local cuisine, street food tours, vegetarian options
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <PhotoCamera sx={{ mr: 1, color: 'primary.main' }} />
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              Activities
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Adventure sports, cultural sites, photography spots
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Analytics Tab */}
              {tabValue === 3 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Engagement Analytics
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
                            23
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Touchpoints
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h4" color="success.main" sx={{ mb: 1 }}>
                            2.3h
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Avg. Response Time
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};