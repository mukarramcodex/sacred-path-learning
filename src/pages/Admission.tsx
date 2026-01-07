import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  CheckCircle,
  Loader2,
  FileText,
  Users,
  Clock,
  Award,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const admissionSchema = z.object({
  student_name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  phone: z.string().min(10, "Please enter a valid phone number").max(20),
  age: z.number().min(5, "Minimum age is 5").max(100, "Please enter a valid age"),
  gender: z.string().min(1, "Please select gender"),
  country: z.string().min(2, "Please enter your country").max(100),
  course_interest: z.string().min(1, "Please select a course"),
  parent_name: z.string().optional(),
  parent_phone: z.string().optional(),
  parent_email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  previous_education: z.string().optional(),
  message: z.string().max(1000).optional(),
});

const courses = [
  "Quran Recitation Basics",
  "Tajweed Mastery",
  "Arabic for Beginners",
  "Islamic Studies Foundation",
  "Quran Memorization (Hifz)",
  "Hadith Studies",
  "Fiqh Essentials",
  "Kids Quran Program",
  "Advanced Arabic Grammar",
  "Seerah of the Prophet",
];

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany",
  "France", "Saudi Arabia", "UAE", "Malaysia", "Indonesia", "Pakistan",
  "India", "Bangladesh", "Egypt", "Turkey", "Nigeria", "South Africa", "Other"
];

const steps = [
  {
    step: 1,
    title: "Submit Application",
    description: "Fill out the admission form with your details and course preference."
  },
  {
    step: 2,
    title: "Assessment",
    description: "Our team reviews your application and schedules an assessment if needed."
  },
  {
    step: 3,
    title: "Confirmation",
    description: "Receive your admission confirmation and course schedule."
  },
  {
    step: 4,
    title: "Start Learning",
    description: "Begin your journey of Islamic knowledge with IIQL."
  },
];

