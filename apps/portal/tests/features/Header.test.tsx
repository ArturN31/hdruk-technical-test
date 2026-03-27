import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Header } from '@/components/features/Header';

describe('Header', () => {
  const defaultProps = {
    onlineCount: 2,
    totalCount: 3,
    currentTime: new Date('2024-01-15T10:00:00Z'),
  };

  it('should render header', () => {
    const { container } = render(<Header {...defaultProps} />);
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('should render title', () => {
    const { container } = render(<Header {...defaultProps} />);
    expect(container.textContent).toContain('HDR UK - Technical Test Portal');
  });

  it('should render online count', () => {
    const { container } = render(<Header {...defaultProps} />);
    expect(container.textContent).toContain('2 of 3 applications online');
  });

  it('should render current date', () => {
    const { container } = render(<Header {...defaultProps} />);
    expect(container.textContent).toContain('Monday, 15 January 2024');
  });

  it('should have correct styling', () => {
    const { container } = render(<Header {...defaultProps} />);
    const header = container.querySelector('header');
    expect(header).toHaveClass('bg-white', 'shadow-sm', 'border-b', 'border-gray-200');
  });

  it('should have logo icon', () => {
    const { container } = render(<Header {...defaultProps} />);
    expect(container.querySelector('.w-10.h-10')).toBeInTheDocument();
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('should have gradient background for logo', () => {
    const { container } = render(<Header {...defaultProps} />);
    const logoContainer = container.querySelector('.w-10.h-10');
    expect(logoContainer).toHaveClass('bg-gradient-to-br', 'from-teal-600', 'to-teal-700');
  });

  it('should have rounded logo', () => {
    const { container } = render(<Header {...defaultProps} />);
    const logoContainer = container.querySelector('.w-10.h-10');
    expect(logoContainer).toHaveClass('rounded-lg');
  });

  it('should have shadow on logo', () => {
    const { container } = render(<Header {...defaultProps} />);
    const logoContainer = container.querySelector('.w-10.h-10');
    expect(logoContainer).toHaveClass('shadow-sm');
  });

  it('should have responsive padding', () => {
    const { container } = render(<Header {...defaultProps} />);
    const innerDiv = container.querySelector('.max-w-7xl');
    expect(innerDiv).toHaveClass('px-4', 'sm:px-6', 'lg:px-8');
  });

  it('should have flex layout', () => {
    const { container } = render(<Header {...defaultProps} />);
    expect(container.querySelector('.flex.items-center.justify-between')).toBeInTheDocument();
  });

  it('should have accessible title', () => {
    const { container } = render(<Header {...defaultProps} />);
    const title = container.querySelector('h1');
    expect(title).toBeInTheDocument();
    expect(title?.textContent).toContain('HDR UK - Technical Test Portal');
  });

  it('should have accessible description', () => {
    const { container } = render(<Header {...defaultProps} />);
    expect(container.textContent).toContain('2 of 3 applications online');
  });
});
