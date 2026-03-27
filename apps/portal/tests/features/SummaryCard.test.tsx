import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { SummaryCard } from '@/components/features/SummaryCard';
import { STATUS_MESSAGES, STATUS_LABELS } from '@/lib/constants';

describe('SummaryCard', () => {
  it('should render summary card', () => {
    const { container } = render(<SummaryCard onlineCount={2} totalCount={3} />);
    expect(container.textContent).toContain(STATUS_LABELS.SYSTEM_STATUS);
  });

  it('should render all online status', () => {
    const { container } = render(<SummaryCard onlineCount={3} totalCount={3} />);
    expect(container.textContent).toContain(STATUS_MESSAGES.ALL_OPERATIONAL);
  });

  it('should render partial online status', () => {
    const { container } = render(<SummaryCard onlineCount={2} totalCount={3} />);
    expect(container.textContent).toContain('1 system(s) offline');
  });

  it('should render all offline status', () => {
    const { container } = render(<SummaryCard onlineCount={0} totalCount={3} />);
    expect(container.textContent).toContain('3 system(s) offline');
  });

  it('should render count display', () => {
    const { container } = render(<SummaryCard onlineCount={2} totalCount={3} />);
    expect(container.textContent).toContain('2/3');
    expect(container.querySelector('[aria-label*="out of"]')).toBeInTheDocument();
  });

  it('should render online label', () => {
    const { container } = render(<SummaryCard onlineCount={2} totalCount={3} />);
    expect(container.textContent).toContain(STATUS_LABELS.ONLINE);
  });

  it('should have green indicator when all online', () => {
    const { container } = render(<SummaryCard onlineCount={3} totalCount={3} />);
    expect(container.querySelector('.bg-emerald-500')).toBeInTheDocument();
  });

  it('should have amber indicator when not all online', () => {
    const { container } = render(<SummaryCard onlineCount={2} totalCount={3} />);
    expect(container.querySelector('.bg-amber-500')).toBeInTheDocument();
  });

  it('should have correct styling', () => {
    const { container } = render(<SummaryCard onlineCount={2} totalCount={3} />);
    const card = container.firstChild;
    expect(card).toHaveClass('bg-white', 'rounded-lg', 'border', 'border-gray-200', 'p-4', 'mb-6');
  });

  it('should have flex layout', () => {
    const { container } = render(<SummaryCard onlineCount={2} totalCount={3} />);
    expect(container.querySelector('.flex.items-center.gap-4')).toBeInTheDocument();
  });

  it('should have text-right alignment for count', () => {
    const { container } = render(<SummaryCard onlineCount={2} totalCount={3} />);
    expect(container.querySelector('.text-right')).toBeInTheDocument();
  });

  it('should have large font for count', () => {
    const { container } = render(<SummaryCard onlineCount={2} totalCount={3} />);
    expect(container.querySelector('.text-2xl')).toBeInTheDocument();
  });

  it('should handle zero online', () => {
    const { container } = render(<SummaryCard onlineCount={0} totalCount={3} />);
    expect(container.textContent).toContain('0/3');
    expect(container.textContent).toContain('3 system(s) offline');
  });

  it('should handle single app', () => {
    const { container } = render(<SummaryCard onlineCount={1} totalCount={1} />);
    expect(container.textContent).toContain('1/1');
    expect(container.textContent).toContain(STATUS_MESSAGES.ALL_OPERATIONAL);
  });

  it('should have accessible count label', () => {
    const { container } = render(<SummaryCard onlineCount={2} totalCount={5} />);
    expect(container.querySelector('[aria-label*="out of"]')).toBeInTheDocument();
  });
});
