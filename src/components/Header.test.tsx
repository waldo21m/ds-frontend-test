import { render, screen, fireEvent } from '../utils/test-utils';
import Header from '../components/Header';

describe('Header', () => {
	it('Does not toggle mobileOpen when isClosing is true', async () => {
		expect.hasAssertions();
		const setMobileOpen = vi.fn();
		render(
			<Header isClosing mobileOpen={false} setMobileOpen={setMobileOpen} />,
		);

		const menuDrawerButton = await screen.findByTestId('menuDrawerButton');
		expect(menuDrawerButton).toBeInTheDocument();

		fireEvent.click(menuDrawerButton);
		expect(setMobileOpen).not.toHaveBeenCalled();
	});
});
