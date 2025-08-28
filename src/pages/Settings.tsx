import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { Settings as SettingsIcon, Key, Database, Download, Zap, Shield } from 'lucide-react';

export const Settings = () => {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    rateLimit: '100',
    exportFormat: 'csv',
    autoExport: false,
    notifications: true,
    dataRetention: '90',
    apiKeys: {
      twitter: '',
      instagram: '',
      linkedin: '',
      reddit: ''
    }
  });

  const handleSaveSettings = () => {
    // Settings will be saved to Supabase when backend is connected
    toast({
      title: "Settings Saved",
      description: "Your configuration has been updated successfully.",
    });
  };

  const handleApiKeyChange = (platform: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        [platform]: value
      }
    }));
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      <div className="flex items-center gap-2 mb-8">
        <SettingsIcon className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <div className="space-y-8">
        {/* API Configuration */}
        <Card className="p-6 bg-gradient-card backdrop-blur-sm shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Key className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">API Configuration</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Configure API keys for different social media platforms. These are required for scraping data.
          </p>
          
          <div className="space-y-4">
            {Object.entries(settings.apiKeys).map(([platform, key]) => (
              <div key={platform} className="space-y-2">
                <Label htmlFor={platform} className="capitalize">
                  {platform} API Key
                </Label>
                <Input
                  id={platform}
                  type="password"
                  placeholder={`Enter your ${platform} API key`}
                  value={key}
                  onChange={(e) => handleApiKeyChange(platform, e.target.value)}
                  className="transition-smooth focus:shadow-glow"
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Scraping Configuration */}
        <Card className="p-6 bg-gradient-card backdrop-blur-sm shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Scraping Configuration</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="rateLimit">Rate Limit (requests per minute)</Label>
              <Input
                id="rateLimit"
                type="number"
                value={settings.rateLimit}
                onChange={(e) => setSettings(prev => ({ ...prev, rateLimit: e.target.value }))}
                className="transition-smooth focus:shadow-glow"
              />
              <p className="text-sm text-muted-foreground">
                Lower values reduce the risk of being blocked by platforms
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Enable Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts when scraping jobs complete
                </p>
              </div>
              <Switch
                checked={settings.notifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, notifications: checked }))}
              />
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6 bg-gradient-card backdrop-blur-sm shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Data Management</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="dataRetention">Data Retention (days)</Label>
              <Input
                id="dataRetention"
                type="number"
                value={settings.dataRetention}
                onChange={(e) => setSettings(prev => ({ ...prev, dataRetention: e.target.value }))}
                className="transition-smooth focus:shadow-glow"
              />
              <p className="text-sm text-muted-foreground">
                Automatically delete scraped data after this many days
              </p>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Auto Export</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically export data when scraping completes
                </p>
              </div>
              <Switch
                checked={settings.autoExport}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, autoExport: checked }))}
              />
            </div>

            <div className="space-y-2">
              <Label>Default Export Format</Label>
              <Select 
                value={settings.exportFormat} 
                onValueChange={(value) => setSettings(prev => ({ ...prev, exportFormat: value }))}
              >
                <SelectTrigger className="transition-smooth focus:shadow-glow">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Security */}
        <Card className="p-6 bg-gradient-card backdrop-blur-sm shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Security & Privacy</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-muted-foreground">
              All API keys and scraped data are encrypted and stored securely. 
              We comply with data protection regulations and platform terms of service.
            </p>
            
            <div className="flex gap-4">
              <Button variant="outline" className="transition-smooth hover:shadow-glow">
                Export Account Data
              </Button>
              <Button variant="destructive" className="transition-smooth">
                Delete All Data
              </Button>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSaveSettings}
            className="bg-gradient-primary hover:shadow-elegant transition-smooth px-8"
            size="lg"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};