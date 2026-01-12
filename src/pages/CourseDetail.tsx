import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Globe,
  Award,
  FileText,
  ChevronDown,
  ChevronUp,
  User,
  Calendar,
  BarChart3,
  Heart,
  Share2,
  ArrowRight,
  GraduationCap,
  MessageSquare,
  ThumbsUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CourseEnrollmentForm } from "@/components/course/CourseEnrollmentForm";
import { VideoPreviewModal } from "@/components/course/VideoPreviewModal";

// Course data - in production this would come from database
const coursesData = [
  {
    id: 1,
    title: "Quran Recitation Basics",
    subtitle: "Learn proper pronunciation and recitation of the Holy Quran with Tajweed rules",
    description: "This comprehensive course is designed for beginners who want to learn how to recite the Holy Quran correctly. You will learn the Arabic alphabet, basic Tajweed rules, and proper pronunciation techniques. Our experienced teachers will guide you step by step through the learning process, ensuring you develop a strong foundation in Quranic recitation.",
    longDescription: `
      <p>The Quran Recitation Basics course is your gateway to understanding and reciting the Holy Quran with proper pronunciation and Tajweed rules. This course has been carefully designed for beginners who are taking their first steps in learning Quranic recitation.</p>
      
      <h3>What You'll Learn</h3>
      <ul>
        <li>Master the Arabic alphabet and its proper pronunciation</li>
        <li>Understand the basic rules of Tajweed</li>
        <li>Learn to read Quranic text with correct articulation points (Makharij)</li>
        <li>Practice with common Surahs and verses</li>
        <li>Develop confidence in reciting the Quran</li>
      </ul>
      
      <h3>Course Approach</h3>
      <p>Our teaching methodology combines traditional Islamic learning with modern pedagogical techniques. Each lesson is structured to build upon previous knowledge, ensuring gradual and sustainable progress.</p>
    `,
    duration: "3 Months",
    totalHours: 48,
    lessonsCount: 36,
    students: 1200,
    rating: 4.9,
    reviewsCount: 328,
    level: "Beginner",
    category: "Quran",
    ageGroup: "All Ages",
    teacher: {
      name: "Sheikh Ahmad Hassan",
      title: "Senior Quran Instructor",
      image: "",
      bio: "Sheikh Ahmad Hassan has been teaching Quranic recitation for over 15 years. He holds an Ijazah in Quran recitation from Al-Azhar University and has taught thousands of students worldwide.",
      courses: 5,
      students: 4500,
      rating: 4.9,
    },
    language: "English & Arabic",
    lastUpdated: "December 2025",
    image: "from-primary/20 to-azure-light/20",
    price: "Free",
    features: [
      "Live one-on-one sessions",
      "Recorded lesson replays",
      "Practice materials included",
      "Certificate upon completion",
      "Lifetime access",
      "Mobile-friendly learning",
    ],
    requirements: [
      "No prior knowledge required",
      "Dedication to practice regularly",
      "Stable internet connection",
      "Device with audio capability",
    ],
    curriculum: [
      {
        title: "Introduction to Arabic Letters",
        lessons: [
          { title: "Welcome & Course Overview", duration: "10 min", preview: true },
          { title: "The Arabic Alphabet - Part 1", duration: "25 min", preview: true },
          { title: "The Arabic Alphabet - Part 2", duration: "25 min", preview: false },
          { title: "Connecting Letters", duration: "30 min", preview: false },
          { title: "Practice Session 1", duration: "20 min", preview: false },
        ],
      },
      {
        title: "Vowels and Pronunciation",
        lessons: [
          { title: "Short Vowels (Harakat)", duration: "25 min", preview: false },
          { title: "Long Vowels (Madd)", duration: "30 min", preview: false },
          { title: "Sukoon and Shadda", duration: "25 min", preview: false },
          { title: "Tanween Rules", duration: "30 min", preview: false },
          { title: "Practice Session 2", duration: "25 min", preview: false },
        ],
      },
      {
        title: "Introduction to Tajweed",
        lessons: [
          { title: "What is Tajweed?", duration: "20 min", preview: false },
          { title: "Makharij (Articulation Points)", duration: "35 min", preview: false },
          { title: "Sifaat (Characteristics)", duration: "30 min", preview: false },
          { title: "Rules of Noon Sakinah", duration: "40 min", preview: false },
          { title: "Rules of Meem Sakinah", duration: "30 min", preview: false },
        ],
      },
      {
        title: "Practical Application",
        lessons: [
          { title: "Reciting Surah Al-Fatiha", duration: "30 min", preview: false },
          { title: "Reciting Short Surahs - Part 1", duration: "35 min", preview: false },
          { title: "Reciting Short Surahs - Part 2", duration: "35 min", preview: false },
          { title: "Final Assessment", duration: "45 min", preview: false },
          { title: "Course Completion & Next Steps", duration: "15 min", preview: false },
        ],
      },
    ],
    reviews: [
      {
        id: 1,
        user: "Fatima K.",
        avatar: "",
        rating: 5,
        date: "2 weeks ago",
        comment: "This course exceeded my expectations! Sheikh Ahmad explains everything so clearly. I went from knowing nothing about Arabic to being able to read basic Quranic text in just 2 months. Highly recommended for beginners!",
        helpful: 24,
      },
      {
        id: 2,
        user: "Omar M.",
        avatar: "",
        rating: 5,
        date: "1 month ago",
        comment: "Alhamdulillah, this course has been a blessing. The one-on-one sessions really helped me correct my pronunciation. The teacher is patient and knowledgeable.",
        helpful: 18,
      },
      {
        id: 3,
        user: "Sarah A.",
        avatar: "",
        rating: 4,
        date: "1 month ago",
        comment: "Great course structure and content. The Tajweed explanations are very detailed. I would have liked more practice materials, but overall an excellent learning experience.",
        helpful: 12,
      },
      {
        id: 4,
        user: "Abdullah R.",
        avatar: "",
        rating: 5,
        date: "2 months ago",
        comment: "I've tried many online Quran courses, but this one stands out. The curriculum is well-organized, and the teacher genuinely cares about student progress. My recitation has improved significantly.",
        helpful: 31,
      },
    ],
  },
];

