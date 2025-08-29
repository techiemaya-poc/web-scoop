import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Badge,
  Avatar,
  InputBase,
  Chip,
} from '@mui/material';
import {
  Search,
  Notifications,
  AccountCircle,
  LightMode,
  Email,
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

const SearchBox = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 16,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

export function TopHeader() {
  const userName = "Admin User";
  const userRole = "Project Manager";

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box>
            <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
              Hello {userName} 👋
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
              Good Morning...!
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SearchBox>
            <SearchIconWrapper>
              <Search />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search leads, posts..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </SearchBox>

          <IconButton size="large" color="inherit">
            <LightMode />
          </IconButton>

          <IconButton size="large" color="inherit">
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <IconButton size="large" color="inherit">
            <Email />
          </IconButton>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>
              <AccountCircle />
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                {userName}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {userRole}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}