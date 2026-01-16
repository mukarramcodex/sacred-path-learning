import { useEffect, useState } from 'react';
import { Search, Shield, GraduationCap, Users as UsersIcon, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  country: string | null;
  created_at: string;
  roles: string[];
}

interface PendingRoleChange {
  userId: string;
  userName: string;
  currentRoles: string[];
  newRoles: AppRole[];
}

const AdminUsers = () => {
  const { isAdmin, isLoading: authLoading, userId: currentUserId } = useAdminAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);
  const [pendingRoleChange, setPendingRoleChange] = useState<PendingRoleChange | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    admins: 0,
    teachers: 0,
    students: 0,
  });

  const fetchUsers = async () => {
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all user roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Map roles to users
      const rolesMap = roles?.reduce((acc: Record<string, string[]>, role) => {
        if (!acc[role.user_id]) {
          acc[role.user_id] = [];
        }
        acc[role.user_id].push(role.role);
        return acc;
      }, {}) || {};

      const usersWithRoles = profiles?.map(profile => ({
        ...profile,
        roles: rolesMap[profile.user_id] || ['student'],
      })) || [];

      setUsers(usersWithRoles);
      setFilteredUsers(usersWithRoles);

      // Calculate stats
      const adminCount = usersWithRoles.filter(u => u.roles.includes('admin')).length;
      const teacherCount = usersWithRoles.filter(u => u.roles.includes('teacher')).length;
      const studentCount = usersWithRoles.filter(u => u.roles.includes('student')).length;

      setStats({
        total: usersWithRoles.length,
        admins: adminCount,
        teachers: teacherCount,
        students: studentCount,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;
    fetchUsers();
  }, [isAdmin]);

  useEffect(() => {
    let result = users;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(user =>
        user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.country?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by role
    if (roleFilter !== 'all') {
      result = result.filter(user => user.roles.includes(roleFilter));
    }

    setFilteredUsers(result);
  }, [searchTerm, roleFilter, users]);

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'teacher':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-3 w-3" />;
      case 'teacher':
        return <UsersIcon className="h-3 w-3" />;
      default:
        return <GraduationCap className="h-3 w-3" />;
    }
  };

  const logActivity = async (action: string, targetUserId: string, details: object) => {
    try {
      await supabase.from('activity_logs').insert([{
        user_id: currentUserId!,
        action,
        target_user_id: targetUserId,
        details: details as any,
      }]);
    } catch (error) {
      console.error('Error logging activity:', error);
    }
  };

  const executeRoleChange = async (userId: string, newRoles: AppRole[], oldRoles: string[]) => {
    setUpdatingUserId(userId);
    try {
      // Delete existing roles for the user
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      // Insert all new roles
      const rolesToInsert = newRoles.map(role => ({ user_id: userId, role }));
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert(rolesToInsert);

      if (insertError) throw insertError;

      // Log the activity
      const targetUser = users.find(u => u.user_id === userId);
      await logActivity('role_change', userId, {
        target_user_name: targetUser?.full_name || 'Unknown',
        old_roles: oldRoles,
        new_roles: newRoles,
      });

      // Update local state
      setUsers(prev => prev.map(user => 
        user.user_id === userId 
          ? { ...user, roles: newRoles } 
          : user
      ));

      toast.success(`Roles updated: ${newRoles.join(', ')}`);
    } catch (error) {
      console.error('Error updating roles:', error);
      toast.error('Failed to update roles');
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleRoleChangeRequest = (userId: string, userName: string, currentRoles: string[], newRoles: AppRole[]) => {
    if (newRoles.length === 0) {
      toast.error('User must have at least one role');
      return;
    }

    // Check if roles actually changed
    const rolesChanged = 
      newRoles.length !== currentRoles.length || 
      !newRoles.every(role => currentRoles.includes(role));
    
    if (!rolesChanged) return;

    setPendingRoleChange({ userId, userName, currentRoles, newRoles });
  };

  const confirmRoleChange = () => {
    if (pendingRoleChange) {
      executeRoleChange(
        pendingRoleChange.userId, 
        pendingRoleChange.newRoles, 
        pendingRoleChange.currentRoles
      );
      setPendingRoleChange(null);
    }
  };

  const toggleRole = (userId: string, currentRoles: string[], role: AppRole) => {
    const newRoles = currentRoles.includes(role)
      ? currentRoles.filter(r => r !== role) as AppRole[]
      : [...currentRoles, role] as AppRole[];
    
    const user = users.find(u => u.user_id === userId);
    handleRoleChangeRequest(userId, user?.full_name || 'Unknown', currentRoles, newRoles);
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
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-muted-foreground">Manage registered users and their roles</p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10">
                  <UsersIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-destructive/10">
                  <Shield className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.admins}</p>
                  <p className="text-sm text-muted-foreground">Admins</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-blue-500/10">
                  <UsersIcon className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.teachers}</p>
                  <p className="text-sm text-muted-foreground">Teachers</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-green-500/10">
                  <GraduationCap className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.students}</p>
                  <p className="text-sm text-muted-foreground">Students</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admins</SelectItem>
              <SelectItem value="teacher">Teachers</SelectItem>
              <SelectItem value="student">Students</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Users List */}
        <Card>
          <CardHeader>
            <CardTitle>
              {filteredUsers.length} {filteredUsers.length === 1 ? 'User' : 'Users'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : filteredUsers.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">
                {searchTerm || roleFilter !== 'all' 
                  ? 'No users match your filters' 
                  : 'No registered users yet'}
              </p>
            ) : (
              <div className="divide-y">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between py-4 hover:bg-muted/30 px-2 -mx-2 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar_url || ''} />
                        <AvatarFallback>
                          {user.full_name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {user.full_name || 'Unnamed User'}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {user.country && <span>{user.country}</span>}
                          {user.country && <span>•</span>}
                          <span>Joined {format(new Date(user.created_at), 'MMM d, yyyy')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        {user.roles.map((role) => (
                          <Badge 
                            key={role} 
                            variant={getRoleBadgeVariant(role)}
                            className="flex items-center gap-1"
                          >
                            {getRoleIcon(role)}
                            {role}
                          </Badge>
                        ))}
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            disabled={updatingUserId === user.user_id}
                            className="w-[130px]"
                          >
                            {updatingUserId === user.user_id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              'Edit Roles'
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-48 p-2" align="end">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-muted-foreground px-2 py-1">
                              Assign Roles
                            </p>
                            {(['admin', 'teacher', 'student'] as AppRole[]).map((role) => (
                              <div
                                key={role}
                                className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-muted cursor-pointer"
                                onClick={() => toggleRole(user.user_id, user.roles, role)}
                              >
                                <Checkbox 
                                  checked={user.roles.includes(role)}
                                  onCheckedChange={() => toggleRole(user.user_id, user.roles, role)}
                                />
                                <div className="flex items-center gap-2">
                                  {getRoleIcon(role)}
                                  <span className="capitalize">{role}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={!!pendingRoleChange} onOpenChange={() => setPendingRoleChange(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Role Change</AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                You are about to change roles for <strong>{pendingRoleChange?.userName}</strong>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-muted-foreground">From:</span>
                <div className="flex gap-1">
                  {pendingRoleChange?.currentRoles.map(role => (
                    <Badge key={role} variant={getRoleBadgeVariant(role)} className="capitalize">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">To:</span>
                <div className="flex gap-1">
                  {pendingRoleChange?.newRoles.map(role => (
                    <Badge key={role} variant={getRoleBadgeVariant(role)} className="capitalize">
                      {role}
                    </Badge>
                  ))}
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRoleChange}>
              Confirm Change
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminUsers;
