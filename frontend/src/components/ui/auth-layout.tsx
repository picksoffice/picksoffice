import type React from 'react';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-dvh flex-col p-2">
      <div className="flex grow items-center justify-center p-6 lg:rounded-lg lg:bg-dark-bg lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5 lg:bg-zinc-900 lg:ring-white/10">
        {children}
      </div>
    </main>
  );
}
