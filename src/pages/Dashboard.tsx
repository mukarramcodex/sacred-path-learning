import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  User, 
  BookOpen, 
  Award, 
  Calendar,
  LogOut,
  Settings,
  Bell,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<{ full_name: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session?.user) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        navigate("/auth");
      } else {
        setUser(session.user);
        // Fetch profile
        setTimeout(() => {
          fetchProfile(session.user.id);
        }, 0);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("user_id", userId)
      .maybeSingle();
    
    if (data) {
      setProfile(data);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      </Layout>
    );
  }

  const stats = [
    { icon: BookOpen, label: "Enrolled Courses", value: "0", color: "from-primary to-azure-light" },
    { icon: Award, label: "Certificates", value: "0", color: "from-azure-light to-primary" },
    { icon: Calendar, label: "Classes Attended", value: "0", color: "from-primary to-azure-dark" },
    { icon: TrendingUp, label: "Progress", value: "0%", color: "from-azure-dark to-primary" },
  ];

  return (
    <Layout>
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-azure-light flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-glow">
                {profile?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  Welcome, {profile?.full_name || "Student"}!
                </h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated p-6"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <stat.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* My Courses */}
              <div className="card-elevated p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  My Courses
                </h2>
                <div className="text-center py-12 text-muted-foreground">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/30" />
                  <p className="mb-4">You haven't enrolled in any courses yet.</p>
                  <Button onClick={() => navigate("/courses")} className="btn-hero">
                    Browse Courses
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="card-elevated p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Recent Activity
                </h2>
                <div className="text-center py-8 text-muted-foreground">
                  <p>No recent activity to show.</p>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Profile Card */}
              <div className="card-elevated p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Profile
                </h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name</span>
                    <span className="text-foreground">{profile?.full_name || "Not set"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-foreground text-right break-all">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Role</span>
                    <span className="text-foreground">Student</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Edit Profile
                </Button>
              </div>

              {/* Quick Links */}
              <div className="card-elevated p-6 bg-gradient-to-br from-azure-soft to-secondary">
                <h2 className="text-lg font-semibold text-foreground mb-4">Quick Links</h2>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/courses")}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Browse Courses
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => navigate("/contact")}>
                    <User className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