const relatedCourses = [
  {
    id: 2,
    title: "Tajweed Mastery",
    teacher: "Sheikh Muhammad Ibrahim",
    rating: 4.8,
    students: 850,
    level: "Intermediate",
    image: "from-azure-light/20 to-primary/20",
  },
  {
    id: 5,
    title: "Quran Memorization (Hifz)",
    teacher: "Sheikh Ahmad Hassan",
    rating: 5.0,
    students: 450,
    level: "All Levels",
    image: "from-gold/20 to-primary/20",
  },
  {
    id: 11,
    title: "Tafseer Studies",
    teacher: "Sheikh Ahmad Hassan",
    rating: 4.8,
    students: 520,
    level: "Advanced",
    image: "from-azure-dark/20 to-primary/20",
  },
];

const CourseDetail = () => {
  const { id } = useParams();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  
  // In production, fetch course data based on ID
  const course = coursesData[0]; // Using first course as demo

  const ratingDistribution = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 5 },
    { stars: 2, percentage: 1 },
    { stars: 1, percentage: 1 },
  ];

  const totalLessons = course.curriculum.reduce(
    (acc, section) => acc + section.lessons.length,
    0
  );

  return (
    <Layout>
      {/* Hero Section - Course Overview */}
      <section className="relative bg-gradient-to-br from-foreground via-azure-dark to-foreground py-12 lg:py-16">
        <div className="absolute inset-0 islamic-pattern opacity-5"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Course Info - Left Column */}
            <div className="lg:col-span-2 text-primary-foreground">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-primary-foreground/70 mb-4">
                <Link to="/courses" className="hover:text-primary-foreground transition-colors">
                  Courses
                </Link>
                <span>/</span>
                <span>{course.category}</span>
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {course.title}
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/80 mb-6">
                  {course.subtitle}
                </p>

                {/* Rating & Stats */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <Badge className="bg-gold text-foreground font-semibold">
                    Bestseller
                  </Badge>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-gold">{course.rating}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(course.rating)
                              ? "text-gold fill-gold"
                              : "text-gold/30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-primary-foreground/70">
                      ({course.reviewsCount} reviews)
                    </span>
                  </div>
                  <span className="text-primary-foreground/70">
                    {course.students.toLocaleString()} students
                  </span>
                </div>

                {/* Teacher */}
                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="w-10 h-10 border-2 border-primary-foreground/20">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {course.teacher.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm text-primary-foreground/70">Created by</p>
                    <Link
                      to="/teachers"
                      className="font-medium text-azure-light hover:underline"
                    >
                      {course.teacher.name}
                    </Link>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>Last updated {course.lastUpdated}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-4 h-4" />
                    <span>{course.language}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 className="w-4 h-4" />
                    <span>{course.level}</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Course Card - Right Column (Sticky on Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              <div className="card-elevated overflow-hidden">
                {/* Course Preview Image */}
                <div
                  onClick={() => setIsVideoModalOpen(true)}
                  className={`aspect-video bg-gradient-to-br ${course.image} flex items-center justify-center relative group cursor-pointer`}
                >
                  <div className="absolute inset-0 bg-foreground/40 group-hover:bg-foreground/50 transition-colors"></div>
                  <div className="relative z-10 w-16 h-16 rounded-full bg-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                  <span className="absolute bottom-4 left-4 text-primary-foreground text-sm font-medium z-10">
                    Preview this course
                  </span>
                </div>

                <div className="p-6">
                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-foreground">
                      {course.price}
                    </span>
                  </div>

                  {/* CTA Buttons */}
                  <Link to="/admission">
                    <Button className="w-full btn-hero mb-3">
                      Enroll Now
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setIsWishlisted(!isWishlisted)}
                    >
                      <Heart
                        className={`w-4 h-4 mr-2 ${
                          isWishlisted ? "fill-destructive text-destructive" : ""
                        }`}
                      />
                      Wishlist
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Course Features */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-4">
                      This course includes:
                    </h4>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{course.totalHours} hours of content</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4 text-primary" />
                        <span>{totalLessons} lessons</span>
                      </li>
                      {course.features.slice(0, 4).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-3 text-sm text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Course Content Tabs */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start border-b border-border rounded-none bg-transparent h-auto p-0 mb-8">
                  <TabsTrigger
                    value="overview"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    Overview
                  </TabsTrigger>
                  <TabsTrigger
                    value="curriculum"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    Curriculum
                  </TabsTrigger>
                  <TabsTrigger
                    value="instructor"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    Instructor
                  </TabsTrigger>
                  <TabsTrigger
                    value="reviews"
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3"
                  >
                    Reviews
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* What You'll Learn */}
                    <div className="card-elevated p-6 mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-6">
                        What you'll learn
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          "Master the Arabic alphabet and pronunciation",
                          "Understand basic Tajweed rules",
                          "Read Quranic text with proper articulation",
                          "Recite common Surahs correctly",
                          "Build confidence in Quran recitation",
                          "Develop a strong foundation for further study",
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Course Description */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">
                        Description
                      </h2>
                      <div className="prose prose-lg text-muted-foreground max-w-none">
                        <p>{course.description}</p>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(course.longDescription),
                          }}
                        />
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-foreground mb-4">
                        Requirements
                      </h2>
                      <ul className="space-y-2">
                        {course.requirements.map((req, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-3 text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Curriculum Tab */}
                <TabsContent value="curriculum" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-foreground">
                        Course Content
                      </h2>
                      <p className="text-muted-foreground text-sm">
                        {course.curriculum.length} sections • {totalLessons} lessons •{" "}
                        {course.totalHours} hours total
                      </p>
                    </div>

                    <Accordion
                      type="multiple"
                      defaultValue={["section-0"]}
                      className="space-y-3"
                    >
                      {course.curriculum.map((section, sectionIdx) => (
                        <AccordionItem
                          key={sectionIdx}
                          value={`section-${sectionIdx}`}
                          className="card-elevated border-none"
                        >
                          <AccordionTrigger className="px-6 py-4 hover:no-underline">
                            <div className="flex items-center gap-4 text-left">
                              <span className="font-semibold text-foreground">
                                Section {sectionIdx + 1}: {section.title}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {section.lessons.length} lessons
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-6 pb-4">
                            <ul className="space-y-2">
                              {section.lessons.map((lesson, lessonIdx) => (
                                <li
                                  key={lessonIdx}
                                  className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                  <div className="flex items-center gap-3">
                                    {lesson.preview ? (
                                      <Play className="w-4 h-4 text-primary" />
                                    ) : (
                                      <FileText className="w-4 h-4 text-muted-foreground" />
                                    )}
                                    <span className="text-muted-foreground">
                                      {lesson.title}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    {lesson.preview && (
                                      <Badge
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        Preview
                                      </Badge>
                                    )}
                                    <span className="text-sm text-muted-foreground">
                                      {lesson.duration}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </motion.div>
                </TabsContent>

                {/* Instructor Tab */}
                <TabsContent value="instructor" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Instructor
                    </h2>

                    <div className="card-elevated p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <Avatar className="w-24 h-24 border-4 border-azure-soft">
                          <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                            {course.teacher.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <Link
                            to="/teachers"
                            className="text-xl font-bold text-primary hover:underline"
                          >
                            {course.teacher.name}
                          </Link>
                          <p className="text-muted-foreground mb-4">
                            {course.teacher.title}
                          </p>

                          <div className="flex flex-wrap gap-6 mb-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 text-gold fill-gold" />
                              <span className="text-foreground font-medium">
                                {course.teacher.rating} Instructor Rating
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {course.reviewsCount} Reviews
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {course.teacher.students.toLocaleString()} Students
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-muted-foreground" />
                              <span className="text-muted-foreground">
                                {course.teacher.courses} Courses
                              </span>
                            </div>
                          </div>

                          <p className="text-muted-foreground">
                            {course.teacher.bio}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="mt-0">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-2xl font-bold text-foreground mb-6">
                      Student Reviews
                    </h2>

                    {/* Rating Overview */}
                    <div className="card-elevated p-6 mb-8">
                      <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-gold mb-2">
                            {course.rating}
                          </div>
                          <div className="flex justify-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(course.rating)
                                    ? "text-gold fill-gold"
                                    : "text-gold/30"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground text-sm">
                            Course Rating
                          </p>
                        </div>

                        <div className="flex-1 w-full">
                          {ratingDistribution.map((item) => (
                            <div
                              key={item.stars}
                              className="flex items-center gap-3 mb-2"
                            >
                              <div className="flex items-center gap-1 w-20">
                                <Star className="w-4 h-4 text-gold fill-gold" />
                                <span className="text-sm text-muted-foreground">
                                  {item.stars} stars
                                </span>
                              </div>
                              <Progress
                                value={item.percentage}
                                className="flex-1 h-2"
                              />
                              <span className="text-sm text-muted-foreground w-12 text-right">
                                {item.percentage}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-6">
                      {course.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="card-elevated p-6"
                        >
                          <div className="flex items-start gap-4">
                            <Avatar className="w-12 h-12">
                              <AvatarFallback className="bg-secondary text-secondary-foreground">
                                {review.user.charAt(0)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <span className="font-semibold text-foreground">
                                    {review.user}
                                  </span>
                                  <div className="flex items-center gap-2 mt-1">
                                    <div className="flex">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`w-4 h-4 ${
                                            i < review.rating
                                              ? "text-gold fill-gold"
                                              : "text-gold/30"
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                      {review.date}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <p className="text-muted-foreground mb-4">
                                {review.comment}
                              </p>

                              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                <span>Helpful ({review.helpful})</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Enrollment Form - Right Sidebar */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <CourseEnrollmentForm courseName={course.title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Courses */}
      <section className="py-16 bg-muted/30">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Related Courses
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated group hover:shadow-elevated transition-all duration-300"
              >
                <div
                  className={`aspect-[16/10] rounded-t-xl bg-gradient-to-br ${course.image} flex items-center justify-center`}
                >
                  <BookOpen className="w-12 h-12 text-primary/60 group-hover:scale-110 transition-transform duration-300" />
                </div>

                <div className="p-5">
                  <Badge variant="secondary" className="mb-2">
                    {course.level}
                  </Badge>
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {course.teacher}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-gold fill-gold" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {course.students} students
                    </span>
                  </div>

                  <Link to={`/courses/${course.id}`}>
                    <Button className="w-full mt-4" variant="outline">
                      View Course
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-50">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-2xl font-bold text-foreground">{course.price}</span>
          </div>
          <Link to="/admission" className="flex-1">
            <Button className="w-full btn-hero">
              Enroll Now
            </Button>
          </Link>
        </div>
      </div>

      {/* Video Preview Modal */}
      <VideoPreviewModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        courseTitle={course.title}
        curriculum={course.curriculum}
      />
    </Layout>
  );
};

export default CourseDetail;
