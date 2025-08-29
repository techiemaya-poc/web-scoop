import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchForm, SearchParams } from '@/components/SearchForm';
import { DataTable } from '@/components/DataTable';
import { LeadCategories } from '@/components/LeadCategories';
import { BarChart3, Users, Search, Download, TrendingUp, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

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

const stats = [
  {
    title: 'Total Profiles Scraped',
    value: '12,847',
    change: '+12%',
    icon: Users,
    trend: 'up'
  },
  {
    title: 'Active Scraping Jobs',
    value: '3',
    change: '+1',
    icon: Search,
    trend: 'up'
  },
  {
    title: 'Data Exports',
    value: '156',
    change: '+8%',
    icon: Download,
    trend: 'up'
  },
  {
    title: 'Processing Time',
    value: '2.3s',
    change: '-15%',
    icon: Clock,
    trend: 'down'
  }
];

export const Dashboard = () => {
  const handleSearch = (params: SearchParams) => {
    console.log('Search params:', params);
    // Search functionality will be implemented with backend
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Social Media Intelligence Platform
        </h1>
        <p className="text-muted-foreground">
          Scrape, analyze, and export social media data with advanced filtering and real-time insights
        </p>
      </div>

      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6 bg-card shadow-card transition-smooth hover:shadow-elegant border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1 text-foreground">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className={`h-4 w-4 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change} from last month
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Search Form */}
        <SearchForm onSearch={handleSearch} />

        {/* Lead Categories */}
        <LeadCategories data={mockData} />

        {/* Recent Results */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Recent Results</h2>
          </div>
          <DataTable data={mockData} />
        </div>
      </div>
    </div>
  );
};