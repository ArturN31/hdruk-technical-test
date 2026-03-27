import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ProductFeedbackForm } from './components/ProductFeedbackForm/ProductFeedbackForm';

function App() {
	return (
		<div className='min-h-screen grid justify-items-center'>
			<ErrorBoundary>
				<ProductFeedbackForm />
			</ErrorBoundary>
		</div>
	);
}

export default App;
