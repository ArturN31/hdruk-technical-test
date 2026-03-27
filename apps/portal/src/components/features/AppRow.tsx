import * as React from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { LaunchButton } from '@/components/ui/LaunchButton';
import { TechStack } from '@/components/ui/TechStack';
import { AppIcon } from '@/components/features/AppIcon';
import type { AppRowProps } from '@/types';

/**
 * App row component that displays a single application in the list.
 */
export function AppRow({ app, status }: AppRowProps) {
	return (
		<div className='px-5 py-4 hover:bg-gray-50 transition-colors'>
			<div className='flex items-center gap-4'>
				{/* Icon */}
				<div
					className='w-10 h-10 bg-linear-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center shrink-0 shadow-sm'
					aria-hidden='true'>
					<AppIcon name={app.icon} />
				</div>

				{/* Info */}
				<div className='flex-1 min-w-0'>
					<div className='flex items-center gap-2.5 mb-1'>
						<h3 className='font-medium text-gray-900'>{app.name}</h3>
						<StatusBadge status={status} />
					</div>
					<p className='text-sm text-gray-500'>{app.description}</p>
				</div>

				{/* Tech Stack */}
				<TechStack techStack={app.techStack} />

				{/* Launch Button */}
				<LaunchButton
					url={app.url}
					status={status}
				/>
			</div>
		</div>
	);
}
