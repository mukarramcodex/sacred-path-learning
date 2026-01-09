import { useEffect, useState } from 'react';
import { BookOpen, Users, UserCheck, Mail, TrendingUp, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const AdminDashboard = () => {
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [stats, setStats] = useState({
    courses: 0,
    teachers: 0,
    admissions: 0,
    contacts: 0,
    pendingAdmissions: 0,
    pendingContacts: 0,
  });
  const [recentAdmissions, setRecentAdmissions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchStats = async () => {
      try {
        const [
          { count: coursesCount },
          { count: teachersCount },
          { count: admissionsCount },
          { count: contactsCount },
          { count: pendingAdmissionsCount },
          { count: pendingContactsCount },
          { data: admissionsData },
        ] = await Promise.all([
          supabase.from('courses').select('*', { count: 'exact', head: true }),
          supabase.from('teachers').select('*', { count: 'exact', head: true }),
          supabase.from('admissions').select('*', { count: 'exact', head: true }),
          supabase.from('contacts').select('*', { count: 'exact', head: true }),
          supabase.from('admissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('admissions').select('*').order('created_at', { ascending: false }).limit(5),
        ]);

        setStats({
          courses: coursesCount || 0,
          teachers: teachersCount || 0,
          admissions: admissionsCount || 0,
          contacts: contactsCount || 0,
          pendingAdmissions: pendingAdmissionsCount || 0,
          pendingContacts: pendingContactsCount || 0,
        });

        setRecentAdmissions(admissionsData || []);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin]);

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
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the admin dashboard</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <StatCard
                title="Total Courses"
                value={stats.courses}
                icon={<BookOpen className="h-6 w-6" />}
                color="primary"
              />
              <StatCard
                title="Teachers"
                value={stats.teachers}
                icon={<Users className="h-6 w-6" />}
                color="secondary"
              />
              <StatCard
                title="Admissions"
                value={stats.admissions}
                icon={<UserCheck className="h-6 w-6" />}
                trend={{ value: stats.pendingAdmissions, isPositive: true }}
                color="accent"
              />
              <StatCard
                title="Contact Messages"
                value={stats.contacts}
                icon={<Mail className="h-6 w-6" />}
                color="primary"
              />
            </>
          )}
        </div>

        {/* Pending Items */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-primary" />
                Pending Admissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">
                {isLoading ? <Skeleton className="h-10 w-20" /> : stats.pendingAdmissions}
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Applications waiting for review
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Pending Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">
                {isLoading ? <Skeleton className="h-10 w-20" /> : stats.pendingContacts}
              </div>
              <p className="text-muted-foreground text-sm mt-1">
                Messages waiting for response
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Admissions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Admissions</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : recentAdmissions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No admission applications yet
              </p>
            ) : (
              <div className="space-y-3">
                {recentAdmissions.map((admission) => (
                  <div
                    key={admission.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{admission.student_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {admission.course_interest} • {admission.country}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        admission.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : admission.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {admission.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
