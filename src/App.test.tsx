/* eslint-disable @typescript-eslint/consistent-type-imports */
import { render, screen } from '@testing-library/react';
import App from './App';

const mockUseNavigate = vi.fn();

describe('App', () => {
	beforeAll(() => {
		vi.mock('react-router-dom', async (importOriginal) => {
			const mod = await importOriginal<typeof import('react-router-dom')>();

			return {
				...mod,
				useNavigate: () => mockUseNavigate,
			};
		});
	});

	it('Render App component', async () => {
		expect.hasAssertions();
		render(<App />);

		const loginPage = await screen.findByTestId('mainPage');
		expect(loginPage).toBeInTheDocument();
	});
});
