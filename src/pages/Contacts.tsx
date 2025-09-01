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
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Tab,
  Tabs,
  Badge,
  InputAdornment,
} from '@mui/material';
import {
  Person,
  Search,
  FilterList,
  Add,
  Edit,
  Delete,
  Email,
  Phone,
  Instagram,
  WhatsApp,
  Merge,
  ContactPage,
  TrendingUp,
  Analytics,
} from '@mui/icons-material';

interface Contact {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  instagram: string;
  whatsapp: string;
  sources: string[];
  leadCategory: 'hot' | 'warm' | 'cold';
  lastActivity: string;
  totalEngagement: number;
  duplicateOf?: string;
  merged: boolean;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Aditya Roy',
    avatar: '/api/placeholder/60/60',
    email: 'aditya.roy@email.com',
    phone: '+91 98765 43210',
    instagram: '@aditya_travels',
    whatsapp: '+91 98765 43210',
    sources: ['Instagram', 'YouTube', 'Google'],
    leadCategory: 'hot',
    lastActivity: '2 hours ago',
    totalEngagement: 456,
    merged: true,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: '/api/placeholder/60/60',
    email: 'sarah.j@email.com',
    phone: '+44 20 7946 0958',
    instagram: '@sarah_wanderlust',
    whatsapp: '+44 20 7946 0958',
    sources: ['YouTube', 'Facebook'],
    leadCategory: 'warm',
    lastActivity: '1 day ago',
    totalEngagement: 234,
    merged: false,
  },
  {
    id: '3',
    name: 'Mike Chen',
    avatar: '/api/placeholder/60/60',
    email: 'mike.chen@email.com',
    phone: '+61 2 9374 4000',
    instagram: '@mike_explorer',
    whatsapp: '+61 2 9374 4000',
    sources: ['Facebook', 'LinkedIn'],
    leadCategory: 'cold',
    lastActivity: '3 days ago',
    totalEngagement: 89,
    merged: false,
  },
];

const stats = [
  { title: 'Total Contacts', value: '1,247', change: '+89 this week', icon: <ContactPage /> },
  { title: 'Hot Leads', value: '156', change: '+23 today', icon: <TrendingUp /> },
  { title: 'Merged Profiles', value: '89', change: '+12 today', icon: <Merge /> },
  { title: 'Engagement Score', value: '8.4/10', change: '+0.3 this week', icon: <Analytics /> },
];

export const Contacts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || contact.leadCategory === categoryFilter;
    const matchesSource = sourceFilter === 'all' || contact.sources.some(source => 
      source.toLowerCase() === sourceFilter.toLowerCase()
    );
    return matchesSearch && matchesCategory && matchesSource;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'hot': return 'error';
      case 'warm': return 'warning';
      case 'cold': return 'info';
      default: return 'default';
    }
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    setDialogOpen(true);
  };

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Contact Management 📇
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Unified profiles with consolidated contact information
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

      {/* Filters */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
            <TextField
              placeholder="Search contacts..."
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
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="hot">Hot</MenuItem>
                <MenuItem value="warm">Warm</MenuItem>
                <MenuItem value="cold">Cold</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Source</InputLabel>
              <Select
                value={sourceFilter}
                label="Source"
                onChange={(e) => setSourceFilter(e.target.value)}
              >
                <MenuItem value="all">All Sources</MenuItem>
                <MenuItem value="instagram">Instagram</MenuItem>
                <MenuItem value="youtube">YouTube</MenuItem>
                <MenuItem value="facebook">Facebook</MenuItem>
                <MenuItem value="google">Google</MenuItem>
                <MenuItem value="linkedin">LinkedIn</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => console.log('Add contact')}
            >
              Add Contact
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Contacts Grid */}
      <Grid container spacing={3}>
        {filteredContacts.map((contact) => (
          <Grid item xs={12} md={6} lg={4} key={contact.id}>
            <Card sx={{ height: '100%', position: 'relative' }}>
              {contact.merged && (
                <Chip
                  label="Merged Profile"
                  color="success"
                  size="small"
                  sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
                />
              )}
              
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    src={contact.avatar}
                    sx={{ width: 60, height: 60, mr: 2 }}
                  >
                    {contact.name.charAt(0)}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {contact.name}
                    </Typography>
                    <Chip
                      label={contact.leadCategory.toUpperCase()}
                      size="small"
                      color={getCategoryColor(contact.leadCategory) as any}
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Email sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2">{contact.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Phone sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2">{contact.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Instagram sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="body2">{contact.instagram}</Typography>
                  </Box>
                </Box>

                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Sources:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                    {contact.sources.map((source) => (
                      <Chip key={source} label={source} size="small" variant="outlined" />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Last activity: {contact.lastActivity}
                  </Typography>
                  <Chip
                    label={`${contact.totalEngagement} engagement`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>

                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleViewContact(contact)}
                    sx={{ flex: 1 }}
                  >
                    View Profile
                  </Button>
                  <IconButton size="small" color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Contact Detail Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={selectedContact?.avatar} sx={{ width: 48, height: 48 }}>
              {selectedContact?.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h6">{selectedContact?.name}</Typography>
              <Chip
                label={selectedContact?.leadCategory?.toUpperCase()}
                size="small"
                color={getCategoryColor(selectedContact?.leadCategory || '') as any}
              />
            </Box>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          <Tabs value={tabValue} onChange={(e, newValue) => setTabValue(newValue)} sx={{ mb: 2 }}>
            <Tab label="Contact Info" />
            <Tab label="Activity History" />
            <Tab label="Sources" />
          </Tabs>

          {tabValue === 0 && selectedContact && (
            <Box>
              <List>
                <ListItem>
                  <ListItemAvatar><Avatar><Email /></Avatar></ListItemAvatar>
                  <ListItemText primary="Email" secondary={selectedContact.email} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar><Phone /></Avatar></ListItemAvatar>
                  <ListItemText primary="Phone" secondary={selectedContact.phone} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar><Instagram /></Avatar></ListItemAvatar>
                  <ListItemText primary="Instagram" secondary={selectedContact.instagram} />
                </ListItem>
                <ListItem>
                  <ListItemAvatar><Avatar><WhatsApp /></Avatar></ListItemAvatar>
                  <ListItemText primary="WhatsApp" secondary={selectedContact.whatsapp} />
                </ListItem>
              </List>
            </Box>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography variant="body2" color="text.secondary">
                Activity history will be displayed here with timeline of all interactions.
              </Typography>
            </Box>
          )}

          {tabValue === 2 && selectedContact && (
            <Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Data Sources:
              </Typography>
              {selectedContact.sources.map((source, index) => (
                <Chip key={index} label={source} sx={{ mr: 1, mb: 1 }} />
              ))}
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<Edit />}>
            Edit Contact
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};