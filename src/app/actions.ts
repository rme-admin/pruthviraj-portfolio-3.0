'use server';

import { z } from 'zod';

// This is the shape of the state object returned by both actions
export type FormState = {
  message: string;
  status: 'idle' | 'success' | 'error';
};

// =================================================================
// GENERAL CONTACT FORM ACTION (API INTEGRATED)
// =================================================================

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  designation: z.string().min(2, "Designation must be at least 2 characters."),
  reason: z.string().min(1, "Please select a reason for your enquiry."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    designation: formData.get('designation'),
    reason: formData.get('enquiryType'), // This name comes from your <Select> field
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Invalid form data. Please check your inputs.',
      status: 'error',
    };
  }
  
  try {
    const apiUrl = `${process.env.API_BASE_URL}/api/enquiries`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validatedFields.data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'An error occurred on the server.');
    }
    
    return {
      message: result.message,
      status: 'success',
    };

  } catch (error: any) {
    return {
      message: error.message || 'An unexpected error occurred.',
      status: 'error',
    };
  }
}


// =================================================================
// LOR REQUEST ACTION (API INTEGRATED)
// =================================================================

// --- LOR REQUEST ACTION (API INTEGRATED) ---

const lorRequestSchema = z.object({
  requesterName: z.string().min(2, "Your name is required."),
  requesterEmail: z.string().email("Your email is required."),
  requesterPhone: z.string().min(10, "Your phone number is required."),
  requesterDesignation: z.string().min(2, "Your designation is required."),
  requesterOrganization: z.string().min(2, "Your organization is required."),
  referenceEmail: z.string().email("The reference's email is required."),
});

export async function submitLorRequest(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {

  // CORRECTED: Removed the "1_" prefix to match the actual form field names
  const validatedFields = lorRequestSchema.safeParse({
    requesterName: formData.get('requesterName'),
    requesterEmail: formData.get('requesterEmail'),
    requesterPhone: formData.get('requesterPhone'),
    requesterDesignation: formData.get('requesterDesignation'),
    requesterOrganization: formData.get('requesterOrganization'),
    referenceEmail: formData.get('referenceEmail'),
  });

  if (!validatedFields.success) {
    console.error("LOR Validation Failed:", validatedFields.error.flatten().fieldErrors);
    return { message: 'Invalid LOR request data. Please check all fields.', status: 'error' };
  }

  // --- TRANSFORMATION STEP ---
  const enquiryPayload = {
    name: validatedFields.data.requesterName,
    email: validatedFields.data.requesterEmail,
    designation: validatedFields.data.requesterDesignation,
    reason: "LOR Request", // The 'reason' is fixed for this form
    message: `
      Letter of Recommendation Request Details:
      ----------------------------------------
      Reference Person's Email: ${validatedFields.data.referenceEmail}
      Requester's Organization: ${validatedFields.data.requesterOrganization}
      Requester's Contact Phone: ${validatedFields.data.requesterPhone}
    `,
  };

  try {
    const apiUrl = `${process.env.API_BASE_URL}/api/enquiries`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enquiryPayload),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'API Error.');

    return { message: "Your LOR request has been successfully submitted.", status: 'success' };

  } catch (error: any) {
    return { message: error.message || 'An unexpected error occurred.', status: 'error' };
  }
}