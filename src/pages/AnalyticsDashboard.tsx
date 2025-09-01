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
  ListItemAvatar,
  Divider,
  Paper,
  LinearProgress,
  Tab,
  Tabs,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Speed,
  MonetizationOn,
  People,
  Schedule,
  CheckCircle,
  Analytics,
  Assessment,
  Timeline,
  BarChart,
  PieChart,
  ShowChart,
  Star,
  ThumbUp,
  AccessTime,
  AttachMoney,
} from '@mui/icons-material';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  previousValue: string;
  icon: React.ReactNode;
  color: string;
}

interface TestimonialData {
  id: string;
  customerName: string;
  avatar: string;
  rating: number;
  comment: string;
  destination: string;
  date: string;
}

const kpiMetrics: MetricCard[] = [
  {
    title: 'Lead Qualification Time',
    value: '2 hours',
    change: '-75%',
    changeType: 'positive',
    previousValue: '3 days',
    icon: <Schedule />,
    color: '#2196F3',
  },
  {
    title: 'Engagement Rate',
    value: '94%',
    change: '+70%',
    changeType: 'positive',
    previousValue: '24%',
    icon: <TrendingUp />,
    color: '#4CAF50',
  },
  {
    title: 'Conversion Speed',
    value: '2 weeks',
    change: '-85%',
    changeType: 'positive',
    previousValue: '2 months',
    icon: <Speed />,
    color: '#FF9800',
  },
  {
    title: 'Cost per Lead',
    value: '₹240',
    change: '-40%',
    changeType: 'positive',
    previousValue: '₹400',
    icon: <MonetizationOn />,
    color: '#9C27B0',
  },
];

const conversionFunnelData = [
  { stage: 'Website Visitors', value: 10000, percentage: 100 },
  { stage: 'Social Engagement', value: 2500, percentage: 25 },
  { stage: 'Lead Generation', value: 850, percentage: 8.5 },
  { stage: 'Qualified Leads', value: 425, percentage: 4.25 },
  { stage: 'Proposals Sent', value: 180, percentage: 1.8 },
  { stage: 'Bookings Confirmed', value: 78, percentage: 0.78 },
];

const testimonials: TestimonialData[] = [
  {
    id: '1',
    customerName: 'Aditya Roy',
    avatar: '/api/placeholder/48/48',
    rating: 5,
    comment: 'Amazing personalized experience! Maya understood exactly what I was looking for and created the perfect Thailand itinerary.',
    destination: 'Thailand',
    date: '2024-01-15',
  },
  {
    id: '2',
    customerName: 'Sarah Johnson',
    avatar: '/api/placeholder/48/48',
    rating: 5,
    comment: 'The AI-powered recommendations were spot-on. Best travel planning experience I\'ve ever had!',
    destination: 'Bali',
    date: '2024-01-12',
  },
  {
    id: '3',
    customerName: 'Mike Chen',
    avatar: '/api/placeholder/48/48',
    rating: 4,
    comment: 'Quick responses and great attention to detail. Will definitely use their services again.',
    destination: 'Japan',
    date: '2024-01-10',
  },
];

const monthlyStats = [
  { month: 'Jan', leads: 245, conversions: 67, revenue: 890000 },
  { month: 'Feb', leads: 289, conversions: 78, revenue: 1050000 },
  { month: 'Mar', leads: 334, conversions: 89, revenue: 1180000 },
  { month: 'Apr', leads: 378, conversions: 95, revenue: 1340000 },
  { month: 'May', leads: 421, conversions: 112, revenue: 1520000 },
  { month: 'Jun', leads: 467, conversions: 124, revenue: 1680000 },
];

const costSavings = [
  { category: 'Lead Generation', before: 400, after: 240, savings: 40 },
  { category: 'Customer Support', before: 800, after: 320, savings: 60 },
  { category: 'Processing Time', before: 720, after: 120, savings: 83 },
  { category: 'Manual Tasks', before: 1200, after: 180, savings: 85 },
];

