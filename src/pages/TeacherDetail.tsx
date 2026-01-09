import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Star, 
  BookOpen, 
  Award,
  Users,
  Clock,
  Globe,
  Mail,
  MessageCircle,
  ArrowRight,
  Play,
  Calendar,
  Quote,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Teacher data
const teachers = [
  {
    id: 1,
    name: "Sheikh Ahmad Hassan",
    title: "Quran & Tajweed Expert",
    qualification: "PhD in Islamic Studies, Al-Azhar University",
    experience: "15+ years",
    rating: 4.9,
    reviews: 320,
    courses: 8,
    students: 1500,
    languages: ["Arabic", "English", "Urdu"],
    specializations: ["Quran Recitation", "Tajweed", "Tafseer"],
    avatar: "AH",
    bio: "Sheikh Ahmad Hassan is a renowned scholar with over 15 years of experience in teaching Quran and Islamic sciences. He holds a PhD from Al-Azhar University and has memorized the Quran with multiple ijazahs.",
    fullBio: `Sheikh Ahmad Hassan began his Islamic education at the age of 7 in Cairo, Egypt. By the age of 15, he had memorized the entire Quran and received his first ijazah in Quran recitation.

He pursued higher education at Al-Azhar University, where he earned his Bachelor's degree in Islamic Studies, followed by a Master's degree specializing in Quranic Sciences, and ultimately his PhD focusing on Tajweed methodology and pedagogy.

Throughout his career, Sheikh Ahmad has taught thousands of students from over 50 countries. His unique teaching methodology combines traditional scholarly approaches with modern pedagogical techniques, making complex Quranic sciences accessible to students of all levels.

Sheikh Ahmad is passionate about preserving the authentic tradition of Quran recitation while adapting teaching methods for the digital age. He regularly participates in international Quran competitions as a judge and has authored several books on Tajweed.`,
    education: [
      { degree: "PhD in Islamic Studies", institution: "Al-Azhar University, Cairo", year: "2012" },
      { degree: "MA in Quranic Sciences", institution: "Al-Azhar University, Cairo", year: "2008" },
      { degree: "BA in Islamic Studies", institution: "Al-Azhar University, Cairo", year: "2005" },
      { degree: "Hifz Completion with Ijazah", institution: "Dar Al-Quran, Cairo", year: "2000" }
    ],
    achievements: [
      "Multiple Ijazahs in Quran recitation",
      "International Quran Competition Judge",
      "Author of 3 books on Tajweed",
      "Certified Online Islamic Educator"
    ]
  },
  {
    id: 2,
    name: "Ustadha Fatima Ali",
    title: "Arabic Language Specialist",
    qualification: "MA in Arabic Linguistics, Cairo University",
    experience: "12+ years",
    rating: 4.8,
    reviews: 245,
    courses: 6,
    students: 1200,
    languages: ["Arabic", "English", "French"],
    specializations: ["Arabic Grammar", "Arabic Literature", "Classical Arabic"],
    avatar: "FA",
    bio: "Ustadha Fatima is a distinguished Arabic language expert with a passion for making Arabic accessible to non-native speakers. Her interactive teaching methods have helped thousands master the language of the Quran.",
    fullBio: `Ustadha Fatima Ali is a distinguished Arabic language expert with a passion for making Arabic accessible to non-native speakers. Born and raised in Cairo, she grew up immersed in the rich Arabic literary tradition.

She completed her Bachelor's degree in Arabic Literature at Cairo University with honors, then pursued her Master's degree in Arabic Linguistics, focusing on pedagogical approaches for teaching Arabic as a second language.

Ustadha Fatima's teaching philosophy centers on making classical Arabic accessible and engaging. She has developed innovative curricula that bridge the gap between conversational Arabic and the classical language of the Quran.

With over 12 years of teaching experience, she has helped thousands of students from diverse backgrounds achieve fluency in Arabic. Her students consistently praise her patient approach and her ability to explain complex grammatical concepts in simple terms.`,
    education: [
      { degree: "MA in Arabic Linguistics", institution: "Cairo University", year: "2013" },
      { degree: "BA in Arabic Literature", institution: "Cairo University, Honors", year: "2010" },
      { degree: "TAFL Certification", institution: "American University in Cairo", year: "2011" }
    ],
    achievements: [
      "Developed Arabic curriculum for 5 international institutions",
      "Published author in Arabic language pedagogy",
      "TAFL Certified Instructor",
      "Created award-winning Arabic learning app"
    ]
  },
  {
    id: 3,
    name: "Sheikh Muhammad Ibrahim",
    title: "Hadith & Fiqh Scholar",
    qualification: "Ijazah from Al-Azhar, MA in Islamic Jurisprudence",
    experience: "20+ years",
    rating: 5.0,
    reviews: 412,
    courses: 10,
    students: 2000,
    languages: ["Arabic", "English", "Malay"],
    specializations: ["Hadith Studies", "Fiqh", "Islamic Law"],
    avatar: "MI",
    bio: "Sheikh Muhammad Ibrahim is a senior scholar with two decades of teaching experience. His deep knowledge of Hadith sciences and Islamic jurisprudence has made him a respected authority in the field.",
    fullBio: `Sheikh Muhammad Ibrahim is a senior scholar with two decades of teaching experience in Hadith sciences and Islamic jurisprudence. His journey in Islamic scholarship began in his hometown in Malaysia before he traveled to study under renowned scholars across the Muslim world.

He spent 8 years studying at Al-Azhar University in Egypt, where he received multiple ijazahs in Hadith sciences from distinguished scholars. He also completed his formal education with a Master's degree in Islamic Jurisprudence.

Sheikh Muhammad's expertise lies in making the intricate sciences of Hadith and Fiqh accessible to contemporary students. He emphasizes understanding the wisdom behind Islamic rulings rather than mere memorization.

Over his 20-year career, he has taught more than 2000 students and trained numerous teachers who now spread knowledge across the globe. He is known for his rigorous yet compassionate approach to scholarship.`,
    education: [
      { degree: "MA in Islamic Jurisprudence", institution: "Al-Azhar University, Cairo", year: "2006" },
      { degree: "Multiple Ijazahs in Hadith", institution: "Various Scholars, Egypt & Saudi Arabia", year: "2003" },
      { degree: "BA in Shariah", institution: "International Islamic University Malaysia", year: "2000" }
    ],
    achievements: [
      "Author of comprehensive Hadith study guide",
      "Certified Mufti in Shafi'i Fiqh",
      "Founder of online Hadith academy",
      "Mentored over 50 Islamic teachers"
    ]
  },
  {
    id: 4,
    name: "Ustadha Aisha Rahman",
    title: "Islamic Studies Teacher",
    qualification: "BA in Islamic Education, International Islamic University",
    experience: "8+ years",
    rating: 4.7,
    reviews: 189,
    courses: 5,
    students: 800,
    languages: ["English", "Arabic", "Bengali"],
    specializations: ["Islamic Studies", "Seerah", "Children's Education"],
    avatar: "AR",
    bio: "Ustadha Aisha specializes in teaching Islamic studies to children and new Muslims. Her warm and patient approach creates a nurturing environment for learners of all backgrounds.",
    fullBio: `Ustadha Aisha Rahman specializes in teaching Islamic studies to children and new Muslims, with a focus on creating nurturing and supportive learning environments.

She completed her Bachelor's degree in Islamic Education at the International Islamic University, where she developed a passion for child-centered Islamic pedagogy. She has since completed additional certifications in educational psychology and special needs education.

Ustadha Aisha believes that early Islamic education should be joyful and engaging. She has developed age-appropriate curricula that make Islamic concepts accessible to young minds while building a strong foundation of faith.

Her work with new Muslims has given her unique insights into the challenges faced by those beginning their Islamic journey. She approaches teaching with empathy, patience, and a deep understanding of diverse backgrounds and experiences.`,
    education: [
      { degree: "BA in Islamic Education", institution: "International Islamic University", year: "2015" },
      { degree: "Certificate in Child Psychology", institution: "Open University", year: "2017" },
      { degree: "Special Needs Education Diploma", institution: "British Council", year: "2019" }
    ],
    achievements: [
      "Developed children's Islamic curriculum used in 20+ schools",
      "Author of 'My First Steps in Islam' series",
      "Certified children's counselor",
      "Created popular YouTube channel for Muslim kids"
    ]
  },
  {
    id: 5,
    name: "Sheikh Yusuf Ali",
    title: "Quran Memorization Specialist",
    qualification: "Hafiz, Multiple Ijazahs in Qira'at",
    experience: "18+ years",
    rating: 4.9,
    reviews: 378,
    courses: 4,
    students: 600,
    languages: ["Arabic", "English", "Turkish"],
    specializations: ["Hifz", "Qira'at", "Tajweed"],
    avatar: "YA",
    bio: "Sheikh Yusuf has dedicated his life to Quran memorization and teaching. He holds ijazahs in multiple qira'at and has helped hundreds of students complete their Quran memorization journey.",
    fullBio: `Sheikh Yusuf Ali has dedicated his life to Quran memorization and teaching, guiding hundreds of students through their Hifz journey with patience and expertise.

Born in Istanbul, Turkey, Sheikh Yusuf memorized the Quran by age 12 and went on to study the ten qira'at under master reciters in Turkey, Egypt, and Saudi Arabia. He holds multiple ijazahs with connected chains of transmission to the Prophet Muhammad (peace be upon him).

His unique approach to Hifz combines traditional memorization techniques with modern memory science, helping students retain what they memorize for life. He emphasizes understanding the meaning alongside memorization.

Sheikh Yusuf has helped over 600 students complete their Hifz, with many going on to become teachers themselves. He is known for his ability to identify and address each student's unique challenges in memorization.`,
    education: [
      { degree: "Ijazah in 10 Qira'at", institution: "Various Masters, Egypt & Saudi Arabia", year: "2008" },
      { degree: "BA in Quranic Studies", institution: "Marmara University, Istanbul", year: "2005" },
      { degree: "Hifz Completion", institution: "Istanbul Quran Academy", year: "2000" }
    ],
    achievements: [
      "Certified in all 10 Qira'at with sanad",
      "Helped 600+ students complete Hifz",
      "Developed Hifz methodology adopted internationally",
      "Judge at international Quran competitions"
    ]
  },
  {
    id: 6,
    name: "Ustadha Maryam Hassan",
    title: "Women's Islamic Education",
    qualification: "MA in Islamic Studies, Islamic University of Madinah",
    experience: "10+ years",
    rating: 4.8,
    reviews: 267,
    courses: 7,
    students: 950,
    languages: ["Arabic", "English", "Somali"],
    specializations: ["Women in Islam", "Family Fiqh", "Tazkiyah"],
    avatar: "MH",
    bio: "Ustadha Maryam is passionate about women's Islamic education and empowerment. She teaches with a focus on practical application of Islamic knowledge in daily life.",
    fullBio: `Ustadha Maryam Hassan is passionate about women's Islamic education and empowerment, with a focus on practical application of Islamic knowledge in daily life.

She studied at the Islamic University of Madinah, where she earned her Master's degree in Islamic Studies with a focus on women's issues in Islamic jurisprudence. Her research on female scholarship in Islamic history has been published in several academic journals.

Ustadha Maryam's teaching focuses on helping Muslim women understand their rights, responsibilities, and spiritual potential within the Islamic framework. She addresses contemporary challenges faced by Muslim women with wisdom rooted in classical scholarship.

Her courses on family fiqh and spiritual purification (tazkiyah) have helped nearly a thousand women deepen their understanding and practice of Islam. She is known for her accessible teaching style and her ability to address sensitive topics with wisdom and compassion.`,
    education: [
      { degree: "MA in Islamic Studies", institution: "Islamic University of Madinah", year: "2013" },
      { degree: "BA in Shariah", institution: "Islamic University of Madinah", year: "2010" },
      { degree: "Ijazah in Hadith", institution: "Scholars of Madinah", year: "2012" }
    ],
    achievements: [
      "Published researcher on women in Islamic history",
      "Founder of women's Islamic study circles",
      "Featured speaker at international conferences",
      "Mentored over 100 female Islamic teachers"
    ]
  }
];

