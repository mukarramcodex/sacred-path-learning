import { useEffect, useState } from 'react';
import { BookOpen, Users, UserCheck, Mail, TrendingUp, GraduationCap, Globe } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AdmissionsByCountry {
  country: string;
  count: number;
}

interface AdmissionsByMonth {
  month: string;
  count: number;
}

interface CourseStats {
  name: string;
  students: number;
}

const CHART_COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#10b981', '#f59e0b', '#8b5cf6'];

const AdminDashboard = () => {
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [stats, setStats] = useState({
    courses: 0,
    publishedCourses: 0,
    teachers: 0,
    activeTeachers: 0,
    admissions: 0,
    contacts: 0,
    pendingAdmissions: 0,
    pendingContacts: 0,
    approvedAdmissions: 0,
    rejectedAdmissions: 0,
    subscribers: 0,
  });
  const [recentAdmissions, setRecentAdmissions] = useState<any[]>([]);
  const [admissionsByCountry, setAdmissionsByCountry] = useState<AdmissionsByCountry[]>([]);
  const [admissionsByMonth, setAdmissionsByMonth] = useState<AdmissionsByMonth[]>([]);
  const [courseStats, setCourseStats] = useState<CourseStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) return;

    const fetchStats = async () => {
      try {
        const [
          { count: coursesCount },
          { count: publishedCoursesCount },
          { count: teachersCount },
          { count: activeTeachersCount },
          { count: admissionsCount },
          { count: contactsCount },
          { count: pendingAdmissionsCount },
          { count: pendingContactsCount },
          { count: approvedAdmissionsCount },
          { count: rejectedAdmissionsCount },
          { count: subscribersCount },
          { data: admissionsData },
          { data: allAdmissions },
          { data: coursesData },
        ] = await Promise.all([
          supabase.from('courses').select('*', { count: 'exact', head: true }),
          supabase.from('courses').select('*', { count: 'exact', head: true }).eq('is_published', true),
          supabase.from('teachers').select('*', { count: 'exact', head: true }),
          supabase.from('teachers').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('admissions').select('*', { count: 'exact', head: true }),
          supabase.from('contacts').select('*', { count: 'exact', head: true }),
          supabase.from('admissions').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
          supabase.from('admissions').select('*', { count: 'exact', head: true }).eq('status', 'approved'),
          supabase.from('admissions').select('*', { count: 'exact', head: true }).eq('status', 'rejected'),
          supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
          supabase.from('admissions').select('*').order('created_at', { ascending: false }).limit(5),
          supabase.from('admissions').select('country, created_at'),
          supabase.from('courses').select('title, total_students').order('total_students', { ascending: false }).limit(5),
        ]);

        setStats({
          courses: coursesCount || 0,
          publishedCourses: publishedCoursesCount || 0,
          teachers: teachersCount || 0,
          activeTeachers: activeTeachersCount || 0,
          admissions: admissionsCount || 0,
          contacts: contactsCount || 0,
          pendingAdmissions: pendingAdmissionsCount || 0,
          pendingContacts: pendingContactsCount || 0,
          approvedAdmissions: approvedAdmissionsCount || 0,
          rejectedAdmissions: rejectedAdmissionsCount || 0,
          subscribers: subscribersCount || 0,
        });

        setRecentAdmissions(admissionsData || []);

        // Process admissions by country
        if (allAdmissions) {
          const countryMap = allAdmissions.reduce((acc: Record<string, number>, admission) => {
            acc[admission.country] = (acc[admission.country] || 0) + 1;
            return acc;
          }, {});
          
          const countryData = Object.entries(countryMap)
            .map(([country, count]) => ({ country, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 6);
          
          setAdmissionsByCountry(countryData);

          // Process admissions by month (last 6 months)
          const now = new Date();
          const monthsData: AdmissionsByMonth[] = [];
          
          for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleString('default', { month: 'short' });
            const monthYear = `${monthName} ${date.getFullYear()}`;
            
            const count = allAdmissions.filter((admission) => {
              const admissionDate = new Date(admission.created_at);
              return admissionDate.getMonth() === date.getMonth() && 
                     admissionDate.getFullYear() === date.getFullYear();
            }).length;
            
            monthsData.push({ month: monthName, count });
          }
          
          setAdmissionsByMonth(monthsData);
        }

        // Process course stats
        if (coursesData) {
          setCourseStats(coursesData.map(course => ({
            name: course.title.length > 15 ? course.title.substring(0, 15) + '...' : course.title,
            students: course.total_students || 0,
          })));
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [isAdmin]);

  const admissionStatusData = [
    { name: 'Pending', value: stats.pendingAdmissions, color: '#f59e0b' },
    { name: 'Approved', value: stats.approvedAdmissions, color: '#10b981' },
    { name: 'Rejected', value: stats.rejectedAdmissions, color: '#ef4444' },
  ].filter(item => item.value > 0);

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
                title="Published Courses"
                value={`${stats.publishedCourses}/${stats.courses}`}
                icon={<BookOpen className="h-6 w-6" />}
                color="primary"
              />
              <StatCard
                title="Active Teachers"
                value={`${stats.activeTeachers}/${stats.teachers}`}
                icon={<Users className="h-6 w-6" />}
                color="secondary"
              />
              <StatCard
                title="Total Admissions"
                value={stats.admissions}
                icon={<UserCheck className="h-6 w-6" />}
                color="accent"
              />
              <StatCard
                title="Newsletter Subscribers"
                value={stats.subscribers}
                icon={<Mail className="h-6 w-6" />}
                color="primary"
              />
            </>
          )}
        </div>

        {/* Pending Items */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-yellow-500" />
                Pending Admissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? <Skeleton className="h-8 w-16" /> : stats.pendingAdmissions}
              </div>
              <Link to="/admin/admissions">
                <Button variant="link" className="px-0 text-sm">
                  View all →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-500" />
                Pending Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? <Skeleton className="h-8 w-16" /> : stats.pendingContacts}
              </div>
              <Link to="/admin/contacts">
                <Button variant="link" className="px-0 text-sm">
                  View all →
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Approved Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {isLoading ? (
                  <Skeleton className="h-8 w-16" />
                ) : stats.admissions > 0 ? (
                  `${Math.round((stats.approvedAdmissions / stats.admissions) * 100)}%`
                ) : (
                  '0%'
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.approvedAdmissions} approved of {stats.admissions} total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Admissions Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Admissions Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[250px] w-full" />
              ) : admissionsByMonth.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={admissionsByMonth}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="count" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                      name="Admissions"
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admission Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Admission Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[250px] w-full" />
              ) : admissionStatusData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={admissionStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {admissionStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                  No admissions yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Courses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Top Courses by Students
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[250px] w-full" />
              ) : courseStats.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={courseStats} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis type="category" dataKey="name" width={100} className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="students" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                  No courses yet
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admissions by Country */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Top Countries
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-[250px] w-full" />
              ) : admissionsByCountry.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={admissionsByCountry}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="country" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }} 
                    />
                    <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Admissions" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                  No data available
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Admissions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Admissions</CardTitle>
            <Link to="/admin/admissions">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
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
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {admission.student_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">{admission.student_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {admission.course_interest} • {admission.country}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        admission.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : admission.status === 'approved'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
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
