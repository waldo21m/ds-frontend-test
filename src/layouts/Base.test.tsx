/* eslint-disable @typescript-eslint/consistent-type-imports */
import BaseLayout from './Base.layout';
import { render, screen, userEvent } from '../utils/test-utils';

const mockUseNavigate = vi.fn();

describe('AppLayout', () => {
	beforeAll(() => {
		vi.mock('react-router-dom', async (importOriginal) => {
			const mod = await importOriginal<typeof import('react-router-dom')>();

			return {
				...mod,
				useNavigate: () => mockUseNavigate,
			};
		});
	});

	it('Go login when the user is not login', async () => {
		expect.hasAssertions();
		render(<BaseLayout />);

		const menuDrawerButton = await screen.findByTestId('menuDrawerButton');
		expect(menuDrawerButton).toBeInTheDocument();
		await userEvent.click(menuDrawerButton);
		const sidebarContainer = await screen.findByTestId('sidebarContainer');

		expect(sidebarContainer).toBeInTheDocument();
	});

	it('Show the drawer icon and click to open the drawer', async () => {
		expect.hasAssertions();
		localStorage.setItem('id', 'example@mail.com');
		render(<BaseLayout />);

		const menuDrawerButton = await screen.findByTestId('menuDrawerButton');
		expect(menuDrawerButton).toBeInTheDocument();
		await userEvent.click(menuDrawerButton);
		const sidebarContainer = await screen.findByTestId('sidebarContainer');

		expect(sidebarContainer).toBeInTheDocument();
	});
});
