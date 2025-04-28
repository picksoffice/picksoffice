'use client';

import React, { useState } from 'react';
import { Button, IconButton } from '@/components/ui/button';
import { 
  PlusIcon, 
  BellIcon, 
  PencilIcon, 
  TrashIcon, 
  ArrowRightIcon 
} from '@heroicons/react/24/outline';

/**
 * Button Demo Component - This page demonstrates all button variants and styles
 * This serves as a living documentation of the button system
 */
export default function ButtonExample() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadingClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8">Button System Example</h1>
      
      {/* Button Variants */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="tertiary">Tertiary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </div>
      </section>
      
      {/* Button Colors */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Button Colors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Indigo</h3>
            <div className="flex flex-col gap-2">
              <Button color="indigo" variant="primary">Primary</Button>
              <Button color="indigo" variant="secondary">Secondary</Button>
              <Button color="indigo" variant="tertiary">Tertiary</Button>
              <Button color="indigo" variant="ghost">Ghost</Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Blue</h3>
            <div className="flex flex-col gap-2">
              <Button color="blue" variant="primary">Primary</Button>
              <Button color="blue" variant="secondary">Secondary</Button>
              <Button color="blue" variant="tertiary">Tertiary</Button>
              <Button color="blue" variant="ghost">Ghost</Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Green</h3>
            <div className="flex flex-col gap-2">
              <Button color="green" variant="primary">Primary</Button>
              <Button color="green" variant="secondary">Secondary</Button>
              <Button color="green" variant="tertiary">Tertiary</Button>
              <Button color="green" variant="ghost">Ghost</Button>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2">Red</h3>
            <div className="flex flex-col gap-2">
              <Button color="red" variant="primary">Primary</Button>
              <Button color="red" variant="secondary">Secondary</Button>
              <Button color="red" variant="tertiary">Tertiary</Button>
              <Button color="red" variant="ghost">Ghost</Button>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-2">Gray (Ghost only)</h3>
          <Button variant="ghost" color="gray">Gray Ghost</Button>
        </div>
      </section>
      
      {/* Button Sizes */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Button Sizes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </section>
      
      {/* Icon Buttons */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Icon Buttons</h2>
        <div className="flex flex-wrap gap-4 mb-6">
          <IconButton aria-label="Add item" variant="primary">
            <PlusIcon className="h-5 w-5" />
          </IconButton>
          <IconButton aria-label="Notifications" variant="secondary">
            <BellIcon className="h-5 w-5" />
          </IconButton>
          <IconButton aria-label="Edit" variant="ghost">
            <PencilIcon className="h-5 w-5" />
          </IconButton>
          <IconButton aria-label="Delete" variant="ghost" color="red">
            <TrashIcon className="h-5 w-5" />
          </IconButton>
        </div>
        
        <h3 className="text-sm font-medium mb-2">Icon Button Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <IconButton aria-label="Small" size="sm" variant="ghost">
            <PlusIcon className="h-4 w-4" />
          </IconButton>
          <IconButton aria-label="Medium" size="md" variant="ghost">
            <PlusIcon className="h-5 w-5" />
          </IconButton>
          <IconButton aria-label="Large" size="lg" variant="ghost">
            <PlusIcon className="h-6 w-6" />
          </IconButton>
        </div>
      </section>
      
      {/* Button with Icon */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Button with Icon</h2>
        <div className="flex flex-wrap gap-4">
          <Button>
            <PlusIcon className="h-5 w-5 mr-2" /> Add Item
          </Button>
          <Button variant="secondary">
            View Details <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </section>
      
      {/* Button States */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Button States</h2>
        <div className="flex flex-wrap gap-4">
          <Button isLoading={isLoading} onClick={handleLoadingClick}>
            {isLoading ? 'Loading...' : 'Click to Load'}
          </Button>
          <Button disabled>Disabled Button</Button>
          <Button fullWidth>Full Width Button</Button>
        </div>
      </section>
      
      {/* Common Patterns */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Common Patterns</h2>
        
        <h3 className="text-sm font-medium mb-2">Form Actions</h3>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Form Example</label>
            <input 
              type="text" 
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md" 
              placeholder="Enter some text"
            />
          </div>
          <div className="flex items-center justify-end gap-4">
            <Button variant="secondary" color="red">Cancel</Button>
            <Button variant="primary" color="green">Save Changes</Button>
          </div>
        </div>
        
        <h3 className="text-sm font-medium mb-2">Card Actions</h3>
        <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h4 className="font-medium mb-2">Card Title</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            This is an example card with action buttons.
          </p>
          <div className="flex items-center justify-between">
            <Button variant="tertiary">Learn More</Button>
            <Button variant="primary" size="sm">Get Started</Button>
          </div>
        </div>
      </section>
    </div>
  );
}