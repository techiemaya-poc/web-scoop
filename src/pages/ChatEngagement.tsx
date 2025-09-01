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
  Divider,
  Tab,
  Tabs,
  Badge,
  Paper,
  IconButton,
  AppBar,
  Toolbar,
  LinearProgress,
} from '@mui/material';
import {
  Chat,
  WhatsApp,
  Email,
  Phone,
  Instagram,
  Send,
  AttachFile,
  EmojiEmotions,
  MoreVert,
  TrendingUp,
  Schedule,
  CheckCircle,
  PersonAdd,
} from '@mui/icons-material';

interface Message {
  id: string;
  sender: 'user' | 'agent' | 'ai';
  content: string;
  timestamp: string;
  channel: string;
  status: 'sent' | 'delivered' | 'read';
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  platform: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  engagementScore: number;
  responseRate: number;
}

const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Aditya Roy',
    avatar: '/api/placeholder/40/40',
    platform: 'WhatsApp',
    lastMessage: 'Thanks for the Thailand package details!',
    timestamp: '2m ago',
    unreadCount: 2,
    engagementScore: 85,
    responseRate: 92,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: '/api/placeholder/40/40',
    platform: 'Instagram',
    lastMessage: 'Can you share more budget options?',
    timestamp: '1h ago',
    unreadCount: 0,
    engagementScore: 78,
    responseRate: 85,
  },
  {
    id: '3',
    name: 'Mike Chen',
    avatar: '/api/placeholder/40/40',
    platform: 'Email',
    lastMessage: 'Looking forward to your recommendations',
    timestamp: '3h ago',
    unreadCount: 1,
    engagementScore: 65,
    responseRate: 71,
  },
];

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'user',
    content: 'Hi, I saw your Thailand packages on Instagram. Can you share more details?',
    timestamp: '10:30 AM',
    channel: 'Instagram',
    status: 'read',
  },
  {
    id: '2',
    sender: 'ai',
    content: 'Hello Aditya! 🌴 I\'d be happy to help you plan your Thailand adventure. Based on your profile, I see you\'re interested in summer travel with friends. Here are our most popular packages...',
    timestamp: '10:32 AM',
    channel: 'Instagram',
    status: 'read',
  },
  {
    id: '3',
    sender: 'user',
    content: 'This looks perfect! What about visa requirements?',
    timestamp: '10:45 AM',
    channel: 'WhatsApp',
    status: 'read',
  },
  {
    id: '4',
    sender: 'agent',
    content: 'Great question! For Indian citizens, Thailand offers visa-free entry for up to 30 days. I can help you with all the documentation needed.',
    timestamp: '10:47 AM',
    channel: 'WhatsApp',
    status: 'delivered',
  },
];

const messageTemplates = [
  'Best Thailand Itineraries for Summer Travelers',
  'Exclusive Group Packages - Limited Time Offer',
  'Visa-Free Thailand Travel Guide',
  'Budget-Friendly Southeast Asia Tours',
];

const stats = [
  { title: 'Active Conversations', value: '47', change: '+12 today', icon: <Chat /> },
  { title: 'Response Rate', value: '94%', change: '+5% this week', icon: <TrendingUp /> },
  { title: 'Avg Response Time', value: '8 min', change: '-3 min improved', icon: <Schedule /> },
  { title: 'Conversions', value: '23', change: '+8 this week', icon: <CheckCircle /> },
];

const getPlatformIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case 'whatsapp': return <WhatsApp sx={{ color: '#25D366' }} />;
    case 'instagram': return <Instagram sx={{ color: '#E4405F' }} />;
    case 'email': return <Email sx={{ color: '#EA4335' }} />;
    case 'phone': return <Phone sx={{ color: '#2196F3' }} />;
    default: return <Chat />;
  }
};

