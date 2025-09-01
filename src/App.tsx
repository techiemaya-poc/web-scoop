import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { AppSidebar } from "@/components/AppSidebar";
import { TopHeader } from "@/components/TopHeader";
import { Dashboard } from "./pages/Dashboard";
import { LeadMining } from "./pages/LeadMining";
import { Contacts } from "./pages/Contacts";
import { ChatEngagement } from "./pages/ChatEngagement";
import { Customer360 } from "./pages/Customer360";
import { ProjectManagement } from "./pages/ProjectManagement";
import { AnalyticsDashboard } from "./pages/AnalyticsDashboard";
import { Settings } from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { theme } from "./theme/theme";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <div style={{ display: 'flex', minHeight: '100vh' }}>
            <AppSidebar />
            
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <TopHeader />
              
              <main style={{ flexGrow: 1, padding: '24px' }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/scraper" element={<LeadMining />} />
                  <Route path="/data" element={<Dashboard />} />
                  <Route path="/analytics" element={<AnalyticsDashboard />} />
                  <Route path="/projects" element={<ProjectManagement />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/conversations" element={<ChatEngagement />} />
                  <Route path="/workspace" element={<Customer360 />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
