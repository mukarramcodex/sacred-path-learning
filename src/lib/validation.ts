import { z } from 'zod';

// Course validation schema
export const courseSchema = z.object({
  title: z.string()
    .min(1, 'Title is required')
    .max(200, 'Title must be less than 200 characters')
    .trim(),
  description: z.string()
    .max(5000, 'Description must be less than 5000 characters')
    .nullable()
    .optional(),
  short_description: z.string()
    .max(500, 'Short description must be less than 500 characters')
    .nullable()
    .optional(),
  category: z.string()
    .min(1, 'Category is required')
    .max(100, 'Category must be less than 100 characters')
    .trim(),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  price: z.number()
    .min(0, 'Price cannot be negative')
    .max(100000, 'Price seems unreasonably high'),
  original_price: z.number()
    .min(0, 'Original price cannot be negative')
    .max(100000, 'Original price seems unreasonably high')
    .nullable()
    .optional(),
  duration_hours: z.number()
    .int('Duration must be a whole number')
    .min(0, 'Duration cannot be negative')
    .max(10000, 'Duration seems unreasonably high'),
  total_lessons: z.number()
    .int('Total lessons must be a whole number')
    .min(0, 'Total lessons cannot be negative')
    .max(10000, 'Total lessons seems unreasonably high'),
  teacher_id: z.string().uuid().nullable().optional(),
  is_published: z.boolean(),
  is_featured: z.boolean(),
  thumbnail_url: z.string().url().nullable().optional().or(z.literal('')).or(z.null()),
});

// Teacher validation schema
export const teacherSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  title: z.string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters')
    .trim(),
  specialization: z.string()
    .min(1, 'Specialization is required')
    .max(200, 'Specialization must be less than 200 characters')
    .trim(),
  bio: z.string()
    .max(2000, 'Biography must be less than 2000 characters')
    .nullable()
    .optional(),
  avatar_url: z.string().url().nullable().optional().or(z.literal('')).or(z.null()),
  email: z.union([
    z.string().email('Invalid email format').max(255, 'Email must be less than 255 characters'),
    z.literal(''),
    z.null()
  ]).nullable().optional(),
  phone: z.union([
    z.string().max(30, 'Phone number must be less than 30 characters').regex(/^[\d\s+\-()]*$/, 'Phone number contains invalid characters'),
    z.literal(''),
    z.null()
  ]).nullable().optional(),
  experience_years: z.number()
    .int('Experience years must be a whole number')
    .min(0, 'Experience years cannot be negative')
    .max(100, 'Experience years seems unreasonably high'),
  is_active: z.boolean(),
});

// Admission status validation schema
export const admissionStatusSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected', 'reviewed'], {
    errorMap: () => ({ message: 'Invalid status value' })
  }),
});

// Type exports
export type CourseFormData = z.infer<typeof courseSchema>;
export type TeacherFormData = z.infer<typeof teacherSchema>;
export type AdmissionStatusData = z.infer<typeof admissionStatusSchema>;

// Validation result type
export type ValidationResult<T> = 
  | { success: true; data: T; errors?: never }
  | { success: false; errors: string[]; data?: never };

// Validation helper function
export function validateFormData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);
  if (result.success) {
    return { success: true, data: result.data };
  }
  const errors = result.error.errors.map(err => err.message);
  return { success: false, errors };
}
