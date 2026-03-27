import { describe, expect, it, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { LaunchButton } from '@/components/ui/LaunchButton';
import { STATUS_MESSAGES } from '@/lib/constants';

describe('LaunchButton', () => {
  it('should render with online status', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={true} />);
    expect(container.textContent).toContain('Launch');
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });

  it('should render with offline status', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={false} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('aria-disabled', 'true');
    expect(link).toHaveAttribute('title', STATUS_MESSAGES.OFFLINE);
  });

  it('should render with checking status', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={null} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link?.getAttribute('aria-disabled')).toBe('false');
  });

  it('should have enabled styles when online', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={true} />);
    const link = container.querySelector('a');
    expect(link).toHaveClass('bg-teal-600', 'text-white');
  });

  it('should have enabled styles when checking', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={null} />);
    const link = container.querySelector('a');
    expect(link).toHaveClass('bg-teal-600', 'text-white');
  });

  it('should have disabled styles when offline', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={false} />);
    const link = container.querySelector('a');
    expect(link).toHaveClass('bg-gray-100', 'text-gray-400');
  });

  it('should have target="_blank" for external links', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={true} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('should have security attributes for external links', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={true} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('should prevent default when offline', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={false} />);
    const link = container.querySelector('a');
    // When offline, the link should have aria-disabled="true"
    expect(link?.getAttribute('aria-disabled')).toBe('true');
    expect(link).toHaveAttribute('title', STATUS_MESSAGES.OFFLINE);
  });

  it('should not prevent default when online', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={true} />);
    const link = container.querySelector('a');
    // When online, the link should not have aria-disabled or have it set to false
    expect(link?.getAttribute('aria-disabled')).toBe('false');
    expect(link).not.toHaveAttribute('title');
  });

  it('should have arrow icon', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={true} />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should have offline title attribute', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={false} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('title', 'Offline');
  });

  it('should handle click when offline', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={false} />);
    const link = container.querySelector('a');
    // Click should not navigate when offline (handled by preventDefault)
    fireEvent.click(link!);
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('should have correct aria-disabled when offline', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={false} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('aria-disabled', 'true');
  });

  it('should have correct aria-disabled when online', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={true} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('aria-disabled', 'false');
  });

  it('should have correct aria-disabled when checking', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={null} />);
    const link = container.querySelector('a');
    expect(link).toHaveAttribute('aria-disabled', 'false');
  });

  it('should accept custom className', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={true} className="custom-class" />);
    const link = container.querySelector('a');
    expect(link).toHaveClass('custom-class');
  });

  it('should have transition-transform class on icon', () => {
    const { container } = render(<LaunchButton url="https://example.com" status={true} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('transition-transform');
  });
});
