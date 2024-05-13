import { render, screen, fireEvent } from '../utils/test-utils';
import Header from '../components/Header';

const mockUseNavigate = vi.fn();

describe('Header', () => {
	beforeAll(() => {
		vi.mock('react-router-dom', () => ({
			...vi.importActual('react-router-dom'),
			useNavigate: () => mockUseNavigate,
		}));
	});

	it('Does not toggle mobileOpen when isClosing is true', async () => {
		expect.hasAssertions();
		const setMobileOpen = vi.fn();
		render(<Header isClosing open={false} setOpen={setMobileOpen} />);

		const menuDrawerButton = await screen.findByTestId('menuDrawerButton');
		expect(menuDrawerButton).toBeInTheDocument();

		fireEvent.click(menuDrawerButton);
		expect(setMobileOpen).not.toHaveBeenCalled();
	});
});
