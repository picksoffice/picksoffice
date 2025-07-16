const testimonials = [
  {
    body: 'I was skeptical at first, but after 3 months following these picks, my bankroll is up 22%. The detailed writeups explain the thinking behind each bet, which has helped me understand line value better.',
    author: {
      name: 'Michael',
      handle: 'michael_bets',
      followSince: 'May 2023',
    },
  },
  {
    body: 'Been betting for years but never with this level of consistency. What stands out most is how transparent the records are - both wins and losses are tracked and explained. That kind of honesty is rare.',
    author: {
      name: 'Thomas',
      handle: 'thomas_sports',
      followSince: 'October 2021',
    },
  },
  {
    body: 'As someone who loves data, I appreciate how each pick comes with statistical backing. No "gut feelings" here, just solid analysis. My betting has become much more disciplined following this approach.',
    author: {
      name: 'David',
      handle: 'david_analytics',
      followSince: 'January 2022',
    },
  },
  {
    body: 'The NFL analysis has been spot-on all season. I have learned to identify line value and spot trends myself thanks to the detailed writeups. My Sunday betting is actually profitable for the first time ever.',
    author: {
      name: 'Robert',
      handle: 'robert_nfl',
      followSince: 'August 2022',
    },
  },
  {
    body: 'I have tried several handicappers over the years and most just push their wins and hide their losses. Here all picks are documented with honest analysis. The 8.2% ROI over 350+ picks speaks for itself.',
    author: {
      name: 'James',
      handle: 'james_bettor',
      followSince: 'March 2020',
    },
  },
  {
    body: 'Been a subscriber since day one. What makes these picks worth it is the educational aspect - I am not just blindly tailing but actually learning how to identify value. My overall betting skills have improved.',
    author: {
      name: 'Daniel',
      handle: 'daniel_value',
      followSince: 'September 2019',
    },
  },
];

export default function Example() {
  return (
    <div className="bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-left sm:text-center">
          <h2 className="text-base/7 font-semibold text-sky-300">Testimonials</h2>
          <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-dark-text sm:text-5xl">
            What My Subscribers Say
          </p>
          <p className="mt-6 text-lg text-gray-300">
            See how my betting analysis and picks have helped sports bettors achieve consistent profits
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.author.handle} className="flex flex-col h-full">
                <figure className="flex flex-col flex-1 rounded-2xl bg-slate-800/30 backdrop-blur-sm p-8 shadow-lg border border-white/10 ring-1 ring-white/10 hover:bg-slate-800/40 transition-colors">
                  <blockquote className="flex-1 text-dark-text">
                    <p className="text-lg">{`"${testimonial.body}"`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex flex-col gap-y-2 border-t border-white/10 pt-6">
                    <div className="font-semibold text-dark-text">{testimonial.author.name.split(' ')[0]}</div>
                    <div className="text-xs text-gray-400">X Follower since {testimonial.author.followSince}</div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(3, 6).map((testimonial) => (
              <div key={testimonial.author.handle} className="flex flex-col h-full">
                <figure className="flex flex-col flex-1 rounded-2xl bg-slate-800/30 backdrop-blur-sm p-8 shadow-lg border border-white/10 ring-1 ring-white/10 hover:bg-slate-800/40 transition-colors">
                  <blockquote className="flex-1 text-dark-text">
                    <p className="text-lg">{`"${testimonial.body}"`}</p>
                  </blockquote>
                  <figcaption className="mt-6 flex flex-col gap-y-2 border-t border-white/10 pt-6">
                    <div className="font-semibold text-dark-text">{testimonial.author.name.split(' ')[0]}</div>
                    <div className="text-xs text-gray-400">X Follower since {testimonial.author.followSince}</div>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}