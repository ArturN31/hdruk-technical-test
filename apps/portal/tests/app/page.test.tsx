import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import Home from '@/app/page';

// Mock hooks
vi.mock('@/hooks/useAppStatus', () => ({
  useAppStatus: () => ({
    appStatuses: {
      'GitHub Portfolio': true,
      'Product Feedback': true,
    },
    isLoading: false,
    error: null,
    refresh: vi.fn(),
  }),
}));

vi.mock('@/hooks/useCurrentTime', () => ({
  useCurrentTime: () => new Date('2024-01-15T10:00:00Z'),
}));

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render page', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('main')).toBeInTheDocument();
  });

  it('should render header', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('header')).toBeInTheDocument();
  });

  it('should render title', () => {
    const { container } = render(<Home />);
    expect(container.textContent).toContain('HDR UK - Technical Test Portal');
  });

  it('should render summary card', () => {
    const { container } = render(<Home />);
    expect(container.textContent).toContain('System Status');
  });

  it('should render applications section', () => {
    const { container } = render(<Home />);
    expect(container.textContent).toContain('Applications');
  });

  it('should render app rows', () => {
    const { container } = render(<Home />);
    expect(container.textContent).toContain('GitHub Portfolio');
    expect(container.textContent).toContain('Product Feedback');
  });

  it('should have correct layout classes', () => {
    const { container } = render(<Home />);
    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass('min-h-screen', 'bg-gray-50');
  });

  it('should have main content id', () => {
    const { container } = render(<Home />);
    const mainContent = container.querySelector('[id="main-content"]');
    expect(mainContent).toBeInTheDocument();
  });

  it('should have max-width container', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('.max-w-5xl')).toBeInTheDocument();
  });

  it('should have padding', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('main')).toHaveClass('p-6');
  });

  it('should have border on applications container', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('.bg-white.rounded-lg.border')).toBeInTheDocument();
  });

  it('should have divide-y on app rows', () => {
    const { container } = render(<Home />);
    expect(container.querySelector('.divide-y')).toBeInTheDocument();
  });
});
