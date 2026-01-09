import { useEffect, useState } from 'react';
import { Check, Eye, Mail, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}

const AdminContacts = () => {
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchContacts = async () => {
    try {
      let query = supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setContacts(data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    fetchContacts();
  }, [isAdmin, statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ status })
        .eq('id', id);

      if (error) throw error;
      toast.success('Status updated');
      fetchContacts();
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) throw error;
      toast.success('Message deleted');
      fetchContacts();
      setSelectedContact(null);
    } catch (error) {
      console.error('Error deleting contact:', error);
      toast.error('Failed to delete message');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      pending: 'secondary',
      replied: 'default',
      resolved: 'outline',
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Contact Messages</h1>
            <p className="text-muted-foreground">View and respond to inquiries</p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : contacts.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                No contact messages found
              </p>
            ) : (
              <div className="divide-y">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedContact(contact)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{contact.name}</h3>
                        {getStatusBadge(contact.status)}
                      </div>
                      <p className="text-sm font-medium text-primary">{contact.subject}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        {contact.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {format(new Date(contact.created_at), 'MMM d, yyyy HH:mm')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedContact(contact)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {contact.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateStatus(contact.id, 'replied')}
                          className="text-green-600 hover:text-green-700"
                          title="Mark as Replied"
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(contact.id)}
                        className="text-destructive hover:text-destructive"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Message Details</DialogTitle>
            </DialogHeader>
            {selectedContact && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedContact.name}</h3>
                    <p className="text-muted-foreground">{selectedContact.email}</p>
                    {selectedContact.phone && (
                      <p className="text-sm text-muted-foreground">{selectedContact.phone}</p>
                    )}
                  </div>
                  {getStatusBadge(selectedContact.status)}
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Subject</p>
                  <p className="font-medium text-lg">{selectedContact.subject}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-2">Message</p>
                  <div className="p-4 bg-muted rounded-lg whitespace-pre-wrap">
                    {selectedContact.message}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Received {format(new Date(selectedContact.created_at), 'MMMM d, yyyy \'at\' h:mm a')}
                </p>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => handleDelete(selectedContact.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <div className="flex gap-2">
                    <Select
                      value={selectedContact.status}
                      onValueChange={(value) => updateStatus(selectedContact.id, value)}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="replied">Replied</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button asChild>
                      <a href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}>
                        <Mail className="h-4 w-4 mr-2" />
                        Reply
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminContacts;
