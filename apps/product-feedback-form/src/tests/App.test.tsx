import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
	it('should render App with ErrorBoundary and ProductFeedbackForm', () => {
		render(<App />);
		
		expect(screen.getByText('Product Feedback')).toBeInTheDocument();
		expect(screen.getByText('How was your experience with us?')).toBeInTheDocument();
	});
});
