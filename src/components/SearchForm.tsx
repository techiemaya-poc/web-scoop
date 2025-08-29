import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";

interface SearchFormProps {
  onSearch: (params: SearchParams) => void;
}

export interface SearchParams {
  keywords: string;
  location: string;
  platform: string;
  dateRange: string;
  engagementLevel: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [params, setParams] = useState<SearchParams>({
    keywords: "",
    location: "",
    platform: "all",
    dateRange: "7d",
    engagementLevel: "all",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(params);
  };

  const handleChange = (field: keyof SearchParams) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { value: unknown } }
  ) => {
    setParams(prev => ({
      ...prev,
      [field]: event.target.value as string
    }));
  };

  return (
    <Card>
      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
            Social Media Intelligence Search
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Configure your search parameters to find relevant leads across social platforms.
          </Typography>

          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 3,
            mb: 3
          }}>
            <TextField
              fullWidth
              label="Keywords"
              placeholder="e.g., CRM, project management, marketing automation"
              value={params.keywords}
              onChange={handleChange('keywords')}
              variant="outlined"
            />

            <TextField
              fullWidth
              label="Location (Optional)"
              placeholder="e.g., San Francisco, New York"
              value={params.location}
              onChange={handleChange('location')}
              variant="outlined"
            />

            <FormControl fullWidth>
              <InputLabel>Platform</InputLabel>
              <Select
                value={params.platform}
                label="Platform"
                onChange={handleChange('platform')}
              >
                <MenuItem value="all">All Platforms</MenuItem>
                <MenuItem value="twitter">Twitter</MenuItem>
                <MenuItem value="linkedin">LinkedIn</MenuItem>
                <MenuItem value="facebook">Facebook</MenuItem>
                <MenuItem value="reddit">Reddit</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={params.dateRange}
                label="Date Range"
                onChange={handleChange('dateRange')}
              >
                <MenuItem value="1d">Last 24 Hours</MenuItem>
                <MenuItem value="7d">Last 7 Days</MenuItem>
                <MenuItem value="30d">Last 30 Days</MenuItem>
                <MenuItem value="90d">Last 90 Days</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ gridColumn: { xs: '1', md: '1 / -1' } }}>
              <FormControl fullWidth>
                <InputLabel>Engagement Level</InputLabel>
                <Select
                  value={params.engagementLevel}
                  label="Engagement Level"
                  onChange={handleChange('engagementLevel')}
                >
                  <MenuItem value="all">All Levels</MenuItem>
                  <MenuItem value="high">High (50+ interactions)</MenuItem>
                  <MenuItem value="medium">Medium (10-49 interactions)</MenuItem>
                  <MenuItem value="low">Low (1-9 interactions)</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<Search />}
            sx={{ minWidth: 200 }}
          >
            Start Scraping
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};