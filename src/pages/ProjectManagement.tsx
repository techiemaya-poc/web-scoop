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
  Tab,
  Tabs,
  LinearProgress,
  AvatarGroup,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from '@mui/material';
import {
  Assignment,
  Group,
  Schedule,
  CheckCircle,
  Warning,
  Error,
  Add,
  Edit,
  Visibility,
  AttachMoney,
  FlightTakeoff,
  Hotel,
  Restaurant,
  CameraAlt,
  AccountBalance,
  AssignmentTurnedIn,
  PersonAdd,
  Payment,
} from '@mui/icons-material';

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  assigneeAvatar: string;
  team: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  progress: number;
}

interface Project {
  id: string;
  customerName: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'confirmed' | 'in-progress' | 'completed';
  totalAmount: string;
  paidAmount: string;
  tasks: Task[];
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Initiate Visa Process',
    description: 'Start visa application for Thailand trip - Aditya Roy',
    assignee: 'Priya Sharma',
    assigneeAvatar: '/api/placeholder/32/32',
    team: 'Visa Team',
    status: 'in-progress',
    priority: 'high',
    dueDate: '2024-01-20',
    progress: 60,
  },
  {
    id: '2',
    title: 'Collect Advance Payment',
    description: '50% advance payment collection',
    assignee: 'Raj Patel',
    assigneeAvatar: '/api/placeholder/32/32',
    team: 'Finance',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-01-18',
    progress: 0,
  },
  {
    id: '3',
    title: 'Hotel Booking Confirmation',
    description: 'Confirm beach resort bookings in Phuket',
    assignee: 'Maya Singh',
    assigneeAvatar: '/api/placeholder/32/32',
    team: 'Operations',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-01-16',
    progress: 100,
  },
  {
    id: '4',
    title: 'Travel Insurance Setup',
    description: 'Arrange comprehensive travel insurance',
    assignee: 'Amit Kumar',
    assigneeAvatar: '/api/placeholder/32/32',
    team: 'Customer Success',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-01-22',
    progress: 0,
  },
];

const mockProject: Project = {
  id: '1',
  customerName: 'Aditya Roy',
  destination: 'Thailand (Bangkok, Phuket)',
  startDate: '2024-06-15',
  endDate: '2024-06-22',
  status: 'confirmed',
  totalAmount: '₹95,000',
  paidAmount: '₹47,500',
  tasks: mockTasks,
};

const teams = [
  { name: 'Visa Team', color: '#2196F3', members: 3 },
  { name: 'Finance', color: '#4CAF50', members: 2 },
  { name: 'Operations', color: '#FF9800', members: 4 },
  { name: 'Customer Success', color: '#9C27B0', members: 3 },
];

const stats = [
  { title: 'Active Projects', value: '24', change: '+3 this week', icon: <Assignment /> },
  { title: 'Pending Tasks', value: '67', change: '-8 today', icon: <Schedule /> },
  { title: 'Completed Today', value: '12', change: '+4 vs yesterday', icon: <CheckCircle /> },
  { title: 'Team Utilization', value: '87%', change: '+5% this week', icon: <Group /> },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'success';
    case 'in-progress': return 'primary';
    case 'pending': return 'warning';
    case 'blocked': return 'error';
    default: return 'default';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'error';
    case 'medium': return 'warning';
    case 'low': return 'success';
    default: return 'default';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return <CheckCircle />;
    case 'in-progress': return <Schedule />;
    case 'pending': return <Warning />;
    case 'blocked': return <Error />;
    default: return <Assignment />;
  }
};

