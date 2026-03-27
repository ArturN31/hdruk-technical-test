import * as React from 'react';
import type { TechStackProps } from '@/types';

/**
 * Tech stack display component that renders technology badges.
 */
export function TechStack({ techStack, className = '' }: TechStackProps) {
  return (
    <div
      className={[
        'hidden md:flex items-center gap-1.5 flex-wrap',
        className,
      ].join(' ')}
      aria-label="Technologies used"
    >
      {techStack.map((tech) => (
        <span
          key={tech}
          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
