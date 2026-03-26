import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Users, Send, Loader2, BarChart3, MousePointerClick, Eye, Clock, History } from 'lucide-react';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

const newsletterSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  htmlContent: z.string().min(1, 'Email content is required').max(50000, 'Content too long'),
});

const AdminNewsletter = () => {
  const [subject, setSubject] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isSending, setIsSending] = useState(false);
  const queryClient = useQueryClient();

  const { data: subscribers, isLoading: isLoadingSubscribers } = useQuery({
    queryKey: ['newsletter-subscribers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const { data: campaigns, isLoading: isLoadingCampaigns } = useQuery({
    queryKey: ['newsletter-campaigns'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('newsletter_campaigns')
        .select('*')
        .order('sent_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const activeSubscribers = subscribers?.filter(s => s.is_active) || [];
  const inactiveSubscribers = subscribers?.filter(s => !s.is_active) || [];

  // Calculate aggregate stats
  const totalCampaigns = campaigns?.length || 0;
  const totalEmailsSent = campaigns?.reduce((sum, c) => sum + (c.total_recipients || 0), 0) || 0;
  const totalOpens = campaigns?.reduce((sum, c) => sum + (c.total_opens || 0), 0) || 0;
  const totalClicks = campaigns?.reduce((sum, c) => sum + (c.total_clicks || 0), 0) || 0;
  const avgOpenRate = totalEmailsSent > 0 ? ((totalOpens / totalEmailsSent) * 100).toFixed(1) : '0';
  const avgClickRate = totalEmailsSent > 0 ? ((totalClicks / totalEmailsSent) * 100).toFixed(1) : '0';

  const handleSendNewsletter = async () => {
    const validation = newsletterSchema.safeParse({ subject, htmlContent });
    
    if (!validation.success) {
      toast.error(validation.error.errors[0].message);
      return;
    }

    if (activeSubscribers.length === 0) {
      toast.error('No active subscribers to send to');
      return;
    }

    setIsSending(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('You must be logged in to send newsletters');
        return;
      }

      const response = await supabase.functions.invoke('send-newsletter', {
        body: {
          subject,
          htmlContent,
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      toast.success(`Newsletter sent to ${activeSubscribers.length} subscribers!`);
      setSubject('');
      setHtmlContent('');
      
      // Refresh campaigns list
      queryClient.invalidateQueries({ queryKey: ['newsletter-campaigns'] });
    } catch (error: any) {
      console.error('Error sending newsletter:', error);
      toast.error(error.message || 'Failed to send newsletter');
    } finally {
      setIsSending(false);
    }
  };

  const insertTemplate = (template: string) => {
    const templates: Record<string, string> = {
      welcome: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #333;">Welcome to Our Newsletter!</h1>
  <p>Thank you for subscribing. We're excited to share updates with you.</p>
  <p>Stay tuned for the latest news, courses, and educational content.</p>
  <p>Best regards,<br>The Team</p>
</div>`,
      announcement: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #333;">Important Announcement</h1>
  <p>We have some exciting news to share with you!</p>
  <p>[Your announcement content here]</p>
  <p>Best regards,<br>The Team</p>
</div>`,
      course: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h1 style="color: #333;">New Course Available!</h1>
  <p>We're thrilled to announce a brand new course:</p>
  <h2 style="color: #666;">[Course Name]</h2>
  <p>[Course description]</p>
  <a href="#" style="display: inline-block; padding: 12px 24px; background: #007bff; color: white; text-decoration: none; border-radius: 4px;">Enroll Now</a>
  <p>Best regards,<br>The Team</p>
</div>`,
    };
    setHtmlContent(templates[template] || '');
  };

  const getOpenRate = (campaign: { total_opens: number | null; total_recipients: number | null }) => {
    if (!campaign.total_recipients) return '0%';
    return ((campaign.total_opens || 0) / campaign.total_recipients * 100).toFixed(1) + '%';
  };

  const getClickRate = (campaign: { total_clicks: number | null; total_recipients: number | null }) => {
    if (!campaign.total_recipients) return '0%';
    return ((campaign.total_clicks || 0) / campaign.total_recipients * 100).toFixed(1) + '%';
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Newsletter Management</h1>
          <p className="text-muted-foreground">Compose, send, and track email campaigns</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSubscribers.length}</div>
              <p className="text-xs text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campaigns</CardTitle>
              <History className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCampaigns}</div>
              <p className="text-xs text-muted-foreground">Total sent</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Emails Sent</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmailsSent}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Opens</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOpens}</div>
              <p className="text-xs text-muted-foreground">{avgOpenRate}% rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
              <MousePointerClick className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalClicks}</div>
              <p className="text-xs text-muted-foreground">{avgClickRate}% rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">{inactiveSubscribers.length}</div>
              <p className="text-xs text-muted-foreground">Inactive</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="compose" className="space-y-4">
          <TabsList>
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="history">Campaign History</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Compose Newsletter</CardTitle>
                <CardDescription>
                  Write your newsletter content and send it to all active subscribers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" onClick={() => insertTemplate('welcome')}>
                    Welcome Template
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => insertTemplate('announcement')}>
                    Announcement Template
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => insertTemplate('course')}>
                    New Course Template
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject Line</Label>
                  <Input
                    id="subject"
                    placeholder="Enter email subject..."
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Email Content (HTML)</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter your email content in HTML format..."
                    value={htmlContent}
                    onChange={(e) => setHtmlContent(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                </div>

                {htmlContent && (
                  <div className="space-y-2">
                    <Label>Preview</Label>
                    <div 
                      className="border rounded-lg p-4 bg-white max-h-[400px] overflow-auto"
                      dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />
                  </div>
                )}

                <Button 
                  onClick={handleSendNewsletter} 
                  disabled={isSending || activeSubscribers.length === 0}
                  className="w-full md:w-auto"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send to {activeSubscribers.length} Subscribers
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Campaign History
                </CardTitle>
                <CardDescription>View all sent campaigns with open and click analytics</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingCampaigns ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : campaigns && campaigns.length > 0 ? (
                  <div className="space-y-4">
                    {campaigns.map((campaign) => (
                      <div 
                        key={campaign.id} 
                        className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{campaign.subject}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <Clock className="h-4 w-4" />
                              {format(new Date(campaign.sent_at), 'PPp')}
                              <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                campaign.status === 'sent' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {campaign.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-6">
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span className="text-xs">Recipients</span>
                              </div>
                              <p className="text-xl font-bold">{campaign.total_recipients}</p>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Eye className="h-4 w-4" />
                                <span className="text-xs">Opens</span>
                              </div>
                              <p className="text-xl font-bold">{campaign.total_opens || 0}</p>
                              <p className="text-xs text-muted-foreground">{getOpenRate(campaign)}</p>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <MousePointerClick className="h-4 w-4" />
                                <span className="text-xs">Clicks</span>
                              </div>
                              <p className="text-xl font-bold">{campaign.total_clicks || 0}</p>
                              <p className="text-xs text-muted-foreground">{getClickRate(campaign)}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No campaigns sent yet</p>
                    <p className="text-sm">Send your first newsletter to see it here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscribers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscribers List</CardTitle>
                <CardDescription>All newsletter subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoadingSubscribers ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : subscribers && subscribers.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2 font-medium">Email</th>
                          <th className="text-left py-3 px-2 font-medium">Status</th>
                          <th className="text-left py-3 px-2 font-medium">Subscribed On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subscribers.map((subscriber) => (
                          <tr key={subscriber.id} className="border-b">
                            <td className="py-3 px-2">{subscriber.email}</td>
                            <td className="py-3 px-2">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                subscriber.is_active 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {subscriber.is_active ? 'Active' : 'Unsubscribed'}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-muted-foreground">
                              {format(new Date(subscriber.created_at), 'PP')}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-8">No subscribers yet</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminNewsletter;
