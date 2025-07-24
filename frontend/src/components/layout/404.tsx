export default function Example() {
  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
      <main className="grid min-h-full place-items-center bg-dark-bg bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-left sm:text-center">
          <p className="text-base font-semibold text-sky-300">404</p>
          <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-dark-text text-gray-100 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-500 text-gray-400 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-start sm:items-center sm:justify-center gap-x-6">
            <a
              href="#"
              className="rounded-md bg-sky-300 px-3.5 py-2.5 text-sm font-semibold text-slate-950 shadow-sm hover:bg-blue-500 hover:text-slate-950 active:bg-blue-500 active:text-slate-950 touch-action-manipulation focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300 transition-colors"
            >
              Go back home
            </a>
            <a href="#" className="text-sm font-semibold text-dark-text text-gray-100">
              Contact support <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
