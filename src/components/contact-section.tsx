
'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { submitContactForm, FormState } from '@/app/actions';
import { useToast } from "@/hooks/use-toast"
import * as lucide from 'lucide-react';

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { contactInfo, socialLinks } from '@/lib/data';
import { Send, Loader2 } from 'lucide-react';
import Link from 'next/link';

const socialIcons: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  LinkedIn: (props) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
  Medium: (props) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Medium</title>
      <path d="M7.45 18.23c0 .54-.44.98-.98.98H2.98c-.54 0-.98-.44-.98-.98V6.77c0-.54.44-.98.98-.98h3.49c.54 0 .98.44.98.98v11.46zm6.01 0c0 .54-.44.98-.98.98h-3.5c-.54 0-.98-.44-.98-.98V9.75c0-.54.44-.98.98-.98h3.5c.54 0 .98.44.98.98v8.48zm5.99 0c0 .54-.44.98-.98.98h-3.49c-.54 0-.98-.44-.98-.98v-5.5c0-.54.44-.98.98-.98h3.49c.54 0 .98.44.98.98v5.5z" />
    </svg>
  ),
  X: (props) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>X</title>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  ),
  Instagram: (props) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>Instagram</title>
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.314.935 20.644.522 19.854.217c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.06 1.17-.249 1.805-.413 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.36-2.227.413-1.266.057-1.646.07-4.85.07s-3.585-.015-4.85-.074c-1.17-.06-1.805-.249-2.227-.413-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.36-1.057-.413-2.227-.057-1.266-.07-1.646-.07-4.85s.015-3.585.07-4.85c.06-1.17.249-1.805.413-2.227.217-.562.477.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.057.36 2.227-.413C8.415 2.177 8.797 2.16 12 2.16zm0 5.482A4.356 4.356 0 1 0 12 16.355a4.356 4.356 0 0 0 0-8.713zm0 7.213a2.857 2.857 0 1 1 0-5.714 2.857 2.857 0 0 1 0 5.714zM16.804 4.156a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88z" />
    </svg>
  ),
  ResearchGate: (props) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <title>ResearchGate</title>
      <path d="M18.17 18.173a.75.75 0 0 0-.529 1.28L19.46 21.27a.75.75 0 0 0 1.28-.53l-1.29-3.095a.75.75 0 0 0-.751-.528l-.029.006zm-5.74-12.44a.75.75 0 0 0-1.06 1.06l3.35 3.351a.75.75 0 0 0 1.06-1.06l-3.35-3.35zm-2.83 5.66a.75.75 0 0 0-1.06 1.06l1.201 1.202a.75.75 0 0 0 1.06-1.06l-1.2-1.202zM12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm4.24 18.242a5.99 5.99 0 0 1-5.99 1.76 5.99 5.99 0 0 1-4.24-4.24 5.99 5.99 0 0 1 1.76-5.99c1.07-1.07 2.49-1.76 4.01-1.76h.23c1.65 0 3.16.76 4.22 2a6.01 6.01 0 0 1 1.77 5.99c-.58 2.2-2.58 3.9-4.76 4.24z" />
    </svg>
  ),
};

const contactIconMap: { [key: string]: lucide.LucideIcon } = {
    Mail: lucide.Mail,
    Phone: lucide.Phone,
    MapPin: lucide.MapPin,
};

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  designation: z.string().min(2, "Designation must be at least 2 characters."),
  enquiryType: z.string({ required_error: "Please select a reason for your enquiry."}).min(1, "Please select a reason for your enquiry."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button type="submit" disabled={isSubmitting} className="w-full">
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Sending...
        </>
      ) : (
        <>
          Send Message
          <Send className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const initialState: FormState = { message: '', status: 'idle' };
  const [state, formAction] = useFormState(submitContactForm, initialState);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      designation: "",
      enquiryType: "",
      message: "",
    },
  })
  
  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Success!",
        description: state.message,
      });
      form.reset();
    } else if (state.status === 'error') {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, form]);

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    // Manually set form data from react-hook-form state
    formData.set('name', data.name);
    formData.set('email', data.email);
    if(data.phone) formData.set('phone', data.phone);
    formData.set('designation', data.designation);
    formData.set('enquiryType', data.enquiryType);
    formData.set('message', data.message);
    formAction(formData);
  };

  return (
    <section id="contact" className="py-6 md:py-8 bg-card scroll-mt-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">Get In Touch</h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            Have a project in mind or just want to say hi? I'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>Fill out the form below and I'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                    <form
                      ref={formRef}
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="+1-555-555-5555" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="designation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Designation</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Designation" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="enquiryType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Reason for Enquiry</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a reason" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Requesting for LOR">Requesting for LOR</SelectItem>
                                <SelectItem value="Requesting for SOP">Requesting for SOP</SelectItem>
                                <SelectItem value="Requesting for Resume">Requesting for Resume</SelectItem>
                                <SelectItem value="Requesting for Certificate info">Requesting for Certificate info</SelectItem>
                                <SelectItem value="Inviting for an interview">Inviting for an interview</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell me about your project or inquiry..."
                                className="min-h-[150px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <SubmitButton isSubmitting={form.formState.isSubmitting} />
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = contactIconMap[info.icon as keyof typeof contactIconMap] || lucide.Star;
                  return (
                    <div key={index} className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-primary" />
                      <span className="text-muted-foreground">{info.text}</span>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Social Media</CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4">
                    {socialLinks.map((social) => {
                      const Icon = socialIcons[social.name];
                      return (
                         <Button key={social.name} asChild size="icon" variant="ghost" className="rounded-full">
                             <Link href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                                 <Icon className="h-6 w-6 fill-current" />
                             </Link>
                         </Button>
                      );
                    })}
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
