"use server";

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export type FormState = {
  message: string;
  status: 'idle' | 'success' | 'error';
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: firstError || 'Invalid data provided. Please check the form.',
      status: 'error',
    };
  }

  // Here you would typically send an email, save to a database, etc.
  // For this example, we'll just log it and simulate a success response.
  console.log('Contact form submission received:', validatedFields.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    message: "Thank you for your message! I'll get back to you soon.",
    status: 'success',
  };
}

const lorRequestSchema = z.object({
  requesterName: z.string().min(2, "Name must be at least 2 characters."),
  requesterEmail: z.string().email("Please enter a valid email address."),
  requesterPhone: z.string().min(10, "Please enter a valid phone number."),
  requesterDesignation: z.string().min(2, "Designation must be at least 2 characters."),
  requesterOrganization: z.string().min(2, "Organization must be at least 2 characters."),
  referenceEmail: z.string().email(),
});

export async function submitLorRequest(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = lorRequestSchema.safeParse({
    requesterName: formData.get('requesterName'),
    requesterEmail: formData.get('requesterEmail'),
    requesterPhone: formData.get('requesterPhone'),
    requesterDesignation: formData.get('requesterDesignation'),
    requesterOrganization: formData.get('requesterOrganization'),
    referenceEmail: formData.get('referenceEmail'),
  });

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: firstError || 'Invalid data provided. Please check the form.',
      status: 'error',
    };
  }

  console.log('LOR request received:', validatedFields.data);

  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    message: `LOR request sent successfully. It will be shared with ${validatedFields.data.requesterEmail}.`,
    status: 'success',
  };
}
