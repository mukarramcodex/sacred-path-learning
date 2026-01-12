import { useEffect, useState } from 'react';
import { Check, X, Eye, Mail } from 'lucide-react';
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
import { admissionStatusSchema, validateFormData } from '@/lib/validation';

interface Admission {
  id: string;
  student_name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  country: string;
  course_interest: string;
  parent_name: string | null;
  parent_email: string | null;
  parent_phone: string | null;
  previous_education: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const AdminAdmissions = () => {
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAdmission, setSelectedAdmission] = useState<Admission | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchAdmissions = async () => {
    try {
      let query = supabase
        .from('admissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setAdmissions(data || []);
    } catch (error) {
      console.error('Error fetching admissions:', error);
      toast.error('Failed to load admissions');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    fetchAdmissions();
  }, [isAdmin, statusFilter]);

  const updateStatus = async (id: string, status: string) => {
    // Validate status value
    const validation = validateFormData(admissionStatusSchema, { status });
    if (!validation.success) {
      validation.errors.forEach(err => toast.error(err));
      return;
    }

    try {
      const { error } = await supabase
        .from('admissions')
        .update({ status: validation.data.status })
        .eq('id', id);

      if (error) throw error;
      toast.success(`Application ${status}`);
      fetchAdmissions();
      setSelectedAdmission(null);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      approved: 'default',
      rejected: 'destructive',
      reviewed: 'outline',
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
            <h1 className="text-3xl font-bold">Admissions</h1>
            <p className="text-muted-foreground">Manage student applications</p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="reviewed">Reviewed</SelectItem>
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
            ) : admissions.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                No admission applications found
              </p>
            ) : (
              <div className="divide-y">
                {admissions.map((admission) => (
                  <div
                    key={admission.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium">{admission.student_name}</h3>
                        {getStatusBadge(admission.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {admission.course_interest} • {admission.country} • Age {admission.age}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Applied {format(new Date(admission.created_at), 'MMM d, yyyy')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedAdmission(admission)}
                        title="View Details"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {admission.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateStatus(admission.id, 'approved')}
                            className="text-green-600 hover:text-green-700"
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateStatus(admission.id, 'rejected')}
                            className="text-destructive hover:text-destructive"
                            title="Reject"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Detail Dialog */}
        <Dialog open={!!selectedAdmission} onOpenChange={() => setSelectedAdmission(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
            </DialogHeader>
            {selectedAdmission && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedAdmission.student_name}</h3>
                    <p className="text-muted-foreground">{selectedAdmission.email}</p>
                  </div>
                  {getStatusBadge(selectedAdmission.status)}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedAdmission.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Age / Gender</p>
                    <p className="font-medium">{selectedAdmission.age} / {selectedAdmission.gender}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="font-medium">{selectedAdmission.country}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Course Interest</p>
                    <p className="font-medium">{selectedAdmission.course_interest}</p>
                  </div>
                  {selectedAdmission.previous_education && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground">Previous Education</p>
                      <p className="font-medium">{selectedAdmission.previous_education}</p>
                    </div>
                  )}
                </div>

                {(selectedAdmission.parent_name || selectedAdmission.parent_email) && (
                  <div>
                    <h4 className="font-semibold mb-2">Parent/Guardian Information</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      {selectedAdmission.parent_name && (
                        <div>
                          <p className="text-sm text-muted-foreground">Name</p>
                          <p className="font-medium">{selectedAdmission.parent_name}</p>
                        </div>
                      )}
                      {selectedAdmission.parent_email && (
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{selectedAdmission.parent_email}</p>
                        </div>
                      )}
                      {selectedAdmission.parent_phone && (
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">{selectedAdmission.parent_phone}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {selectedAdmission.message && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Additional Message</p>
                    <p className="p-3 bg-muted rounded-lg">{selectedAdmission.message}</p>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  {selectedAdmission.status === 'pending' && (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => updateStatus(selectedAdmission.id, 'rejected')}
                        className="text-destructive"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button onClick={() => updateStatus(selectedAdmission.id, 'approved')}>
                        <Check className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </>
                  )}
                  <Button variant="outline" asChild>
                    <a href={`mailto:${selectedAdmission.email}`}>
                      <Mail className="h-4 w-4 mr-2" />
                      Email Student
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminAdmissions;
