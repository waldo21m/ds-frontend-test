import { vi } from 'vitest';
import Error from './Error.page';
import { render, screen, userEvent } from '../../utils/test-utils';

const mockUseNavigate = vi.fn();

describe('Error', () => {
	beforeAll(() => {
		vi.mock('react-router-dom', () => ({
			...vi.importActual('react-router-dom'),
			useNavigate: () => mockUseNavigate,
		}));
	});

	it('Show error page and go login with the button', async () => {
		expect.hasAssertions();
		render(<Error />);

		const errorContainer = await screen.findByTestId('errorContainer');
		expect(errorContainer).toBeInTheDocument();

		const goHomeButton = await screen.findByTestId('goHomeButton');
		expect(goHomeButton).toBeInTheDocument();
		await userEvent.click(goHomeButton);
		expect(mockUseNavigate).toHaveBeenCalled();
	});

	it('Show error page and go home with the button', async () => {
		expect.hasAssertions();
		localStorage.setItem('id', 'example@mail.com');
		render(<Error />);

		const errorContainer = await screen.findByTestId('errorContainer');
		expect(errorContainer).toBeInTheDocument();

		const goHomeButton = await screen.findByTestId('goHomeButton');
		expect(goHomeButton).toBeInTheDocument();
		await userEvent.click(goHomeButton);
		expect(mockUseNavigate).toHaveBeenCalled();
	});
});
