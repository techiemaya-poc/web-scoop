import React, { useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Home,
  Search,
  DataObject,
  Analytics,
  FolderOpen,
  Contacts,
  Chat,
  WorkOutline,
  Settings,
  Menu,
  ChevronLeft,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const drawerWidth = 280;

const menuItems = [
  { text: 'Dashboard', icon: <Home />, path: '/' },
  { text: 'Scraper', icon: <Search />, path: '/scraper' },
  { text: 'Data', icon: <DataObject />, path: '/data' },
  { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
  { text: 'Projects', icon: <FolderOpen />, path: '/projects' },
  { text: 'Contacts', icon: <Contacts />, path: '/contacts' },
  { text: 'Conversations', icon: <Chat />, path: '/conversations' },
  { text: 'Workspace', icon: <WorkOutline />, path: '/workspace' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

export function AppSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? 64 : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isCollapsed ? 64 : drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed ? 'center' : 'space-between',
          p: 2,
          minHeight: 64,
        }}
      >
        {!isCollapsed && (
          <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            TechMaya
          </Typography>
        )}
        <IconButton onClick={toggleCollapsed} size="small">
          {isCollapsed ? <Menu /> : <ChevronLeft />}
        </IconButton>
      </Box>
      
      <Divider />
      
      <List sx={{ flexGrow: 1, pt: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                px: isCollapsed ? 1 : 2,
                py: 1,
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'primary.contrastText',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.contrastText',
                  },
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: isCollapsed ? 'auto' : 40,
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText 
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                />
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}