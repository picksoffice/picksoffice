'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Link from 'next/link';
import GradientBlobs from '@/components/common/GradientBlobs';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PasswordInput } from '@/components/ui/password-input';

// Schema for password validation
const formSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .regex(/[a-zA-Z0-9]/, { message: 'Password must be alphanumeric' }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export default function ResetPasswordPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Get the reset code from the URL
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');

      if (!code) {
        throw new Error('Reset code is missing');
      }

      // Manual direct API call to bypass potential issues with the auth library
      const response = await fetch('http://localhost:1337/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          password: values.password,
          passwordConfirmation: values.confirmPassword,
        }),
      });

      if (!response.ok) {
        // Get the error message from response
        const errorData = await response.json();
        console.error('Reset password API error:', errorData);

        if (errorData.error && errorData.error.message) {
          throw new Error(errorData.error.message);
        } else {
          throw new Error(`API error: ${response.status}`);
        }
      }

      // Show success message
      toast.success('Password reset successful. You can now log in with your new password.');

      // Redirect to login page after a short delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error: any) {
      console.error('Error resetting password:', error);

      if (
        error.message &&
        (error.message.includes('expired') || error.message.includes('invalid'))
      ) {
        toast.error('Password reset link has expired or is invalid. Please request a new one.');
      } else {
        toast.error(`Failed to reset password: ${error.message || 'Unknown error'}`);
      }
    }
  }

  return (
    <div className="relative isolate overflow-hidden flex min-h-svh flex-col items-center justify-center bg-slate-950 p-6 md:p-10">
      {/* Import gradient blobs */}
      <GradientBlobs />

      <div className="w-full max-w-sm relative z-10">
        <Card>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Enter your new password to reset your password.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4">
                  {/* New Password Field */}
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="password">New Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="password"
                            placeholder="******"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Confirm Password Field */}
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                        <FormControl>
                          <PasswordInput
                            id="confirmPassword"
                            placeholder="******"
                            autoComplete="new-password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" color="blue">
                    Reset Password
                  </Button>

                  <div className="text-center mt-4">
                    <Link href="/login" className="text-sm text-sky-400 hover:text-sky-300">
                      Back to Login
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
