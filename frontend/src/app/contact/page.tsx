import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function ContactPage() {
  return (
    <div className="relative isolate bg-transparent">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-100 sm:text-5xl">Get in touch</h2>
            <p className="mt-6 text-lg/8 text-gray-300">
              Have questions about our picks or need assistance with your betting strategy? Our team at PicksOffice is here to help you make the most informed decisions for your sports wagers.
            </p>
            <dl className="mt-10 space-y-4 text-base/7 text-gray-300">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-sky-300" />
                </dt>
                <dd>
                  <a href="mailto:support@picksoffice.com" className="text-sky-300 hover:text-sky-400">
                    support@picksoffice.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <PhoneIcon aria-hidden="true" className="h-7 w-6 text-sky-300" />
                </dt>
                <dd>
                  <a href="tel:+1 (555) 234-5678" className="text-sky-300 hover:text-sky-400">
                    +1 (555) 234-5678
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Twitter</span>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-7 w-6 text-sky-300">
                    <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" fill="currentColor" />
                  </svg>
                </dt>
                <dd>
                  <a href="https://x.com/picksoffice" target="_blank" rel="noopener noreferrer" className="text-sky-300 hover:text-sky-400">
                    @PicksOffice
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <form action="#" method="POST" className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="block text-sm/6 font-semibold text-gray-200">
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md bg-slate-800/50 px-3.5 py-2 text-base text-gray-200 outline outline-1 -outline-offset-1 outline-slate-700 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-300"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className="block text-sm/6 font-semibold text-gray-200">
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md bg-slate-800/50 px-3.5 py-2 text-base text-gray-200 outline outline-1 -outline-offset-1 outline-slate-700 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-300"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm/6 font-semibold text-gray-200">
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-slate-800/50 px-3.5 py-2 text-base text-gray-200 outline outline-1 -outline-offset-1 outline-slate-700 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-300"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className="block text-sm/6 font-semibold text-gray-200">
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-md bg-slate-800/50 px-3.5 py-2 text-base text-gray-200 outline outline-1 -outline-offset-1 outline-slate-700 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-300"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm/6 font-semibold text-gray-200">
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md bg-slate-800/50 px-3.5 py-2 text-base text-gray-200 outline outline-1 -outline-offset-1 outline-slate-700 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-sky-300"
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-sky-300 px-3.5 py-2.5 text-center text-sm font-semibold text-slate-950 shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
              >
                Send message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
