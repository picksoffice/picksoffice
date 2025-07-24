'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useAuth } from '@/lib/AuthContext';
import { LoginCredentials } from '@/lib/auth';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const [formData, setFormData] = useState<LoginCredentials>({
    identifier: '',
    password: '',
  });
  const [formError, setFormError] = useState<string | null>(null);
  const { login, loading, error } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.identifier || !formData.password) {
      setFormError('Please enter both email and password');
      return;
    }

    try {
      await login(formData);
      router.push('/'); // Redirect to home page after successful login
    } catch (error) {
      // Error is already handled by AuthContext
      console.error('Login error:', error);
    }
  };

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden max-w-md w-full mx-auto">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-gray-100">Welcome back</h1>
                <p className="text-balance text-gray-400">Login to your PicksOffice account</p>
              </div>
              {(formError || error) && (
                <div className="bg-red-900/20 text-red-400 p-3 rounded-md text-sm">
                  {formError || error}
                </div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="identifier">Email</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="email"
                  placeholder="m@example.com"
                  value={formData.identifier}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm text-sky-300 underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading} isLoading={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-slate-700/30">
                <span className="relative z-10 px-2 text-gray-400">Or sign in with</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="secondary"
                  className="w-full flex items-center justify-center py-2.5"
                  type="button"
                  onClick={() => {
                    import('@/lib/auth').then(({ socialLogin }) => {
                      socialLogin('apple');
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 mr-2"
                  >
                    <path
                      d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                      fill="currentColor"
                    />
                  </svg>
                  Apple
                </Button>
                <Button
                  variant="secondary"
                  className="w-full flex items-center justify-center py-2.5"
                  type="button"
                  onClick={() => {
                    import('@/lib/auth').then(({ socialLogin }) => {
                      socialLogin('google');
                    });
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 mr-2"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Google
                </Button>
              </div>
              <div className="text-center text-sm text-gray-400">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-sky-300 underline underline-offset-4 hover:text-indigo-300"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-gray-500 max-w-md mx-auto [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-sky-300">
        By clicking continue, you agree to our <Link href="/terms">Terms of Service</Link> and{' '}
        <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  );
}
