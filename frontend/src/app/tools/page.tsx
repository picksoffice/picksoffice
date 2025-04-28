import React from 'react';

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Tools</h1>
            <p className="mb-6">Our betting tools have moved! Visit our new calculator section for all your betting calculation needs.</p>
      
      <a 
        href="/calculator" 
        className="inline-flex items-center text-sky-300 hover:text-sky-400 transition-colors font-medium"
      >
        Visit Betting Calculators
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 20 20" 
          fill="currentColor" 
          className="w-5 h-5 ml-1"
        >
          <path 
            fillRule="evenodd" 
            d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" 
            clipRule="evenodd" 
          />
        </svg>
      </a>
    </div>
  );
}