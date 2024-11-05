'use client';

import CardWrapper from '@/src/components/CardWrapper';
import React, { ReactElement, useState } from 'react';
import Form from '@/src/components/Form';
import Header from '@/src/components/Header';
import sendEmail from '@/lib/actions/sendEmail';
import { erroneousToast, successfulToast } from '@/lib/toasts';
import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type SendEmailData = z.infer<typeof contactFormSchema>;

const ContactUs = (): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const formValues = {
    name: {
      initialValue: '',
      label: 'Name',
      type: 'text',
      placeholder: 'Your name',
    },
    email: {
      initialValue: '',
      label: 'Email',
      type: 'email',
      placeholder: 'Your email',
    },
    message: {
      initialValue: '',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Your message',
    },
  };

  const handleSubmit = async (data: Record<string, string>) => {
    setIsLoading(true);
    try {
      const response = await sendEmail({
        name: data.name,
        email: data.email,
        message: data.message,
      });

      if (response.ok) {
        successfulToast('Message sent successfully');
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      erroneousToast('Failed to send message');
      setFormError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="bg-gradient-radial absolute inset-0 rotate-180 scale-x-[-1] bg-line-mask bg-cover bg-center bg-no-repeat" />
      <CardWrapper className="relative z-10 flex h-full flex-col justify-center">
        <Header size="xl" className="mb-8" title="Contact Us" />
        {isSubmitted ? (
          <div className="text-center">
            <h3 className="text-xl font-semibold">Thank you for your message!</h3>
            <p className="mt-2">We'll get back to you as soon as possible.</p>
          </div>
        ) : (
          <Form
            formValues={formValues}
            submitButton={{
              label: 'Send Message',
              className: 'w-full',
              loading: isLoading,
            }}
            submitFn={handleSubmit}
            formError={formError}
            resetFormOnbSubmit
            validationSchema={contactFormSchema}
          />
        )}
      </CardWrapper>
    </div>
  );
};

export default ContactUs;