export const ProjectManagement: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const tasksByStatus = {
    pending: mockTasks.filter(t => t.status === 'pending'),
    'in-progress': mockTasks.filter(t => t.status === 'in-progress'),
    completed: mockTasks.filter(t => t.status === 'completed'),
    blocked: mockTasks.filter(t => t.status === 'blocked'),
  };

  return (
    <Box sx={{ p: 0 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
          Smart Project Management 📋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Automated workflow coordination across teams
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

      {/* Project Overview */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Current Project: {mockProject.customerName}
            </Typography>
            <Chip
              label={mockProject.status.toUpperCase()}
              color={getStatusColor(mockProject.status) as any}
            />
          </Box>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Destination: {mockProject.destination}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  Travel Dates: {mockProject.startDate} to {mockProject.endDate}
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {teams.map((team) => (
                  <Paper key={team.name} sx={{ p: 2, minWidth: 120 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Avatar sx={{ bgcolor: team.color, width: 24, height: 24, mr: 1, fontSize: 12 }}>
                        {team.members}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {team.name}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {team.members} members
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h5" color="primary" sx={{ fontWeight: 600 }}>
                  {mockProject.paidAmount}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  of {mockProject.totalAmount} paid
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={50}
                  sx={{ mt: 1, height: 8, borderRadius: 4 }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Kanban Board / Task List */}
      <Card>
        <CardContent>
          <Tabs
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            sx={{ borderBottom: '1px solid', borderColor: 'divider', mb: 3 }}
          >
            <Tab label="Kanban Board" />
            <Tab label="Task List" />
            <Tab label="Timeline" />
            <Tab label="Team View" />
          </Tabs>

          {/* Kanban Board View */}
          {tabValue === 0 && (
            <Grid container spacing={3}>
              {Object.entries(tasksByStatus).map(([status, tasks]) => (
                <Grid item xs={12} md={3} key={status}>
                  <Paper sx={{ p: 2, minHeight: 400, bgcolor: 'grey.50' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {getStatusIcon(status)}
                      <Typography variant="h6" sx={{ ml: 1, fontWeight: 600, textTransform: 'capitalize' }}>
                        {status.replace('-', ' ')}
                      </Typography>
                      <Chip label={tasks.length} size="small" sx={{ ml: 'auto' }} />
                    </Box>
                    
                    <Box sx={{ space: 2 }}>
                      {tasks.map((task) => (
                        <Card
                          key={task.id}
                          sx={{ mb: 2, cursor: 'pointer', '&:hover': { shadow: 2 } }}
                          onClick={() => handleTaskClick(task)}
                        >
                          <CardContent sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Typography variant="subtitle2" sx={{ flex: 1, fontWeight: 600 }}>
                                {task.title}
                              </Typography>
                              <Chip
                                label={task.priority}
                                size="small"
                                color={getPriorityColor(task.priority) as any}
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                              {task.description}
                            </Typography>
                            
                            {task.status === 'in-progress' && (
                              <LinearProgress
                                variant="determinate"
                                value={task.progress}
                                sx={{ mb: 2, height: 4, borderRadius: 2 }}
                              />
                            )}
                            
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Avatar src={task.assigneeAvatar} sx={{ width: 24, height: 24 }}>
                                {task.assignee.charAt(0)}
                              </Avatar>
                              <Typography variant="caption" color="text.secondary">
                                Due: {task.dueDate}
                              </Typography>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </Box>
                    
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<Add />}
                      sx={{ mt: 2 }}
                    >
                      Add Task
                    </Button>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Task List View */}
          {tabValue === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  All Tasks ({mockTasks.length})
                </Typography>
                <Button variant="contained" startIcon={<Add />}>
                  New Task
                </Button>
              </Box>
              
              <List>
                {mockTasks.map((task, index) => (
                  <Box key={task.id}>
                    <ListItem
                      button
                      onClick={() => handleTaskClick(task)}
                      sx={{ py: 2 }}
                    >
                      <ListItemAvatar>
                        <Avatar src={task.assigneeAvatar}>
                          {task.assignee.charAt(0)}
                        </Avatar>
                      </ListItemAvatar>
                      
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {task.title}
                            </Typography>
                            <Chip
                              label={task.status.replace('-', ' ')}
                              size="small"
                              color={getStatusColor(task.status) as any}
                            />
                            <Chip
                              label={task.priority}
                              size="small"
                              color={getPriorityColor(task.priority) as any}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              {task.description}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Typography variant="caption" color="text.secondary">
                                Assigned to: {task.assignee}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Team: {task.team}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Due: {task.dueDate}
                              </Typography>
                            </Box>
                            {task.status === 'in-progress' && (
                              <LinearProgress
                                variant="determinate"
                                value={task.progress}
                                sx={{ mt: 1, width: 200, height: 4, borderRadius: 2 }}
                              />
                            )}
                          </Box>
                        }
                      />
                      
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small">
                          <Visibility />
                        </IconButton>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                      </Box>
                    </ListItem>
                    {index < mockTasks.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Box>
          )}

          {/* Timeline View */}
          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Project Timeline
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Timeline view will display project milestones and task dependencies.
              </Typography>
            </Box>
          )}

          {/* Team View */}
          {tabValue === 3 && (
            <Grid container spacing={3}>
              {teams.map((team) => (
                <Grid item xs={12} md={6} key={team.name}>
                  <Card variant="outlined">
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: team.color, mr: 2 }}>
                          {team.members}
                        </Avatar>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {team.name}
                        </Typography>
                      </Box>
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {team.members} team members
                      </Typography>
                      
                      <List dense>
                        {mockTasks
                          .filter(task => task.team === team.name)
                          .map((task) => (
                            <ListItem key={task.id} sx={{ px: 0 }}>
                              <ListItemText
                                primary={task.title}
                                secondary={
                                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                    <Chip
                                      label={task.status}
                                      size="small"
                                      color={getStatusColor(task.status) as any}
                                    />
                                    <Typography variant="caption">
                                      Due: {task.dueDate}
                                    </Typography>
                                  </Box>
                                }
                              />
                            </ListItem>
                          ))}
                      </List>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>

      {/* Task Detail Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {getStatusIcon(selectedTask?.status || '')}
            <Typography variant="h6">{selectedTask?.title}</Typography>
            <Chip
              label={selectedTask?.status?.replace('-', ' ')}
              color={getStatusColor(selectedTask?.status || '') as any}
              size="small"
            />
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {selectedTask && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {selectedTask.description}
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Progress: {selectedTask.progress}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={selectedTask.progress}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <List>
                  <ListItem>
                    <ListItemText primary="Assignee" secondary={selectedTask.assignee} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Team" secondary={selectedTask.team} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Priority" secondary={selectedTask.priority} />
                  </ListItem>
                  <ListItem>
                    <ListItemText primary="Due Date" secondary={selectedTask.dueDate} />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Close</Button>
          <Button variant="contained" startIcon={<Edit />}>
            Edit Task
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};