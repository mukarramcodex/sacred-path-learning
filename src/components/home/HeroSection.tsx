import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Play, Star, Users, BookOpen, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { icon: Users, value: "5000+", label: "Students Enrolled" },
  { icon: BookOpen, value: "50+", label: "Courses Available" },
  { icon: Award, value: "100+", label: "Certified Teachers" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-azure-soft/40 via-background to-background"></div>
      <div className="absolute inset-0 islamic-pattern"></div>
      
      {/* Floating Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
        className="absolute top-20 right-10 w-72 h-72 rounded-full bg-gradient-to-br from-primary/20 to-azure-light/10 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-azure-light/20 to-primary/10 blur-3xl"
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 mb-6"
            >
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium text-secondary-foreground">
                #1 Islamic Learning Platform
              </span>
            </motion.div>

            {/* Arabic Text */}
            <p className="font-arabic text-2xl md:text-3xl text-primary mb-4">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Illuminate Your Path with{" "}
              <span className="text-gradient">Quranic Knowledge</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              Join thousands of students worldwide in learning the Quran, Arabic, and 
              Islamic studies with certified scholars from the comfort of your home.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link to="/admission">
                <Button className="btn-hero group">
                  Enroll Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/courses">
                <Button variant="outline" className="btn-outline-hero">
                  <Play className="w-5 h-5" />
                  Explore Courses
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-border">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image Container */}
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-azure-light/20 blur-2xl transform rotate-6"></div>
                <div className="relative w-full h-full rounded-3xl overflow-hidden border-2 border-primary/20 shadow-elevated">
                  <div className="w-full h-full bg-gradient-to-br from-azure-soft via-secondary to-azure-soft flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-azure-light flex items-center justify-center shadow-glow">
                        <BookOpen className="w-16 h-16 text-primary-foreground" />
                      </div>
                      <p className="font-arabic text-3xl text-primary mb-2">القرآن الكريم</p>
                      <p className="text-muted-foreground">The Noble Quran</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 card-glass p-4 rounded-xl shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Certified</p>
                    <p className="text-xs text-muted-foreground">Islamic Scholars</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 card-glass p-4 rounded-xl shadow-card"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">Global</p>
                    <p className="text-xs text-muted-foreground">Online Learning</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
