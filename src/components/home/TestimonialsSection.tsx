import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Ahmed",
    location: "United Kingdom",
    rating: 5,
    text: "IIQL has transformed my relationship with the Quran. The teachers are patient, knowledgeable, and truly care about their students' progress.",
    avatar: "S"
  },
  {
    id: 2,
    name: "Omar Hassan",
    location: "United States",
    rating: 5,
    text: "As a busy professional, the flexible scheduling made it possible for me to learn Tajweed. The one-on-one sessions are incredibly valuable.",
    avatar: "O"
  },
  {
    id: 3,
    name: "Amina Yusuf",
    location: "Canada",
    rating: 5,
    text: "My children love their Quran classes! The teachers make learning fun while maintaining the reverence for sacred knowledge.",
    avatar: "A"
  },
  {
    id: 4,
    name: "Ahmed Malik",
    location: "Australia",
    rating: 5,
    text: "The Arabic course opened up a new world for me. I can now understand the Quran in its original language. Truly life-changing!",
    avatar: "A"
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-azure-soft/30 to-transparent blur-3xl"></div>

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
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our{" "}
            <span className="text-gradient">Students Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from our global community of students who have experienced the 
            transformative power of learning with IIQL.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-elevated p-8 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/10">
                <Quote className="w-12 h-12" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                ))}
              </div>

              {/* Text */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-azure-light flex items-center justify-center text-lg font-bold text-primary-foreground">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