export const AnalyticsDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('6months');

  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
              Results & Analytics Dashboard 📊
            </Typography>
            <Typography variant="body1" color="text.secondary">
              AI Maya Impact Analysis & Performance Metrics
            </Typography>
          </Box>
          
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Time Range</InputLabel>
            <Select
              value={timeRange}
              label="Time Range"
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <MenuItem value="1month">Last Month</MenuItem>
              <MenuItem value="3months">Last 3 Months</MenuItem>
              <MenuItem value="6months">Last 6 Months</MenuItem>
              <MenuItem value="1year">Last Year</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* KPI Metrics Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {kpiMetrics.map((metric) => (
          <Grid item xs={12} sm={6} md={3} key={metric.title}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ bgcolor: metric.color, mr: 2 }}>
                    {metric.icon}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: metric.color }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {metric.title}
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {metric.changeType === 'positive' ? (
                      <TrendingUp sx={{ color: 'success.main', mr: 0.5 }} />
                    ) : (
                      <TrendingDown sx={{ color: 'error.main', mr: 0.5 }} />
                    )}
                    <Typography
                      variant="body2"
                      sx={{ 
                        color: metric.changeType === 'positive' ? 'success.main' : 'error.main',
                        fontWeight: 600 
                      }}
                    >
                      {metric.change}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    from {metric.previousValue}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content Tabs */}
      <Card>
        <CardContent>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 3 }}
          >
            <Tab icon={<ShowChart />} label="Conversion Funnel" />
            <Tab icon={<BarChart />} label="Monthly Trends" />
            <Tab icon={<AttachMoney />} label="Cost Savings" />
            <Tab icon={<Star />} label="Customer Feedback" />
          </Tabs>

          {/* Conversion Funnel Tab */}
          {tabValue === 0 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Lead to Booking Conversion Funnel
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ space: 2 }}>
                    {conversionFunnelData.map((stage, index) => (
                      <Paper key={stage.stage} sx={{ p: 3, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {stage.stage}
                          </Typography>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h5" color="primary">
                              {stage.value.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {stage.percentage.toFixed(1)}%
                            </Typography>
                          </Box>
                        </Box>
                        
                        <LinearProgress
                          variant="determinate"
                          value={stage.percentage}
                          sx={{
                            height: 12,
                            borderRadius: 6,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              bgcolor: `hsl(${120 - (index * 15)}, 70%, 50%)`,
                            }
                          }}
                        />
                      </Paper>
                    ))}
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Funnel Insights
                    </Typography>
                    
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'success.main' }}>
                            <TrendingUp />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Conversion Rate"
                          secondary="0.78% (Industry avg: 0.2%)"
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <People />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Lead Quality"
                          secondary="50% higher than manual process"
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'warning.main' }}>
                            <AccessTime />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Avg. Cycle Time"
                          secondary="14 days vs 60 days before"
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Monthly Trends Tab */}
          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Performance Trends Over Time
              </Typography>
              
              <Grid container spacing={3}>
                {monthlyStats.map((month) => (
                  <Grid item xs={12} sm={6} md={2} key={month.month}>
                    <Paper sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {month.month}
                      </Typography>
                      <Typography variant="h5" color="primary" sx={{ mb: 0.5 }}>
                        {month.leads}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Leads Generated
                      </Typography>
                      <Typography variant="h6" color="success.main" sx={{ mb: 0.5 }}>
                        {month.conversions}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                        Conversions
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{(month.revenue / 100000).toFixed(1)}L
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
              
              <Box sx={{ mt: 4 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          Growth Metrics
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
                          <Typography variant="body1">
                            Lead Growth: <strong>+90%</strong>
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
                          <Typography variant="body1">
                            Revenue Growth: <strong>+89%</strong>
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <TrendingUp sx={{ color: 'success.main', mr: 1 }} />
                          <Typography variant="body1">
                            Conversion Rate: <strong>+85%</strong>
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                  
                  <Grid item xs={12} md={8}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                          Key Achievements
                        </Typography>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                              <Typography variant="body2">
                                Achieved 0.78% conversion rate (4x industry average)
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                              <Typography variant="body2">
                                Reduced lead qualification time by 75%
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                              <Typography variant="body2">
                                Increased engagement rate to 94%
                              </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                              <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                              <Typography variant="body2">
                                Generated ₹9.86Cr revenue in 6 months
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          )}

          {/* Cost Savings Tab */}
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Cost Optimization & Savings Analysis
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ space: 2 }}>
                    {costSavings.map((item) => (
                      <Paper key={item.category} sx={{ p: 3, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {item.category}
                          </Typography>
                          <Chip
                            label={`${item.savings}% savings`}
                            color="success"
                            variant="filled"
                          />
                        </Box>
                        
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                          <Grid item xs={4}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="body2" color="text.secondary">
                                Before
                              </Typography>
                              <Typography variant="h6" color="error.main">
                                ₹{item.before}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="body2" color="text.secondary">
                                After
                              </Typography>
                              <Typography variant="h6" color="success.main">
                                ₹{item.after}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Box sx={{ textAlign: 'center' }}>
                              <Typography variant="body2" color="text.secondary">
                                Saved
                              </Typography>
                              <Typography variant="h6" color="primary.main">
                                ₹{item.before - item.after}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        
                        <LinearProgress
                          variant="determinate"
                          value={item.savings}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Paper>
                    ))}
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Total Savings Summary
                    </Typography>
                    
                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Typography variant="h3" color="success.main" sx={{ fontWeight: 600 }}>
                        ₹2.16L
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Monthly Savings
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ mb: 2 }} />
                    
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="h4" color="primary.main" sx={{ fontWeight: 600 }}>
                        ₹25.9L
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Annual Projection
                      </Typography>
                    </Box>
                  </Paper>
                  
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      ROI Analysis
                    </Typography>
                    
                    <List dense>
                      <ListItem>
                        <ListItemText
                          primary="Implementation Cost"
                          secondary="₹8.5L (one-time)"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Payback Period"
                          secondary="4 months"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          primary="Annual ROI"
                          secondary="305%"
                        />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Customer Feedback Tab */}
          {tabValue === 3 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Customer Testimonials & Feedback
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 3, textAlign: 'center', mb: 3 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', width: 64, height: 64, mx: 'auto', mb: 2 }}>
                      <Star sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography variant="h3" color="primary.main" sx={{ fontWeight: 600 }}>
                      {averageRating.toFixed(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Average Rating
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          sx={{
                            color: star <= averageRating ? 'warning.main' : 'grey.300',
                            fontSize: 20,
                          }}
                        />
                      ))}
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Based on {testimonials.length} reviews
                    </Typography>
                  </Paper>
                  
                  <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      Satisfaction Metrics
                    </Typography>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Service Quality</Typography>
                        <Typography variant="body2">96%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={96} />
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Response Time</Typography>
                        <Typography variant="body2">94%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={94} />
                    </Box>
                    
                    <Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Recommendation Rate</Typography>
                        <Typography variant="body2">98%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={98} />
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} md={8}>
                  <Box sx={{ space: 2 }}>
                    {testimonials.map((testimonial) => (
                      <Paper key={testimonial.id} sx={{ p: 3, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar src={testimonial.avatar} sx={{ mr: 2 }}>
                            {testimonial.customerName.charAt(0)}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {testimonial.customerName}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Box sx={{ display: 'flex' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    sx={{
                                      color: star <= testimonial.rating ? 'warning.main' : 'grey.300',
                                      fontSize: 16,
                                    }}
                                  />
                                ))}
                              </Box>
                              <Chip
                                label={testimonial.destination}
                                size="small"
                                variant="outlined"
                              />
                              <Typography variant="caption" color="text.secondary">
                                {testimonial.date}
                              </Typography>
                            </Box>
                          </Box>
                          <ThumbUp sx={{ color: 'success.main' }} />
                        </Box>
                        
                        <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                          "{testimonial.comment}"
                        </Typography>
                      </Paper>
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};