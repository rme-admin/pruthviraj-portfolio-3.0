'use client';

import React, { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { submitContactForm, FormState } from '@/app/actions';
import { useToast } from "@/hooks/use-toast"

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
import { contactInfo } from '@/lib/data';
import { Send, Loader2 } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
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
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <info.icon className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{info.text}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
