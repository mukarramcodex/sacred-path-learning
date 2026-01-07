import { Link } from "react-router-dom";
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
  MessageCircle,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    bio: "Sheikh Ahmad Hassan is a renowned scholar with over 15 years of experience in teaching Quran and Islamic sciences. He holds a PhD from Al-Azhar University and has memorized the Quran with multiple ijazahs."
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
    bio: "Ustadha Fatima is a distinguished Arabic language expert with a passion for making Arabic accessible to non-native speakers. Her interactive teaching methods have helped thousands master the language of the Quran."
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
    bio: "Sheikh Muhammad Ibrahim is a senior scholar with two decades of teaching experience. His deep knowledge of Hadith sciences and Islamic jurisprudence has made him a respected authority in the field."
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
    bio: "Ustadha Aisha specializes in teaching Islamic studies to children and new Muslims. Her warm and patient approach creates a nurturing environment for learners of all backgrounds."
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
    bio: "Sheikh Yusuf has dedicated his life to Quran memorization and teaching. He holds ijazahs in multiple qira'at and has helped hundreds of students complete their Quran memorization journey."
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
    bio: "Ustadha Maryam is passionate about women's Islamic education and empowerment. She teaches with a focus on practical application of Islamic knowledge in daily life."
  },
];

const stats = [
  { icon: Users, value: "100+", label: "Certified Teachers" },
  { icon: Globe, value: "20+", label: "Countries" },
  { icon: Award, value: "50+", label: "Ijazah Holders" },
  { icon: Star, value: "4.8", label: "Average Rating" },
];

const Teachers = () => {
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
              Our Teachers
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Learn from <span className="text-gradient">Certified Scholars</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Our teachers are highly qualified scholars with extensive experience in 
              Islamic education and a deep commitment to nurturing the next generation of Muslims.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-gradient-to-br from-primary/10 to-azure-light/10 flex items-center justify-center mb-3">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Grid */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated overflow-hidden group hover:shadow-elevated transition-all duration-300"
              >
                {/* Header */}
                <div className="bg-gradient-to-br from-primary/10 to-azure-light/10 p-6 text-center relative">
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-background/90 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <span className="text-sm font-medium">{teacher.rating}</span>
                  </div>
                  
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-azure-light flex items-center justify-center text-3xl font-bold text-primary-foreground shadow-glow mb-4">
                    {teacher.avatar}
                  </div>
                  <h3 className="font-semibold text-xl text-foreground">{teacher.name}</h3>
                  <p className="text-primary font-medium">{teacher.title}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Qualification */}
                  <div className="flex items-start gap-2 mb-3 text-sm text-muted-foreground">
                    <GraduationCap className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{teacher.qualification}</span>
                  </div>

                  {/* Experience */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{teacher.experience} teaching experience</span>
                  </div>

                  {/* Specializations */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {teacher.specializations.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  {/* Languages */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span>{teacher.languages.join(", ")}</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 border-t border-border pt-4 mb-4">
                    <div className="text-center">
                      <p className="font-semibold text-foreground">{teacher.courses}</p>
                      <p className="text-xs text-muted-foreground">Courses</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground">{teacher.students}</p>
                      <p className="text-xs text-muted-foreground">Students</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-foreground">{teacher.reviews}</p>
                      <p className="text-xs text-muted-foreground">Reviews</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to={`/teachers/${teacher.id}`}>
                    <Button className="w-full btn-hero py-3 text-sm group/btn">
                      View Profile
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Teacher CTA */}
      <section className="py-16 bg-gradient-to-br from-primary via-azure-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Are You a Qualified Islamic Scholar?
              </h2>
              <p className="text-xl text-primary-foreground/80 mb-6">
                Join our team of educators and share your knowledge with students 
                worldwide. We're always looking for passionate teachers to join IIQL.
              </p>
              <ul className="space-y-3 mb-8">
                {["Competitive compensation", "Flexible working hours", "Global student base", "Modern teaching tools"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-primary-foreground/90">
                    <Award className="w-5 h-5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg font-semibold rounded-xl shadow-elevated">
                  Apply to Teach
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block"
            >
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary-foreground">Teacher Support</p>
                    <p className="text-sm text-primary-foreground/70">We're here to help you succeed</p>
                  </div>
                </div>
                <p className="text-primary-foreground/80 italic">
                  "Joining IIQL was the best decision of my teaching career. The platform 
                  makes it easy to connect with students globally and the support team 
                  is always there to help."
                </p>
                <p className="mt-4 text-sm text-primary-foreground/60">
                  — Sheikh Ahmad Hassan, Quran Teacher
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Teachers;
