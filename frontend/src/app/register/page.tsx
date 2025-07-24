'use client';

import { RegisterForm } from '@/components/register-form';
import { GalleryVerticalEnd } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <RegisterForm />
    </div>
  );
}
