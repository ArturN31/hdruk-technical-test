import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { TechStack } from '@/components/ui/TechStack';

describe('TechStack', () => {
  it('should render tech stack items', () => {
    const techStack = ['React', 'TypeScript', 'Tailwind'];
    const { container } = render(<TechStack techStack={techStack} />);
    
    expect(container.textContent).toContain('React');
    expect(container.textContent).toContain('TypeScript');
    expect(container.textContent).toContain('Tailwind');
  });

  it('should render with correct classes', () => {
    const { container } = render(<TechStack techStack={['React']} />);
    const badges = container.querySelectorAll('span');
    expect(badges.length).toBeGreaterThan(0);
    badges.forEach((badge) => {
      expect(badge).toHaveClass('px-2', 'py-1', 'bg-gray-100', 'text-gray-600', 'text-xs', 'rounded');
    });
  });

  it('should have aria-label', () => {
    const { container } = render(<TechStack techStack={['React']} />);
    expect(container.querySelector('[aria-label="Technologies used"]')).toBeInTheDocument();
  });

  it('should be hidden on mobile', () => {
    const { container } = render(<TechStack techStack={['React']} />);
    const techStackContainer = container.firstChild;
    expect(techStackContainer).toHaveClass('hidden', 'md:flex');
  });

  it('should accept custom className', () => {
    const { container } = render(<TechStack techStack={['React']} className="custom-class" />);
    const techStackContainer = container.firstChild;
    expect(techStackContainer).toHaveClass('custom-class');
  });

  it('should render empty tech stack', () => {
    const { container } = render(<TechStack techStack={[]} />);
    const techStackContainer = container.firstChild as HTMLElement;
    expect(techStackContainer).toBeInTheDocument();
    expect(techStackContainer.children.length).toBe(0);
  });

  it('should render single tech item', () => {
    const { container } = render(<TechStack techStack={['React']} />);
    expect(container.textContent).toContain('React');
  });

  it('should render multiple tech items', () => {
    const techStack = ['React', 'TypeScript', 'Tailwind', 'Next.js', 'Vitest'];
    const { container } = render(<TechStack techStack={techStack} />);
    
    techStack.forEach((tech) => {
      expect(container.textContent).toContain(tech);
    });
  });

  it('should have flex layout', () => {
    const { container } = render(<TechStack techStack={['React']} />);
    const techStackContainer = container.firstChild;
    expect(techStackContainer).toHaveClass('md:flex', 'items-center', 'gap-1.5', 'flex-wrap');
  });
});
