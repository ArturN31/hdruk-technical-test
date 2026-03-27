import * as React from 'react';
import type { HeaderProps } from '@/types';

/**
 * Header component with logo, title, status indicator, and clock.
 */
export function Header({ onlineCount, totalCount, currentTime }: HeaderProps) {
	return (
		<header className='h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6'>
			<div className='flex items-center gap-2.5'>
				<div
					className='w-7 h-7 bg-teal-600 rounded-md flex items-center justify-center'
					aria-hidden='true'>
					<svg
						width='16'
						height='16'
						fill='white'
						viewBox='0 0 24 24'>
						<path d='M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' />
					</svg>
				</div>
				<span className='font-semibold text-gray-900 text-sm'>
					HDR UK - Technical Test Portal
				</span>
			</div>
			<div className='flex items-center gap-4'>
				<div
					className='flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 rounded-md'
					role='status'
					aria-label={`${onlineCount} out of ${totalCount} applications online`}>
					<span
						className={`w-2 h-2 rounded-full ${onlineCount === totalCount ? 'bg-emerald-500' : 'bg-amber-500'}`}
						aria-hidden='true'
					/>
					<span className='text-xs text-gray-600'>
						{onlineCount}/{totalCount} online
					</span>
				</div>
				<div
					className='text-sm text-gray-500 font-mono'
					aria-label='Current time'>
					{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
				</div>
			</div>
		</header>
	);
}
