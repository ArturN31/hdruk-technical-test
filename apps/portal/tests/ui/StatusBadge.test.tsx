import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { STATUS_MESSAGES } from '@/lib/constants';

describe('StatusBadge', () => {
  it('should render checking status', () => {
    const { container } = render(<StatusBadge status={null} />);
    expect(container.textContent).toContain(STATUS_MESSAGES.CHECKING);
    expect(container.querySelector('[role="status"]')).toBeInTheDocument();
  });

  it('should render online status', () => {
    const { container } = render(<StatusBadge status={true} />);
    expect(container.textContent).toContain(STATUS_MESSAGES.ONLINE);
    const status = container.querySelector('[role="status"]');
    expect(status).toHaveAttribute('aria-live', 'polite');
  });

  it('should render offline status', () => {
    const { container } = render(<StatusBadge status={false} />);
    expect(container.textContent).toContain(STATUS_MESSAGES.OFFLINE);
    expect(container.querySelector('[role="status"]')).toBeInTheDocument();
  });

  it('should have correct classes for checking status', () => {
    const { container } = render(<StatusBadge status={null} />);
    const badge = container.querySelector('[role="status"]');
    expect(badge).toHaveClass('bg-gray-100', 'text-gray-600');
  });

  it('should have correct classes for online status', () => {
    const { container } = render(<StatusBadge status={true} />);
    const badge = container.querySelector('[role="status"]');
    expect(badge).toHaveClass('bg-emerald-100', 'text-emerald-700');
  });

  it('should have correct classes for offline status', () => {
    const { container } = render(<StatusBadge status={false} />);
    const badge = container.querySelector('[role="status"]');
    expect(badge).toHaveClass('bg-red-100', 'text-red-700');
  });

  it('should have animated dot for checking status', () => {
    const { container } = render(<StatusBadge status={null} />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('should have static dot for online status', () => {
    const { container } = render(<StatusBadge status={true} />);
    const dot = container.querySelector('.bg-emerald-500');
    expect(dot).toBeInTheDocument();
    expect(dot).not.toHaveClass('animate-pulse');
  });

  it('should have static dot for offline status', () => {
    const { container } = render(<StatusBadge status={false} />);
    const dot = container.querySelector('.bg-red-500');
    expect(dot).toBeInTheDocument();
    expect(dot).not.toHaveClass('animate-pulse');
  });

  it('should have rounded-full class', () => {
    const { container } = render(<StatusBadge status={true} />);
    const badge = container.querySelector('[role="status"]');
    expect(badge).toHaveClass('rounded-full');
  });

  it('should have text-xs font-medium classes', () => {
    const { container } = render(<StatusBadge status={true} />);
    const badge = container.querySelector('[role="status"]');
    expect(badge).toHaveClass('text-xs', 'font-medium');
  });
});
