import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Box,
  Typography,
  InputAdornment,
  Pagination,
  Card,
  CardContent,
} from '@mui/material';
import {
  Download,
  FilterList,
  Search,
  Launch,
  Person,
  Chat,
  LocalFireDepartment,
  DeviceThermostat,
  AcUnit,
} from '@mui/icons-material';

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
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Scraped Data Results
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {filteredData.length} total results
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" startIcon={<Download />} onClick={() => handleExport('csv')}>
              Export CSV
            </Button>
            <Button variant="outlined" startIcon={<Download />} onClick={() => handleExport('json')}>
              Export JSON
            </Button>
          </Box>
        </Box>

        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          <TextField
            placeholder="Search by username or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ flex: 1 }}
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
            >
              <MenuItem value="all">All Platforms</MenuItem>
              <MenuItem value="twitter">Twitter</MenuItem>
              <MenuItem value="linkedin">LinkedIn</MenuItem>
              <MenuItem value="reddit">Reddit</MenuItem>
              <MenuItem value="instagram">Instagram</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Platform</TableCell>
                <TableCell>Content Preview</TableCell>
                <TableCell>Engagement</TableCell>
                <TableCell>Lead Score</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((item) => {
                const leadData = categorizeLeadFromContent(item.postContent, item.engagement);
                const getCategoryIcon = (category: string) => {
                  switch (category) {
                    case 'hot': return LocalFireDepartment;
                    case 'warm': return DeviceThermostat;
                    case 'cold': return AcUnit;
                    default: return Chat;
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
                const Icon = getCategoryIcon(leadData.category);
                
                return (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Person fontSize="small" />
                        {item.username}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.platform} size="small" />
                    </TableCell>
                    <TableCell sx={{ maxWidth: 200 }}>
                      <Typography variant="body2" noWrap>
                        {item.postContent}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chat fontSize="small" />
                        {item.engagement.toLocaleString()}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Icon fontSize="small" />
                        <Chip 
                          label={leadData.category.toUpperCase()}
                          size="small"
                          color={getCategoryColor(leadData.category) as any}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {leadData.score.toFixed(1)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{item.location || 'N/A'}</TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {formatTimestamp(item.timestamp)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={item.postType}
                        size="small"
                        variant={item.postType === 'post' ? 'filled' : 'outlined'}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => window.open(item.profileUrl, '_blank')}
                      >
                        <Launch />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};