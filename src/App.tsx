import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { AppSidebar } from "@/components/AppSidebar";
import { TopHeader } from "@/components/TopHeader";
import { Dashboard } from "./pages/Dashboard";
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
                  <Route path="/scraper" element={<Dashboard />} />
                  <Route path="/data" element={<Dashboard />} />
                  <Route path="/analytics" element={<Dashboard />} />
                  <Route path="/projects" element={<Dashboard />} />
                  <Route path="/contacts" element={<Dashboard />} />
                  <Route path="/conversations" element={<Dashboard />} />
                  <Route path="/workspace" element={<Dashboard />} />
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
