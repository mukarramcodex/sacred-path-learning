import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, Users, Send, Loader2 } from 'lucide-react';
import { z } from 'zod';

const newsletterSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(200, 'Subject must be less than 200 characters'),
  htmlContent: z.string().min(1, 'Email content is required').max(50000, 'Content too long'),
});

const AdminNewsletter = () => {
  const [subject, setSubject] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const { data: subscribers, isLoading } = useQuery({
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

  const activeSubscribers = subscribers?.filter(s => s.is_active) || [];
  const inactiveSubscribers = subscribers?.filter(s => !s.is_active) || [];

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

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Newsletter Management</h1>
          <p className="text-muted-foreground">Compose and send emails to your subscribers</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscribers?.length || 0}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeSubscribers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">{inactiveSubscribers.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Compose Email */}
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

        {/* Subscribers List */}
        <Card>
          <CardHeader>
            <CardTitle>Subscribers List</CardTitle>
            <CardDescription>All newsletter subscribers</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
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
                          {new Date(subscriber.created_at).toLocaleDateString()}
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
      </div>
    </AdminLayout>
  );
};

export default AdminNewsletter;
