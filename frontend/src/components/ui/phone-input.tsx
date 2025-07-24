'use client';

import { Input } from './input';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  defaultCountry?: string;
}

export function PhoneInput({ defaultCountry = 'US', ...props }: PhoneInputProps) {
  return <Input type="tel" placeholder="555-123-4567" autoComplete="tel" {...props} />;
}
