/* eslint-disable @typescript-eslint/consistent-type-imports */
import MainPage from './Main.page';
import { render, screen } from '../../utils/test-utils';
import { FetchStatutes } from '../../utils/fetchStatuses.enum';

const mockUseAppDispatch = vi.fn();
const mockUseMainSelectorLoading = {
	originalPosts: [],
	posts: [],
	status: FetchStatutes.Idle,
	error: null,
};

describe('Main page', () => {
	beforeAll(() => {
		vi.mock('../../hooks/reduxHooks', () => ({
			...vi.importActual('../../hooks/reduxHooks'),
			useAppDispatch: () => mockUseAppDispatch,
		}));

		vi.mock('./slice/mainSlice', async (importOriginal) => {
			const mod = await importOriginal<typeof import('./slice/mainSlice')>();

			return {
				...mod,
				useMainSelector: () => mockUseMainSelectorLoading,
			};
		});
	});

	it('The main page is visible and exec fetchPosts', async () => {
		expect.hasAssertions();
		render(<MainPage />);

		const mainPage = await screen.findByTestId('mainPage');
		expect(mainPage).toBeInTheDocument();
	});
});
