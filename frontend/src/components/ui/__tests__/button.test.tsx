import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button, IconButton } from '../button';
import { PlusIcon } from '@heroicons/react/24/outline';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-indigo-600');
  });

  it('renders different variants correctly', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>);
    expect(screen.getByRole('button')).toHaveClass('border-indigo-600');

    rerender(<Button variant="tertiary">Tertiary</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-indigo-600');

    rerender(<Button variant="ghost">Ghost</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-transparent');
  });

  it('renders different colors correctly', () => {
    const { rerender } = render(<Button color="blue">Blue</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-blue-600');

    rerender(<Button color="green">Green</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-green-600');

    rerender(<Button color="red">Red</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-red-600');
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5');

    rerender(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3');

    rerender(<Button size="xl">Extra Large</Button>);
    expect(screen.getByRole('button')).toHaveClass('px-8', 'py-4');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders as a link when href is provided', () => {
    render(<Button href="/test">Link Button</Button>);
    const link = screen.getByRole('link', { name: /link button/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('shows loading state correctly', () => {
    render(<Button isLoading>Loading</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
  });

  it('renders full width when specified', () => {
    render(<Button fullWidth>Full Width</Button>);
    expect(screen.getByRole('button')).toHaveClass('w-full');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});

describe('IconButton Component', () => {
  it('renders with required props', () => {
    render(
      <IconButton aria-label="Add item">
        <PlusIcon className="h-5 w-5" />
      </IconButton>
    );
    const button = screen.getByRole('button', { name: /add item/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('p-2');
  });

  it('renders different sizes correctly', () => {
    const { rerender } = render(
      <IconButton aria-label="Small" size="sm">
        <PlusIcon className="h-4 w-4" />
      </IconButton>
    );
    expect(screen.getByRole('button')).toHaveClass('p-1');

    rerender(
      <IconButton aria-label="Large" size="lg">
        <PlusIcon className="h-6 w-6" />
      </IconButton>
    );
    expect(screen.getByRole('button')).toHaveClass('p-3');
  });

  it('handles click events', async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <IconButton aria-label="Test" onClick={handleClick}>
        <PlusIcon className="h-5 w-5" />
      </IconButton>
    );
    await user.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
