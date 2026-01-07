import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Heart, 
  Globe, 
  Award, 
  Users, 
  Target,
  Lightbulb,
  Star,
  CheckCircle,
  GraduationCap
} from "lucide-react";

const values = [
  {
    icon: BookOpen,
    title: "Quran-Centered Learning",
    description: "Every aspect of our curriculum is rooted in the teachings of the Holy Quran and authentic Sunnah."
  },
  {
    icon: Heart,
    title: "Spiritual Growth",
    description: "We believe in nurturing not just the mind, but the heart and soul of every student."
  },
  {
    icon: Globe,
    title: "Global Accessibility",
    description: "Making quality Islamic education accessible to Muslims worldwide, regardless of location."
  },
  {
    icon: Award,
    title: "Academic Excellence",
    description: "Maintaining the highest standards of Islamic scholarship and educational quality."
  },
];

const achievements = [
  { value: "5000+", label: "Students Enrolled" },
  { value: "50+", label: "Countries Reached" },
  { value: "100+", label: "Certified Teachers" },
  { value: "95%", label: "Student Satisfaction" },
];

const methodology = [
  {
    step: "01",
    title: "Assessment",
    description: "We begin with a comprehensive assessment to understand each student's current level and learning goals."
  },
  {
    step: "02",
    title: "Personalized Plan",
    description: "Based on the assessment, we create a customized learning plan tailored to the student's needs."
  },
  {
    step: "03",
    title: "Interactive Learning",
    description: "Engaging one-on-one or group sessions with certified teachers using modern teaching tools."
  },
  {
    step: "04",
    title: "Progress Tracking",
    description: "Regular assessments and progress reports to ensure continuous improvement and goal achievement."
  },
];

const About = () => {
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
              About IIQL
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Illuminating Minds with{" "}
              <span className="text-gradient">Divine Knowledge</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              The Islamic Institute of Quranic Learning (IIQL) is dedicated to spreading 
              authentic Islamic knowledge through innovative online education, making 
              quality learning accessible to Muslims worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-elevated p-8 md:p-10"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-azure-light/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To provide accessible, authentic, and high-quality Islamic education to 
                Muslims around the world, nurturing a generation of believers who are 
                deeply connected to the Quran and Sunnah while being positive contributors 
                to their communities.
              </p>
              <ul className="space-y-3">
                {["Teach Quran with proper Tajweed", "Spread authentic Islamic knowledge", "Build strong Muslim character"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="card-elevated p-8 md:p-10"
            >
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-azure-light/10 flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To become the world's leading online Islamic learning platform, recognized 
                for excellence in Quranic education and Islamic studies, empowering Muslims 
                of all ages and backgrounds to learn and practice their faith with confidence.
              </p>
              <ul className="space-y-3">
                {["Global leader in online Islamic education", "Accessible learning for every Muslim", "Excellence in scholarship and teaching"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                A Journey of Faith & <span className="text-gradient">Knowledge</span>
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  IIQL was founded with a simple yet profound vision: to make authentic 
                  Islamic education accessible to every Muslim, regardless of their 
                  location or circumstances.
                </p>
                <p>
                  What began as a small initiative by a group of dedicated scholars and 
                  educators has grown into a global platform serving thousands of students 
                  from over 50 countries. Our journey has been guided by the timeless 
                  principles of the Quran and Sunnah.
                </p>
                <p>
                  Today, we continue to expand our reach and enhance our offerings, always 
                  staying true to our core mission of nurturing hearts and minds through 
                  the light of Islamic knowledge.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-azure-soft via-secondary to-azure-soft flex items-center justify-center overflow-hidden border-2 border-primary/20 shadow-elevated">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-azure-light flex items-center justify-center shadow-glow">
                    <GraduationCap className="w-12 h-12 text-primary-foreground" />
                  </div>
                  <p className="font-arabic text-3xl text-primary mb-2">العلم نور</p>
                  <p className="text-muted-foreground">Knowledge is Light</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              Core Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Guided by <span className="text-gradient">Islamic Principles</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Our values are deeply rooted in the teachings of the Quran and Sunnah, 
              shaping everything we do at IIQL.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated p-6 text-center group hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary/10 to-azure-light/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-gradient-to-br from-primary via-azure-dark to-primary relative overflow-hidden">
        <div className="absolute inset-0 islamic-pattern opacity-10"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
                  {item.value}
                </p>
                <p className="text-primary-foreground/80">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              Methodology
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Teaching <span className="text-gradient">Approach</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              A structured, personalized approach that combines traditional Islamic 
              scholarship with modern educational methods.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodology.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated p-6 relative"
              >
                <span className="absolute top-4 right-4 text-5xl font-bold text-primary/10">
                  {item.step}
                </span>
                <h3 className="font-semibold text-lg text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