// Sample courses for teachers
const teacherCourses = [
  {
    id: 1,
    title: "Complete Tajweed Masterclass",
    description: "Master the rules of Tajweed from basics to advanced",
    students: 450,
    rating: 4.9,
    duration: "40 hours",
    level: "All Levels",
    price: 149
  },
  {
    id: 2,
    title: "Quran Memorization Program",
    description: "Structured approach to memorizing the Holy Quran",
    students: 320,
    rating: 4.8,
    duration: "Ongoing",
    level: "Beginner",
    price: 199
  },
  {
    id: 3,
    title: "Tafseer of Surah Al-Baqarah",
    description: "Deep dive into the meanings of the longest Surah",
    students: 280,
    rating: 5.0,
    duration: "30 hours",
    level: "Intermediate",
    price: 129
  }
];

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: "Abdullah Khan",
    location: "London, UK",
    avatar: "AK",
    rating: 5,
    text: "An exceptional teacher who truly cares about his students. His patience and knowledge have transformed my Quran recitation. I can't recommend him enough!",
    course: "Complete Tajweed Masterclass",
    date: "2 months ago"
  },
  {
    id: 2,
    name: "Sarah Ahmed",
    location: "Toronto, Canada",
    avatar: "SA",
    rating: 5,
    text: "The best online Quran teacher I've ever had. His teaching methodology is unique and effective. I've learned more in 3 months than I did in years of study.",
    course: "Quran Memorization Program",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Muhammad Ali",
    location: "Sydney, Australia",
    avatar: "MA",
    rating: 5,
    text: "SubhanAllah, the depth of knowledge is incredible. Every class feels like a blessing. The teacher makes complex concepts easy to understand.",
    course: "Tafseer of Surah Al-Baqarah",
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "Fatima Zahra",
    location: "Dubai, UAE",
    avatar: "FZ",
    rating: 4,
    text: "Very knowledgeable and patient teacher. The structured approach to learning has helped me progress steadily. Highly recommended for serious students.",
    course: "Complete Tajweed Masterclass",
    date: "1 week ago"
  }
];

