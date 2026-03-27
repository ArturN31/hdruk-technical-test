import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { SkipLink } from '@/components/ui/SkipLink';

describe('SkipLink', () => {
  it('should render skip link', () => {
    const { container } = render(<SkipLink />);
    expect(container.textContent).toContain('Skip to main content');
  });

  it('should have correct href', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '#main-content');
  });

  it('should have sr-only class', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');
    expect(link).toHaveClass('sr-only', 'focus:not-sr-only');
  });

  it('should have fixed positioning', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');
    expect(link).toHaveClass('fixed', 'top-4', 'left-4', 'z-50');
  });

  it('should have styling classes', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');
    expect(link).toHaveClass(
      'rounded-lg',
      'bg-teal-600',
      'text-white',
      'px-4',
      'py-3',
      'text-sm',
      'font-medium'
    );
  });

  it('should have focus styles', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');
    expect(link).toHaveClass(
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-teal-400',
      'focus:ring-offset-2'
    );
  });

  it('should have transition classes', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');
    expect(link).toHaveClass(
      'transition-transform',
      'duration-200',
      'focus:translate-y-0',
      '-translate-y-10'
    );
  });

  it('should be accessible', () => {
    const { container } = render(<SkipLink />);
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main-content');
  });
});
