'use client';

import { createPreRegister } from '@/lib/actions/createPreRegister';
import { erroneousToast, successfulToast } from '@/lib/toasts';
import Button from '@/src/components/Button';
import CardWrapper from '@/src/components/CardWrapper';
import { Checkbox } from '@/src/components/DataInputs/Checkbox';
import { Input } from '@/src/components/DataInputs/Input';
import { Label } from '@/src/components/DataInputs/Label';
import Header from '@/src/components/Header';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  newsletter: z.boolean().default(true),
});

type FormData = z.infer<typeof schema>;

const PreRegister = (): React.ReactElement => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      newsletter: true,
    },
  });

  const onSubmit = async (data: FormData) => {
    const signUpResponse = await createPreRegister({
      email: data.email,
      signUpDate: Date.now(),
      newsletter: data.newsletter,
    });
    if (signUpResponse.success) {
      successfulToast(signUpResponse.message);
      reset();
    } else {
      erroneousToast(signUpResponse?.message);
    }
  };

  return (
    <CardWrapper
      className="h-[60vh] flex justify-center items-center w-full sm:w-3/4 md:w-2/3 lg:w-1/2"
      id="pre-register"
    >
      <div>
        <Header title="Be the first to know when we launch." />
        <p className="mb-6 text-sm">Sign up for early access and exclusive offers.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className="flex-1"
            />
            <Button
              type="submit"
              icon={ArrowRight}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              Pre Register
            </Button>
          </div>
          {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              aria-label="Subscribe to newsletter"
              {...register('newsletter')}
              defaultChecked={true}
            />
            <Label htmlFor="newsletter">Subscribe to newsletter</Label>
          </div>
          <p className="text-xs">We respect your privacy. Unsubscribe at any time.</p>
        </form>
      </div>
    </CardWrapper>
  );
};

export default PreRegister;
