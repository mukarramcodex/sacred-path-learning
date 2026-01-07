import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTASection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-primary via-azure-dark to-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 islamic-pattern opacity-10"></div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-azure-light/20 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.2 }}
        viewport={{ once: true }}
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-primary-foreground/10 blur-3xl"
      />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Arabic Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-arabic text-2xl md:text-3xl text-primary-foreground/90 mb-4"
          >
            اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-primary-foreground/70 text-sm mb-8"
          >
            "Read in the name of your Lord who created" - Surah Al-Alaq (96:1)
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6"
          >
            Begin Your Journey of <br className="hidden md:block" />
            Quranic Learning Today
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto"
          >
            Join thousands of students worldwide who are transforming their lives 
            through authentic Islamic education.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Link to="/admission">
              <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-6 text-lg font-semibold rounded-xl shadow-elevated group">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg font-semibold rounded-xl"
              >
                Contact Us
              </Button>
            </Link>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-primary-foreground/80"
          >
            <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Phone className="w-5 h-5" />
              <span>+1 (234) 567-890</span>
            </a>
            <a href="mailto:info@iiql.edu" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
              <Mail className="w-5 h-5" />
              <span>info@iiql.edu</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