const Admission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showParentFields, setShowParentFields] = useState(false);
  const [formData, setFormData] = useState({
    student_name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    country: "",
    course_interest: "",
    parent_name: "",
    parent_phone: "",
    parent_email: "",
    previous_education: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Show parent fields if age is under 18
    if (name === "age") {
      const age = parseInt(value);
      setShowParentFields(!isNaN(age) && age < 18);
    }
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const dataToValidate = {
      ...formData,
      age: parseInt(formData.age) || 0,
      parent_email: formData.parent_email || undefined,
    };

    const result = admissionSchema.safeParse(dataToValidate);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("admissions").insert({
        student_name: formData.student_name,
        email: formData.email,
        phone: formData.phone,
        age: parseInt(formData.age),
        gender: formData.gender,
        country: formData.country,
        course_interest: formData.course_interest,
        parent_name: formData.parent_name || null,
        parent_phone: formData.parent_phone || null,
        parent_email: formData.parent_email || null,
        previous_education: formData.previous_education || null,
        message: formData.message || null,
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Your admission application has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Admission
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Begin Your <span className="text-gradient">Learning Journey</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Join IIQL and embark on a transformative journey of Islamic education. 
              Fill out the admission form below to get started.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Admission Process Steps */}
      <section className="py-12 bg-background border-b border-border">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-azure-light flex items-center justify-center text-primary-foreground font-bold flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-[52px] w-[calc(100%-52px)] h-px bg-border">
                    <ArrowRight className="absolute -right-2 -top-2 w-4 h-4 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Admission Form */}
      <section className="section-padding bg-muted/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 card-elevated p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-azure-light/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Admission Form</h2>
                  <p className="text-sm text-muted-foreground">Fill in your details to apply</p>
                </div>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Application Submitted!</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Thank you for applying to IIQL. We've received your application and will 
                    contact you within 2-3 business days.
                  </p>
                  <Button onClick={() => { setIsSubmitted(false); setFormData({ student_name: "", email: "", phone: "", age: "", gender: "", country: "", course_interest: "", parent_name: "", parent_phone: "", parent_email: "", previous_education: "", message: "" }); }} variant="outline">
                    Submit Another Application
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Student Information */}
                  <div>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      Student Information
                    </h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="student_name">Full Name *</Label>
                        <Input
                          id="student_name"
                          name="student_name"
                          value={formData.student_name}
                          onChange={handleChange}
                          placeholder="Student's full name"
                          className={errors.student_name ? "border-destructive" : ""}
                        />
                        {errors.student_name && <p className="text-sm text-destructive">{errors.student_name}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="student@email.com"
                          className={errors.email ? "border-destructive" : ""}
                        />
                        {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (234) 567-890"
                          className={errors.phone ? "border-destructive" : ""}
                        />
                        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="age">Age *</Label>
                        <Input
                          id="age"
                          name="age"
                          type="number"
                          min="5"
                          max="100"
                          value={formData.age}
                          onChange={handleChange}
                          placeholder="Enter age"
                          className={errors.age ? "border-destructive" : ""}
                        />
                        {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender *</Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, gender: value }));
                            if (errors.gender) setErrors((prev) => ({ ...prev, gender: "" }));
                          }}
                        >
                          <SelectTrigger className={errors.gender ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && <p className="text-sm text-destructive">{errors.gender}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, country: value }));
                            if (errors.country) setErrors((prev) => ({ ...prev, country: "" }));
                          }}
                        >
                          <SelectTrigger className={errors.country ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country} value={country}>{country}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.country && <p className="text-sm text-destructive">{errors.country}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Parent/Guardian Information (shown if age < 18) */}
                  {showParentFields && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="border-t border-border pt-6"
                    >
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        Parent/Guardian Information
                      </h3>
                      <div className="grid md:grid-cols-3 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="parent_name">Parent Name</Label>
                          <Input
                            id="parent_name"
                            name="parent_name"
                            value={formData.parent_name}
                            onChange={handleChange}
                            placeholder="Parent's full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parent_phone">Parent Phone</Label>
                          <Input
                            id="parent_phone"
                            name="parent_phone"
                            value={formData.parent_phone}
                            onChange={handleChange}
                            placeholder="+1 (234) 567-890"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="parent_email">Parent Email</Label>
                          <Input
                            id="parent_email"
                            name="parent_email"
                            type="email"
                            value={formData.parent_email}
                            onChange={handleChange}
                            placeholder="parent@email.com"
                            className={errors.parent_email ? "border-destructive" : ""}
                          />
                          {errors.parent_email && <p className="text-sm text-destructive">{errors.parent_email}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Course Selection */}
                  <div className="border-t border-border pt-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Course Selection
                    </h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="course_interest">Preferred Course *</Label>
                        <Select
                          value={formData.course_interest}
                          onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, course_interest: value }));
                            if (errors.course_interest) setErrors((prev) => ({ ...prev, course_interest: "" }));
                          }}
                        >
                          <SelectTrigger className={errors.course_interest ? "border-destructive" : ""}>
                            <SelectValue placeholder="Select a course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course} value={course}>{course}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.course_interest && <p className="text-sm text-destructive">{errors.course_interest}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="previous_education">Previous Islamic Education</Label>
                        <Input
                          id="previous_education"
                          name="previous_education"
                          value={formData.previous_education}
                          onChange={handleChange}
                          placeholder="e.g., Completed Quran reading"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="border-t border-border pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Message (Optional)</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Any specific requirements or questions?"
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full btn-hero py-3">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <GraduationCap className="w-5 h-5" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Why Join */}
              <div className="card-elevated p-6">
                <h3 className="font-semibold text-lg text-foreground mb-4">Why Join IIQL?</h3>
                <ul className="space-y-3">
                  {[
                    { icon: Award, text: "Certified Islamic Scholars" },
                    { icon: Clock, text: "Flexible Class Timings" },
                    { icon: Users, text: "One-on-One Sessions" },
                    { icon: GraduationCap, text: "Recognized Certificates" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <item.icon className="w-5 h-5 text-primary" />
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Need Help */}
              <div className="card-elevated p-6 bg-gradient-to-br from-primary/5 to-azure-light/5">
                <h3 className="font-semibold text-lg text-foreground mb-2">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our admission team is here to assist you with any questions.
                </p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center gap-2">
                    <span className="text-primary">📧</span>
                    admissions@iiql.edu
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-primary">📞</span>
                    +1 (234) 567-890
                  </p>
                </div>
              </div>

              {/* Free Trial */}
              <div className="card-elevated p-6 bg-gradient-to-br from-azure-soft to-secondary">
                <h3 className="font-semibold text-lg text-foreground mb-2">Free Trial Class</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Not sure yet? Book a free trial class to experience our teaching methodology.
                </p>
                <Button variant="outline" className="w-full">
                  Book Free Trial
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admission;