export const ChatEngagement: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(mockContacts[0]);
  const [newMessage, setNewMessage] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Multi-Channel Engagement Hub 💬
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Unified communication across Instagram, WhatsApp, Email, and Voice calls
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

      {/* Chat Interface */}
      <Grid container spacing={3} sx={{ height: '600px' }}>
        {/* Contacts Sidebar */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ pb: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Active Conversations
              </Typography>
            </CardContent>
            
            <Divider />
            
            <Box sx={{ flex: 1, overflow: 'auto' }}>
              <List sx={{ p: 0 }}>
                {mockContacts.map((contact) => (
                  <Box key={contact.id}>
                    <ListItem
                      button
                      selected={selectedContact?.id === contact.id}
                      onClick={() => setSelectedContact(contact)}
                      sx={{ py: 2 }}
                    >
                      <ListItemAvatar>
                        <Badge badgeContent={contact.unreadCount} color="primary">
                          <Avatar src={contact.avatar}>
                            {contact.name.charAt(0)}
                          </Avatar>
                        </Badge>
                      </ListItemAvatar>
                      
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle2">{contact.name}</Typography>
                            {getPlatformIcon(contact.platform)}
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 0.5 }}>
                              {contact.lastMessage}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="caption" color="text.secondary">
                                {contact.timestamp}
                              </Typography>
                              <Chip
                                label={`${contact.engagementScore}%`}
                                size="small"
                                color={contact.engagementScore > 80 ? 'success' : contact.engagementScore > 60 ? 'warning' : 'default'}
                              />
                            </Box>
                          </Box>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            </Box>
          </Card>
        </Grid>

        {/* Chat Area */}
        <Grid item xs={12} md={8}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedContact && (
              <>
                {/* Chat Header */}
                <AppBar position="static" color="transparent" elevation={0}>
                  <Toolbar sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                    <Avatar src={selectedContact.avatar} sx={{ mr: 2 }}>
                      {selectedContact.name.charAt(0)}
                    </Avatar>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6">{selectedContact.name}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {getPlatformIcon(selectedContact.platform)}
                        <Typography variant="body2" color="text.secondary">
                          Response Rate: {selectedContact.responseRate}%
                        </Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={selectedContact.engagementScore}
                      sx={{ width: 100, mr: 2 }}
                    />
                    <IconButton>
                      <MoreVert />
                    </IconButton>
                  </Toolbar>
                </AppBar>

                {/* Channel Tabs */}
                <Tabs
                  value={tabValue}
                  onChange={(e, newValue) => setTabValue(newValue)}
                  sx={{ borderBottom: '1px solid', borderColor: 'divider' }}
                >
                  <Tab icon={<Instagram />} label="Instagram" />
                  <Tab icon={<WhatsApp />} label="WhatsApp" />
                  <Tab icon={<Email />} label="Email" />
                  <Tab icon={<Phone />} label="Voice Call" />
                </Tabs>

                {/* Messages Area */}
                <Box sx={{ flex: 1, p: 2, overflow: 'auto', bgcolor: 'grey.50' }}>
                  {mockMessages.map((message) => (
                    <Box
                      key={message.id}
                      sx={{
                        display: 'flex',
                        justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Paper
                        sx={{
                          p: 2,
                          maxWidth: '70%',
                          bgcolor: message.sender === 'user' ? 'primary.main' : 'background.paper',
                          color: message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                        }}
                      >
                        {message.sender !== 'user' && (
                          <Typography variant="caption" color="primary" sx={{ display: 'block', mb: 0.5 }}>
                            {message.sender === 'ai' ? '🤖 AI Maya' : '👩‍💼 Agent'}
                          </Typography>
                        )}
                        <Typography variant="body2">{message.content}</Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            mt: 0.5,
                            opacity: 0.7,
                            textAlign: message.sender === 'user' ? 'right' : 'left',
                          }}
                        >
                          {message.timestamp} • {message.channel}
                        </Typography>
                      </Paper>
                    </Box>
                  ))}
                </Box>

                {/* Message Templates */}
                <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper' }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Quick Templates:
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    {messageTemplates.map((template, index) => (
                      <Chip
                        key={index}
                        label={template}
                        size="small"
                        onClick={() => setNewMessage(template)}
                        clickable
                      />
                    ))}
                  </Box>
                </Box>

                {/* Message Input */}
                <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                    <TextField
                      fullWidth
                      multiline
                      maxRows={3}
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      variant="outlined"
                      size="small"
                    />
                    <IconButton>
                      <AttachFile />
                    </IconButton>
                    <IconButton>
                      <EmojiEmotions />
                    </IconButton>
                    <Button
                      variant="contained"
                      endIcon={<Send />}
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      Send
                    </Button>
                  </Box>
                </Box>
              </>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};