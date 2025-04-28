import { Button } from '@/components/ui/button'

export default function Example() {
  return (
    <div className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-7">
          <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Stay Ahead of the Game.
          </h2>
          <p className="mt-3 text-gray-300 text-sm">
            Sign up for my newsletter
          </p>
        </div>
        <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="min-w-0 flex-auto rounded-lg bg-slate-800/75 px-3.5 py-2 text-base text-slate-400 border border-slate-200 hover:border-slate-300 dark:border-white/10 dark:hover:border-slate-500 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-500 focus:outline-none sm:text-sm/6"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-sky-300 px-3.5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-blue-500 hover:text-slate-950 active:bg-blue-500 active:text-slate-950 touch-action-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 transition-colors"
            >
              Subscribe
            </button>
          </div>
          <p className="mt-4 text-sm/6 text-gray-300">
            We care about your data. Read our{' '}
            <a href="#" className="font-semibold text-sky-300 hover:text-blue-300">
              privacy&nbsp;policy
            </a>
            .
          </p>
        </form>
      </div>
    </div>
  )
}
