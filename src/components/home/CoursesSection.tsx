import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, Star, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredCourses = [
  {
    id: 1,
    title: "Quran Recitation Basics",
    description: "Learn proper pronunciation and recitation of the Holy Quran with Tajweed rules.",
    duration: "3 Months",
    students: 1200,
    rating: 4.9,
    level: "Beginner",
    category: "Quran",
    image: "from-primary/20 to-azure-light/20"
  },
  {
    id: 2,
    title: "Tajweed Mastery",
    description: "Advanced Tajweed rules for perfecting your Quranic recitation.",
    duration: "6 Months",
    students: 850,
    rating: 4.8,
    level: "Intermediate",
    category: "Tajweed",
    image: "from-azure-light/20 to-primary/20"
  },
  {
    id: 3,
    title: "Arabic for Beginners",
    description: "Start your journey to understanding the language of the Quran.",
    duration: "4 Months",
    students: 2100,
    rating: 4.7,
    level: "Beginner",
    category: "Arabic",
    image: "from-primary/20 to-azure-dark/20"
  },
  {
    id: 4,
    title: "Islamic Studies Foundation",
    description: "Comprehensive introduction to Islamic beliefs, practices, and history.",
    duration: "6 Months",
    students: 1500,
    rating: 4.9,
    level: "All Levels",
    category: "Islamic Studies",
    image: "from-azure-soft/40 to-primary/20"
  },
];

export const CoursesSection = () => {
  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 islamic-pattern opacity-50"></div>

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
            Our Courses
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Start Your Journey of{" "}
            <span className="text-gradient">Islamic Learning</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore our carefully designed courses taught by certified scholars and 
            experts in their respective fields.
          </p>
        </motion.div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elevated group hover:shadow-elevated transition-all duration-300"
            >
              {/* Course Image */}
              <div className={`aspect-[4/3] rounded-t-xl bg-gradient-to-br ${course.image} flex items-center justify-center relative overflow-hidden`}>
                <BookOpen className="w-16 h-16 text-primary/60 group-hover:scale-110 transition-transform duration-300" />
                <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                  {course.category}
                </Badge>
              </div>

              {/* Course Content */}
              <div className="p-5">
                <Badge variant="secondary" className="mb-3">
                  {course.level}
                </Badge>
                <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span>{course.rating}</span>
                  </div>
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
          <Link to="/courses">
            <Button className="btn-hero group">
              View All Courses
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
