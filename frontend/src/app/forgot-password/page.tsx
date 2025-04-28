'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Link from 'next/link'
import GradientBlobs from '@/components/common/GradientBlobs'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

// Schema for email validation
const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

export default function ForgotPasswordPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Import the forgotPassword function
      const { forgotPassword } = await import('@/lib/auth')
      
      // Send the password reset request
      await forgotPassword({ email: values.email })
      
      // Show success message
      toast.success('Password reset email sent. Please check your inbox.')
    } catch (error) {
      console.error('Error sending password reset email', error)
      toast.error('Failed to send password reset email. Please try again.')
    }
  }

  return (
    <div className="relative isolate overflow-hidden flex min-h-svh flex-col items-center justify-center bg-slate-950 p-6 md:p-10">
      {/* Import gradient blobs */}
      <GradientBlobs />
      
      <div className="w-full max-w-sm relative z-10">
        <Card>
          <CardHeader>
            <CardTitle>Forgot Password</CardTitle>
            <CardDescription>
              Enter your email address to receive a password reset link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4">
                  {/* Email Field */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-2">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            id="email"
                            placeholder="johndoe@mail.com"
                            type="email"
                            autoComplete="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Send Reset Link
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
  )
}