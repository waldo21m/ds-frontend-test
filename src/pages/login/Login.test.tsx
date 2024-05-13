import LoginPage from './Login.page';
import { fireEvent, render, screen, userEvent } from '../../utils/test-utils';

const mockUseNavigate = vi.fn();

describe('Login page', () => {
	beforeAll(() => {
		vi.mock('react-router-dom', () => ({
			...vi.importActual('react-router-dom'),
			useNavigate: () => mockUseNavigate,
		}));
	});

	it('The login page is visible', async () => {
		expect.hasAssertions();
		render(<LoginPage />);

		const loginPage = await screen.findByTestId('loginPage');
		expect(loginPage).toBeInTheDocument();
	});

	it('Login to Disruptive Studio test', async () => {
		expect.hasAssertions();
		render(<LoginPage />);

		const emailInput = screen.getByLabelText('Correo electrónico');
		const passwordInput = screen.getByLabelText('Contraseña');

		fireEvent.change(emailInput, { target: { value: 'example@mail.com' } });
		fireEvent.blur(emailInput);
		fireEvent.change(passwordInput, { target: { value: 'Inicio01.' } });
		fireEvent.blur(passwordInput);

		const loginButton = await screen.findByTestId('loginButton');
		expect(loginButton).toBeInTheDocument();
		await userEvent.click(loginButton);
	});

	it('HandleMouseDownPassword function is called when the visibility icon is clicked', async () => {
		expect.hasAssertions();
		render(<LoginPage />);

		const passwordInput = screen.getByLabelText('Contraseña');
		fireEvent.change(passwordInput, { target: { value: 'Inicio01.' } });
		fireEvent.blur(passwordInput);

		const visibilityButton = screen.getByLabelText(
			'toggle password visibility',
		);
		expect(visibilityButton).toBeInTheDocument();

		fireEvent.mouseDown(visibilityButton);
		await userEvent.click(visibilityButton);
	});
});
