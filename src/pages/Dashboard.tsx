import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SearchForm, SearchParams } from '@/components/SearchForm';
import { DataTable } from '@/components/DataTable';
import { BarChart3, Users, Search, Download, TrendingUp, Clock } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-subtle" />
        
        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Social Media Intelligence Platform
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Scrape, analyze, and export social media data with advanced filtering and real-time insights
          </p>
          <Button 
            size="lg" 
            className="bg-gradient-primary hover:shadow-elegant transition-smooth text-lg px-8 py-3"
          >
            <Search className="h-5 w-5 mr-2" />
            Start Scraping
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-12 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6 bg-gradient-card backdrop-blur-sm shadow-card transition-smooth hover:shadow-elegant">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
                    <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className={`h-4 w-4 ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                      <span className={`text-sm font-medium ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change} from last month
                      </span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Search Form */}
        <SearchForm onSearch={handleSearch} />

        {/* Recent Results */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-semibold">Recent Results</h2>
          </div>
          <DataTable />
        </div>
      </div>
    </div>
  );
};