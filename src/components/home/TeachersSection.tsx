import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const teachers = [
  {
    id: 1,
    name: "Sheikh Ahmad Hassan",
    title: "Quran & Tajweed Expert",
    qualification: "PhD in Islamic Studies",
    experience: "15+ years",
    rating: 4.9,
    courses: 8,
    avatar: "A"
  },
  {
    id: 2,
    name: "Ustadha Fatima Ali",
    title: "Arabic Language Specialist",
    qualification: "MA in Arabic Linguistics",
    experience: "12+ years",
    rating: 4.8,
    courses: 6,
    avatar: "F"
  },
  {
    id: 3,
    name: "Sheikh Muhammad Ibrahim",
    title: "Hadith & Fiqh Scholar",
    qualification: "Ijazah from Al-Azhar",
    experience: "20+ years",
    rating: 5.0,
    courses: 10,
    avatar: "M"
  },
  {
    id: 4,
    name: "Ustadha Aisha Rahman",
    title: "Islamic Studies Teacher",
    qualification: "BA in Islamic Education",
    experience: "8+ years",
    rating: 4.7,
    courses: 5,
    avatar: "A"
  },
];

export const TeachersSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="container-custom relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
            Our Teachers
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Learn from{" "}
            <span className="text-gradient">Certified Scholars</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Our teachers are highly qualified scholars with extensive experience in 
            Islamic education and a passion for sharing knowledge.
          </p>
        </motion.div>

        {/* Teachers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {teachers.map((teacher, index) => (
            <motion.div
              key={teacher.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elevated p-6 text-center group hover:shadow-elevated transition-all duration-300"
            >
              {/* Avatar */}
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-azure-light flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-glow">
                  {teacher.avatar}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
              </div>

              {/* Info */}
              <h3 className="font-semibold text-lg text-foreground mb-1">
                {teacher.name}
              </h3>
              <p className="text-sm text-primary font-medium mb-2">{teacher.title}</p>
              <p className="text-xs text-muted-foreground mb-4">{teacher.qualification}</p>

              {/* Stats */}
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground border-t border-border pt-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <span>{teacher.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{teacher.courses} Courses</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link to="/teachers">
            <Button className="btn-hero group">
              Meet All Teachers
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
