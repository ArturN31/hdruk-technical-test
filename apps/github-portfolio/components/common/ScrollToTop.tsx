'use client';

import { useState, useEffect } from 'react';

export function ScrollToTop() {
	const [showScrollTop, setShowScrollTop] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setShowScrollTop(window.scrollY > 400);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	if (!showScrollTop) return null;

	return (
		<button
			onClick={scrollToTop}
			className='fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full bg-teal-600 p-3 text-white shadow-lg hover:bg-teal-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 hover:cursor-pointer'
			aria-label='Scroll to top'
			title='Scroll to top'>
			<svg
				className='h-5 w-5'
				fill='none'
				stroke='currentColor'
				viewBox='0 0 24 24'>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth={2}
					d='M5 10l7-7m0 0l7 7m-7-7v18'
				/>
			</svg>
		</button>
	);
}
