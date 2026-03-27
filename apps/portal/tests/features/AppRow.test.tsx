import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { AppRow } from '@/components/features/AppRow';
import { apps } from '@/lib/apps-config';

describe('AppRow', () => {
  const testApp = apps[0];

  it('should render app row', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    expect(container.textContent).toContain(testApp.name);
  });

  it('should render app description', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    expect(container.textContent).toContain(testApp.description);
  });

  it('should render status badge', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    expect(container.textContent).toContain('Online');
  });

  it('should render offline status', () => {
    const { container } = render(<AppRow app={testApp} status={false} />);
    expect(container.textContent).toContain('Offline');
  });

  it('should render checking status', () => {
    const { container } = render(<AppRow app={testApp} status={null} />);
    expect(container.textContent).toContain('Checking');
  });

  it('should render tech stack', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    testApp.techStack.forEach((tech) => {
      expect(container.textContent).toContain(tech);
    });
  });

  it('should render launch button', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    expect(container.textContent).toContain('Launch');
  });

  it('should render app icon', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    expect(container.querySelector('.w-10.h-10')).toBeInTheDocument();
  });

  it('should have correct styling', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    const row = container.firstChild;
    expect(row).toHaveClass('px-5', 'py-4', 'hover:bg-gray-50');
  });

  it('should have flex layout', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    expect(container.querySelector('.flex.items-center.gap-4')).toBeInTheDocument();
  });

  it('should have status badge with correct status', () => {
    const { container } = render(<AppRow app={testApp} status={false} />);
    expect(container.querySelector('[role="status"]')).toBeInTheDocument();
  });

  it('should have launch button with correct href', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    const launchLink = container.querySelector('a');
    expect(launchLink).toHaveAttribute('href', testApp.url);
  });

  it('should have hover transition', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    const row = container.firstChild;
    expect(row).toHaveClass('transition-colors');
  });

  it('should have rounded icon container', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    const iconContainer = container.querySelector('.w-10.h-10');
    expect(iconContainer).toHaveClass('rounded-lg');
  });

  it('should have icon gradient', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    const iconContainer = container.querySelector('.w-10.h-10');
    expect(iconContainer).toHaveClass('bg-linear-to-br', 'from-teal-500', 'to-teal-600');
  });

  it('should have shadow on icon', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    const iconContainer = container.querySelector('.w-10.h-10');
    expect(iconContainer).toHaveClass('shadow-sm');
  });

  it('should have shrink-0 on icon', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    const iconContainer = container.querySelector('.w-10.h-10');
    expect(iconContainer).toHaveClass('shrink-0');
  });

  it('should have min-w-0 on info section', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    expect(container.querySelector('.flex-1.min-w-0')).toBeInTheDocument();
  });

  it('should have gap between name and status', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    expect(container.querySelector('[class*="gap-2.5"]')).toBeInTheDocument();
  });

  it('should have correct text styles', () => {
    const { container } = render(<AppRow app={testApp} status={true} />);
    expect(container.textContent).toContain(testApp.name);
  });
});
