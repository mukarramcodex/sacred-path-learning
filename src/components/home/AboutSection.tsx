import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight, BookOpen, Heart, Globe, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  { icon: BookOpen, title: "Quran-Centered", description: "Curriculum rooted in Quran & authentic Sunnah" },
  { icon: Heart, title: "Character Building", description: "Focus on spiritual growth and moral development" },
  { icon: Globe, title: "Global Reach", description: "Students from 50+ countries learning together" },
  { icon: Shield, title: "Safe Environment", description: "Secure, respectful, and inclusive community" },
];

const highlights = [
  "One-on-one sessions with certified scholars",
  "Flexible scheduling for global students",
  "Interactive curriculum with progress tracking",
  "Certificate upon course completion",
];

export const AboutSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-azure-soft/30 to-transparent"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-4">
              About IIQL
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Nurturing Hearts & Minds Through{" "}
              <span className="text-gradient">Islamic Education</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Founded on the principles of traditional Islamic scholarship, IIQL combines 
              time-honored teaching methods with modern technology to bring authentic 
              Islamic education to your doorstep. Our mission is to make quality 
              Quranic learning accessible to everyone, everywhere.
            </p>

            {/* Highlights */}
            <div className="space-y-3 mb-8">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </div>

            <Link to="/about">
              <Button className="btn-hero group">
                Learn More About Us
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-elevated p-6 group hover:shadow-elevated transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-azure-light/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
