import { z } from "zod";

export const ContactSchema = z.object({
  fullName: z.string().min(1, "Name is required"),

  email: z.string().email("Invalid email address").min(1, "Email is required"),

  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\d+$/.test(val), {
      message: "Contact No. must contain only digits",
    }),

  addressLine1: z.string().min(1, "Address Line 1 is required"),
  addressLine2: z.string().optional(),

  state: z.string().optional(),

  pincode: z
    .string()
    .min(1, "Pincode is required")
    .refine((val) => /^\d{6}$/.test(val), {
      message: "Pincode must be a 6-digit number",
    }),
});

export type ContactFormData = z.infer<typeof ContactSchema>;

export const initialContactDetails: ContactFormData = {
  fullName: "",
  email: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  state: "",
  pincode: "",
};