const TeacherDetail = () => {
  const { id } = useParams();
  const teacher = teachers.find(t => t.id === Number(id));

  if (!teacher) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Teacher Not Found</h1>
            <Link to="/teachers">
              <Button>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back to Teachers
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-azure-soft/40 via-background to-background"></div>
        <div className="absolute inset-0 islamic-pattern"></div>
        
        <div className="container-custom relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link to="/teachers" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Teachers</span>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Teacher Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Avatar */}
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-primary to-azure-light flex items-center justify-center text-5xl font-bold text-primary-foreground shadow-glow flex-shrink-0">
                  {teacher.avatar}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      <Award className="w-3 h-3 mr-1" />
                      Verified Scholar
                    </Badge>
                  </div>
                  
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                    {teacher.name}
                  </h1>
                  <p className="text-xl text-primary font-medium mb-3">{teacher.title}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 text-gold fill-gold" />
                      <span className="font-semibold text-foreground">{teacher.rating}</span>
                      <span>({teacher.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-5 h-5" />
                      <span>{teacher.students.toLocaleString()} students</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-5 h-5" />
                      <span>{teacher.courses} courses</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{teacher.bio}</p>

                  <div className="flex flex-wrap gap-2">
                    {teacher.specializations.map((spec) => (
                      <Badge key={spec} variant="outline" className="text-sm">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="sticky top-24 card-elevated">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-4">Contact & Book</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">{teacher.experience}</p>
                        <p className="text-xs">Teaching Experience</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium">{teacher.languages.join(", ")}</p>
                        <p className="text-xs">Languages</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-foreground font-medium line-clamp-2">{teacher.qualification}</p>
                        <p className="text-xs">Qualification</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Link to={`/courses`} className="block">
                      <Button className="w-full btn-hero">
                        <BookOpen className="w-5 h-5 mr-2" />
                        View Courses
                      </Button>
                    </Link>
                    <Link to="/contact" className="block">
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </Link>
                    <Link to="/admission" className="block">
                      <Button variant="ghost" className="w-full">
                        <Calendar className="w-5 h-5 mr-2" />
                        Book a Session
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <Tabs defaultValue="about" className="space-y-8">
            <TabsList className="w-full justify-start bg-background border border-border rounded-xl p-1 overflow-x-auto flex-nowrap">
              <TabsTrigger value="about" className="flex-shrink-0">About</TabsTrigger>
              <TabsTrigger value="courses" className="flex-shrink-0">Courses ({teacher.courses})</TabsTrigger>
              <TabsTrigger value="reviews" className="flex-shrink-0">Reviews ({teacher.reviews})</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about" className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid lg:grid-cols-2 gap-8"
              >
                {/* Full Bio */}
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                      <Quote className="w-5 h-5 text-primary" />
                      Biography
                    </h3>
                    <div className="prose prose-sm text-muted-foreground space-y-4">
                      {teacher.fullBio.split('\n\n').map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Education & Achievements */}
                <div className="space-y-6">
                  {/* Education */}
                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        Education
                      </h3>
                      <div className="space-y-4">
                        {teacher.education.map((edu, index) => (
                          <div key={index} className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Award className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{edu.degree}</p>
                              <p className="text-sm text-muted-foreground">{edu.institution}</p>
                              <p className="text-xs text-muted-foreground">{edu.year}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Achievements */}
                  <Card className="card-elevated">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-primary" />
                        Achievements
                      </h3>
                      <ul className="space-y-3">
                        {teacher.achievements.map((achievement, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Star className="w-3 h-3 text-gold fill-gold" />
                            </div>
                            <span className="text-muted-foreground">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {teacherCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="card-elevated overflow-hidden group hover:shadow-elevated transition-all duration-300 h-full">
                      {/* Course Image Placeholder */}
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-azure-light/20 relative overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 text-primary fill-primary" />
                          </div>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-background/90">
                          {course.level}
                        </Badge>
                      </div>

                      <CardContent className="p-5">
                        <h4 className="font-semibold text-lg text-foreground mb-2 line-clamp-2">
                          {course.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {course.description}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-gold fill-gold" />
                            <span>{course.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{course.students}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <p className="text-xl font-bold text-primary">${course.price}</p>
                          <Link to={`/courses/${course.id}`}>
                            <Button size="sm" className="btn-hero">
                              View Course
                              <ArrowRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Rating Summary */}
                <Card className="card-elevated">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                      <div className="text-center">
                        <p className="text-5xl font-bold text-foreground">{teacher.rating}</p>
                        <div className="flex items-center gap-1 my-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star 
                              key={star} 
                              className={`w-5 h-5 ${star <= Math.floor(teacher.rating) ? 'text-gold fill-gold' : 'text-muted-foreground'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">Based on {teacher.reviews} reviews</p>
                      </div>
                      
                      <div className="flex-1 w-full">
                        {[5, 4, 3, 2, 1].map((stars) => {
                          const percentage = stars === 5 ? 85 : stars === 4 ? 12 : stars === 3 ? 3 : 0;
                          return (
                            <div key={stars} className="flex items-center gap-3 mb-2">
                              <div className="flex items-center gap-1 w-20">
                                <span className="text-sm">{stars}</span>
                                <Star className="w-4 h-4 text-gold fill-gold" />
                              </div>
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gold rounded-full"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground w-12">{percentage}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Individual Reviews */}
                <div className="grid md:grid-cols-2 gap-6">
                  {testimonials.map((review, index) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="card-elevated h-full">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-azure-light flex items-center justify-center text-lg font-bold text-primary-foreground">
                              {review.avatar}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-foreground">{review.name}</p>
                              <p className="text-sm text-muted-foreground">{review.location}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star 
                                  key={star} 
                                  className={`w-4 h-4 ${star <= review.rating ? 'text-gold fill-gold' : 'text-muted-foreground'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground mb-4">"{review.text}"</p>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-border text-sm text-muted-foreground">
                            <span>{review.course}</span>
                            <span>{review.date}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
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
              Ready to Learn with {teacher.name.split(' ')[0]}?
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Start your Islamic learning journey today. Enroll in one of the courses or book a personal session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/admission">
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg font-semibold rounded-xl shadow-elevated">
                  Enroll Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg font-semibold rounded-xl">
                  <Mail className="w-5 h-5 mr-2" />
                  Get in Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default TeacherDetail;