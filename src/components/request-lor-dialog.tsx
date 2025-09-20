'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { submitLorRequest, FormState } from '@/app/actions';
import { useToast } from "@/hooks/use-toast"
import type { Reference } from '@/lib/data';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2, Send } from 'lucide-react';

const lorRequestSchema = z.object({
  requesterName: z.string().min(2, "Name must be at least 2 characters."),
  requesterEmail: z.string().email("Please enter a valid email address."),
  requesterPhone: z.string().min(10, "Please enter a valid phone number."),
  requesterDesignation: z.string().min(2, "Designation must be at least 2 characters."),
  requesterOrganization: z.string().min(2, "Organization must be at least 2 characters."),
});

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
  return (
    <Button type="submit" disabled={isSubmitting} className="w-full">
      {isSubmitting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Requesting...
        </>
      ) : (
        <>
          Request LOR
          <Send className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  );
}


export default function RequestLorDialog({ reference }: { reference: Reference }) {
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const initialState: FormState = { message: '', status: 'idle' };
  const [state, formAction] = useFormState(submitLorRequest, initialState);

  const form = useForm<z.infer<typeof lorRequestSchema>>({
    resolver: zodResolver(lorRequestSchema),
    defaultValues: {
      requesterName: "",
      requesterEmail: "",
      requesterPhone: "",
      requesterDesignation: "",
      requesterOrganization: ""
    },
  })
  
  useEffect(() => {
    if (state.status === 'success') {
      toast({
        title: "Success!",
        description: state.message,
      });
      form.reset();
      setOpen(false);
    } else if (state.status === 'error') {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, form]);

  const onSubmit = (data: z.infer<typeof lorRequestSchema>) => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    // Manually set form data from react-hook-form state
    formData.set('requesterName', data.requesterName);
    formData.set('requesterEmail', data.requesterEmail);
    formData.set('requesterPhone', data.requesterPhone);
    formData.set('requesterDesignation', data.requesterDesignation);
    formData.set('requesterOrganization', data.requesterOrganization);
    // Add the reference's email to the form data
    formData.set('referenceEmail', reference.email);
    formAction(formData);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Request LOR</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Letter of Recommendation</DialogTitle>
          <DialogDescription>
            Requesting from {reference.fullName}. The LOR will be sent to the email you provide below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            ref={formRef}
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="requesterName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requesterEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requesterPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1-555-555-5555" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requesterDesignation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Designation</FormLabel>
                  <FormControl>
                    <Input placeholder="Hiring Manager" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="requesterOrganization"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Organization</FormLabel>
                  <FormControl>
                    <Input placeholder="Tech Company Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Cancel
                    </Button>
                </DialogClose>
                <SubmitButton isSubmitting={form.formState.isSubmitting} />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
