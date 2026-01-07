import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Clock, 
  Users, 
  Star, 
  Filter,
  Search,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const allCourses = [
  {
    id: 1,
    title: "Quran Recitation Basics",
    description: "Learn proper pronunciation and recitation of the Holy Quran with Tajweed rules. Perfect for beginners starting their Quranic journey.",
    duration: "3 Months",
    students: 1200,
    rating: 4.9,
    level: "Beginner",
    category: "Quran",
    ageGroup: "All Ages",
    teacher: "Sheikh Ahmad Hassan",
    image: "from-primary/20 to-azure-light/20"
  },
  {
    id: 2,
    title: "Tajweed Mastery",
    description: "Advanced Tajweed rules for perfecting your Quranic recitation. Master the intricate rules of proper Quran pronunciation.",
    duration: "6 Months",
    students: 850,
    rating: 4.8,
    level: "Intermediate",
    category: "Tajweed",
    ageGroup: "Adults",
    teacher: "Sheikh Muhammad Ibrahim",
    image: "from-azure-light/20 to-primary/20"
  },
  {
    id: 3,
    title: "Arabic for Beginners",
    description: "Start your journey to understanding the language of the Quran. Learn Arabic script, basic grammar, and vocabulary.",
    duration: "4 Months",
    students: 2100,
    rating: 4.7,
    level: "Beginner",
    category: "Arabic",
    ageGroup: "All Ages",
    teacher: "Ustadha Fatima Ali",
    image: "from-primary/20 to-azure-dark/20"
  },
  {
    id: 4,
    title: "Islamic Studies Foundation",
    description: "Comprehensive introduction to Islamic beliefs, practices, and history. Build a strong foundation in your faith.",
    duration: "6 Months",
    students: 1500,
    rating: 4.9,
    level: "All Levels",
    category: "Islamic Studies",
    ageGroup: "All Ages",
    teacher: "Ustadha Aisha Rahman",
    image: "from-azure-soft/40 to-primary/20"
  },
  {
    id: 5,
    title: "Quran Memorization (Hifz)",
    description: "Structured program to memorize the Holy Quran with proper revision techniques and teacher guidance.",
    duration: "24 Months",
    students: 450,
    rating: 5.0,
    level: "All Levels",
    category: "Quran",
    ageGroup: "All Ages",
    teacher: "Sheikh Ahmad Hassan",
    image: "from-gold/20 to-primary/20"
  },
  {
    id: 6,
    title: "Hadith Studies",
    description: "Study the sayings and traditions of Prophet Muhammad (PBUH) from authentic sources with scholarly guidance.",
    duration: "8 Months",
    students: 680,
    rating: 4.8,
    level: "Intermediate",
    category: "Hadith",
    ageGroup: "Adults",
    teacher: "Sheikh Muhammad Ibrahim",
    image: "from-primary/30 to-azure-soft/30"
  },
  {
    id: 7,
    title: "Fiqh Essentials",
    description: "Learn Islamic jurisprudence covering worship, transactions, and daily life according to authentic sources.",
    duration: "6 Months",
    students: 920,
    rating: 4.7,
    level: "Intermediate",
    category: "Islamic Studies",
    ageGroup: "Adults",
    teacher: "Sheikh Muhammad Ibrahim",
    image: "from-azure-light/30 to-gold/20"
  },
  {
    id: 8,
    title: "Kids Quran Program",
    description: "Fun and engaging Quran lessons designed specifically for children ages 5-12 with interactive activities.",
    duration: "Ongoing",
    students: 1800,
    rating: 4.9,
    level: "Beginner",
    category: "Quran",
    ageGroup: "Children",
    teacher: "Ustadha Aisha Rahman",
    image: "from-azure-soft/40 to-azure-light/40"
  },
  {
    id: 9,
    title: "Advanced Arabic Grammar",
    description: "Deep dive into Arabic grammar (Nahw) and morphology (Sarf) for understanding classical Arabic texts.",
    duration: "12 Months",
    students: 340,
    rating: 4.6,
    level: "Advanced",
    category: "Arabic",
    ageGroup: "Adults",
    teacher: "Ustadha Fatima Ali",
    image: "from-primary/25 to-azure-dark/25"
  },
  {
    id: 10,
    title: "Seerah of the Prophet",
    description: "Comprehensive study of the life of Prophet Muhammad (PBUH), his character, and teachings.",
    duration: "4 Months",
    students: 1100,
    rating: 4.9,
    level: "All Levels",
    category: "Islamic Studies",
    ageGroup: "All Ages",
    teacher: "Ustadha Aisha Rahman",
    image: "from-gold/30 to-azure-soft/30"
  },
  {
    id: 11,
    title: "Tafseer Studies",
    description: "Understand the meanings and context of Quranic verses through classical and contemporary interpretations.",
    duration: "12 Months",
    students: 520,
    rating: 4.8,
    level: "Advanced",
    category: "Quran",
    ageGroup: "Adults",
    teacher: "Sheikh Ahmad Hassan",
    image: "from-azure-dark/20 to-primary/20"
  },
  {
    id: 12,
    title: "Islamic Ethics & Character",
    description: "Develop noble character traits based on Quranic and Prophetic teachings for personal transformation.",
    duration: "3 Months",
    students: 780,
    rating: 4.7,
    level: "All Levels",
    category: "Islamic Studies",
    ageGroup: "All Ages",
    teacher: "Ustadha Fatima Ali",
    image: "from-primary/20 to-gold/20"
  },
];

