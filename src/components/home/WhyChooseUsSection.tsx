import { motion } from "framer-motion";
import { 
  Monitor, 
  Users, 
  Award, 
  Clock, 
  Globe, 
  Heart,
  BookOpen,
  Shield
} from "lucide-react";

const features = [
  {
    icon: Monitor,
    title: "Live Online Classes",
    description: "Interactive sessions with real-time Q&A and personalized attention from teachers."
  },
  {
    icon: Users,
    title: "One-on-One Learning",
    description: "Private sessions tailored to your pace and learning style for maximum benefit."
  },
  {
    icon: Award,
    title: "Certified Curriculum",
    description: "Recognized certification upon completion, designed by expert Islamic scholars."
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Choose timings that work for you across different time zones worldwide."
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connect with fellow students from over 50 countries around the world."
  },
  {
    icon: Shield,
    title: "Safe Environment",
    description: "Secure, respectful, and inclusive learning space for all ages and genders."
  },
  {
    icon: BookOpen,
    title: "Comprehensive Resources",
    description: "Access to recorded lessons, study materials, and progress tracking tools."
  },
  {
    icon: Heart,
    title: "Spiritual Growth",
    description: "Focus on both knowledge and character development guided by Islamic values."
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
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
            Why Choose IIQL?
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            The IIQL{" "}
            <span className="text-gradient">Difference</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We combine traditional Islamic scholarship with modern teaching methods 
            to deliver an exceptional learning experience.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="card-elevated p-6 group hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-azure-light/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
