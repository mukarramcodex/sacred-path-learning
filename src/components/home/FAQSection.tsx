import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What courses does IIQL offer?",
    answer: "IIQL offers a comprehensive range of Islamic courses including Quran Recitation, Tajweed, Arabic Language, Islamic Studies, Hadith Studies, Fiqh, and courses for children. Each course is designed with different levels from beginner to advanced."
  },
  {
    question: "How are the classes conducted?",
    answer: "All classes are conducted online via our secure video platform. You can choose between one-on-one sessions for personalized attention or group classes for a more collaborative learning experience. All sessions are interactive with real-time audio and video."
  },
  {
    question: "Who are the teachers at IIQL?",
    answer: "Our teachers are certified scholars with extensive qualifications from renowned Islamic institutions. Many hold ijazahs (certifications) in Quran and Islamic sciences, with years of teaching experience. All teachers undergo thorough vetting and training."
  },
  {
    question: "What are the class timings?",
    answer: "We offer flexible scheduling to accommodate students from different time zones worldwide. You can choose class times that suit your schedule, whether morning, afternoon, or evening. Our scheduling system operates 24/7."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a free trial class for new students to experience our teaching methodology and meet our teachers. This helps you make an informed decision before enrolling in any course."
  },
  {
    question: "What age groups do you teach?",
    answer: "We welcome students of all ages! We have specialized courses for children (ages 5+), teenagers, and adults. Our teachers are trained to adapt their teaching style based on the student's age and learning needs."
  },
  {
    question: "Do you provide certificates?",
    answer: "Yes, upon successful completion of any course, students receive a certificate from IIQL. For Quran courses, students can also earn ijazah (chain of transmission) certifications upon reaching the required proficiency level."
  },
  {
    question: "What is the fee structure?",
    answer: "Our fees vary based on the course type, duration, and whether you choose one-on-one or group sessions. We offer competitive pricing and flexible payment plans. Contact us for detailed pricing information."
  },
];

export const FAQSection = () => {
  return (
    <section className="section-padding bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 islamic-pattern opacity-30"></div>

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
            FAQs
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our courses, teachers, and 
            learning experience at IIQL.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="card-elevated px-6 border-none"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