const categories = ["All", "Quran", "Tajweed", "Arabic", "Islamic Studies", "Hadith"];
const levels = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const ageGroups = ["All Ages", "Children", "Adults"];

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All Levels");
  const [selectedAge, setSelectedAge] = useState("All Ages");

  const filteredCourses = allCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All Levels" || course.level === selectedLevel;
    const matchesAge = selectedAge === "All Ages" || course.ageGroup === selectedAge || course.ageGroup === "All Ages";
    
    return matchesSearch && matchesCategory && matchesLevel && matchesAge;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-azure-soft/40 via-background to-background"></div>
        <div className="absolute inset-0 islamic-pattern"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              Our Courses
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Explore Our <span className="text-gradient">Islamic Courses</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover a wide range of courses designed to deepen your understanding 
              of the Quran, Arabic language, and Islamic sciences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-background border-b border-border sticky top-20 z-30">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <Filter className="w-5 h-5 text-muted-foreground hidden md:block" />
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[140px] h-11">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-[140px] h-11">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAge} onValueChange={setSelectedAge}>
                <SelectTrigger className="w-[140px] h-11">
                  <SelectValue placeholder="Age Group" />
                </SelectTrigger>
                <SelectContent>
                  {ageGroups.map((age) => (
                    <SelectItem key={age} value={age}>{age}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          {/* Results Count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-muted-foreground mb-8"
          >
            Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
          </motion.p>

          {filteredCourses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="card-elevated group hover:shadow-elevated transition-all duration-300"
                >
                  {/* Course Image */}
                  <div className={`aspect-[16/10] rounded-t-xl bg-gradient-to-br ${course.image} flex items-center justify-center relative overflow-hidden`}>
                    <BookOpen className="w-16 h-16 text-primary/60 group-hover:scale-110 transition-transform duration-300" />
                    <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                      {course.category}
                    </Badge>
                    <Badge className="absolute top-4 right-4 bg-background/90 text-foreground">
                      {course.ageGroup}
                    </Badge>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">{course.level}</Badge>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {course.duration}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Teacher */}
                    <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                      <GraduationCap className="w-4 h-4" />
                      <span>{course.teacher}</span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-border pt-4">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-gold fill-gold" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link to={`/courses/${course.id}`}>
                      <Button className="w-full mt-4 btn-hero py-3 text-sm group/btn">
                        View Course
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setSelectedLevel("All Levels");
                  setSelectedAge("All Ages");
                }}
              >
                Clear Filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary via-azure-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Book a free consultation with our team to find the perfect course for your learning goals.
            </p>
            <Link to="/contact">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg font-semibold rounded-xl shadow-elevated">
                Get Free Consultation
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Courses;
