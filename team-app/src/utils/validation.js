import { z } from "zod";

// Zod schema for Step 1: Personal Details
export const personalDetailsSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .nonempty("Name is required"),
  email: z.string().email("Invalid email format").nonempty("Email is required"),
  mobile: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .nonempty("Mobile number is required"),
});

// Zod schema for Step 2: KYC Details
export const kycDetailsSchema = z.object({
  aadhar: z
    .string()
    .transform((val) => val.replace(/\s/g, "")) // Remove spaces before validating
    .refine((val) => /^\d{12}$/.test(val), "Aadhaar must be exactly 12 digits"),
  pan: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN format (ABCDE1234F)")
    .nonempty("PAN number is required"),
});

// Zod schema for Step 3: Security
export const securitySchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
      "Include uppercase, lowercase, number & special character",
    ),
});

// Combined schema for full form validation or API submission
export const registrationSchema = z.object({
  ...personalDetailsSchema.shape,
  ...kycDetailsSchema.shape,
  ...securitySchema.shape,
});

/**
 * Validates data against a specific zod schema.
 * @param {Object} data - The form data to validate
 * @param {z.ZodSchema} schema - The Zod schema to validate against
 * @returns {Object} An object containing field errors, or an empty object if valid.
 */
export const validateWithSchema = (data, schema) => {
  const result = schema.safeParse(data);

  if (result.success) {
    return {};
  }

  // Format Zod errors into a simple key-value object
  const errors = {};
  result.error.issues.forEach((issue) => {
    errors[issue.path[0]] = issue.message;
  });

  return errors;
};
