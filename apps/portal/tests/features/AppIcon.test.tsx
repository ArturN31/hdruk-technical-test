import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { AppIcon } from '@/components/features/AppIcon';

describe('AppIcon', () => {
  it('should render github icon', () => {
    const { container } = render(<AppIcon name="github" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '18');
    expect(svg).toHaveAttribute('height', '18');
    expect(svg).toHaveAttribute('fill', 'currentColor');
  });

  it('should render feedback icon', () => {
    const { container } = render(<AppIcon name="feedback" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '18');
    expect(svg).toHaveAttribute('height', '18');
    expect(svg).toHaveAttribute('fill', 'none');
  });

  it('should render default lightning icon', () => {
    const { container } = render(<AppIcon name="unknown" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render with default text-white class', () => {
    const { container } = render(<AppIcon name="github" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('text-white');
  });

  it('should accept custom className', () => {
    const { container } = render(<AppIcon name="github" className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });

  it('should override default className', () => {
    const { container } = render(<AppIcon name="github" className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
    expect(svg).not.toHaveClass('text-white');
  });

  it('should render github icon path', () => {
    const { container } = render(<AppIcon name="github" />);
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('fill-rule', 'evenodd');
  });

  it('should render feedback icon path', () => {
    const { container } = render(<AppIcon name="feedback" />);
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('stroke-linecap', 'round');
  });

  it('should render lightning icon path', () => {
    const { container } = render(<AppIcon name="default" />);
    const path = container.querySelector('path');
    expect(path).toHaveAttribute('stroke-width', '2');
  });

  it('should handle empty string name', () => {
    const { container } = render(<AppIcon name="" />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
