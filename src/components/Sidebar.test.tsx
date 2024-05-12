/* eslint-disable @typescript-eslint/consistent-type-imports */
import { vi } from 'vitest';
import Sidebar from './Sidebar';
import { render, screen, fireEvent } from '../utils/test-utils';
import { FetchStatutes } from '../utils/fetchStatuses.enum';
import { originalPosts, posts } from '../mock/post.mock';

const mockResponse = vi.fn();
Object.defineProperty(window, 'location', {
	value: {
		hash: {
			endsWith: mockResponse,
			includes: mockResponse,
		},
		assign: mockResponse,
	},
	writable: true,
});
const mockUseAppDispatch = vi.fn();
const mockUseMainSelector = {
	originalPosts,
	posts,
	status: FetchStatutes.Succeeded,
	error: null,
};

describe('Sidebar', () => {
	beforeAll(() => {
		vi.mock('../hooks/reduxHooks', () => ({
			...vi.importActual('../hooks/reduxHooks'),
			useAppDispatch: () => mockUseAppDispatch,
		}));

		vi.mock('../pages/main/slice/mainSlice', async (importOriginal) => {
			const mod =
				await importOriginal<typeof import('../pages/main/slice/mainSlice')>();

			return {
				...mod,
				useMainSelector: () => mockUseMainSelector,
			};
		});
	});

	it('Filter posts by user id', async () => {
		expect.hasAssertions();
		const setMobileOpen = vi.fn();
		const handleDrawerTransitionEnd = vi.fn();
		const handleDrawerClose = vi.fn();
		render(
			<Sidebar
				mobileOpen={false}
				setMobileOpen={setMobileOpen}
				handleDrawerTransitionEnd={handleDrawerTransitionEnd}
				handleDrawerClose={handleDrawerClose}
			/>,
		);

		const sidebarContainer = await screen.findByTestId('sidebarContainer');
		expect(sidebarContainer).toBeInTheDocument();

		const postListItemButtons = await screen.findAllByTestId(
			'postListItemButton1',
		);

		for (const postListItemButton of postListItemButtons) {
			fireEvent.click(postListItemButton);
			expect(mockUseAppDispatch).toHaveBeenCalled();
		}
	});

	it('Restore posts', async () => {
		expect.hasAssertions();
		const setMobileOpen = vi.fn();
		const handleDrawerTransitionEnd = vi.fn();
		const handleDrawerClose = vi.fn();
		render(
			<Sidebar
				mobileOpen={false}
				setMobileOpen={setMobileOpen}
				handleDrawerTransitionEnd={handleDrawerTransitionEnd}
				handleDrawerClose={handleDrawerClose}
			/>,
		);

		const sidebarContainer = await screen.findByTestId('sidebarContainer');
		expect(sidebarContainer).toBeInTheDocument();

		const homeListItemButtons =
			await screen.findAllByTestId('homeListItemButton');

		for (const homeListItemButton of homeListItemButtons) {
			fireEvent.click(homeListItemButton);
			expect(mockUseAppDispatch).toHaveBeenCalled();
		}
	});

	it('Logout', async () => {
		expect.hasAssertions();
		const setMobileOpen = vi.fn();
		const handleDrawerTransitionEnd = vi.fn();
		const handleDrawerClose = vi.fn();
		render(
			<Sidebar
				mobileOpen={false}
				setMobileOpen={setMobileOpen}
				handleDrawerTransitionEnd={handleDrawerTransitionEnd}
				handleDrawerClose={handleDrawerClose}
			/>,
		);

		const sidebarContainer = await screen.findByTestId('sidebarContainer');
		expect(sidebarContainer).toBeInTheDocument();

		const logoutListItemButtons = await screen.findAllByTestId(
			'logoutListItemButton',
		);

		for (const logoutListItemButton of logoutListItemButtons) {
			fireEvent.click(logoutListItemButton);
		}
	});
});
