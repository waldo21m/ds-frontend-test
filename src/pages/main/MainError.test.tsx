/* eslint-disable @typescript-eslint/consistent-type-imports */
import MainPage from './Main.page';
import { render, screen } from '../../utils/test-utils';
import { FetchStatutes } from '../../utils/fetchStatuses.enum';

const mockUseAppDispatch = vi.fn();
const mockUseMainSelectorWithError = {
	originalPosts: [],
	posts: [],
	status: FetchStatutes.Failed,
	error: 'Error al consultar posts, intente más tarde...',
};

describe('Main page with error', () => {
	beforeAll(() => {
		vi.mock('../../hooks/reduxHooks', () => ({
			...vi.importActual('../../hooks/reduxHooks'),
			useAppDispatch: () => mockUseAppDispatch,
		}));

		vi.mock('./slice/mainSlice', async (importOriginal) => {
			const mod = await importOriginal<typeof import('./slice/mainSlice')>();

			return {
				...mod,
				useMainSelector: () => mockUseMainSelectorWithError,
			};
		});
	});

	it('The main page is visible with the error message', async () => {
		expect.hasAssertions();
		render(<MainPage />);

		const mainErrorContainer = await screen.findByTestId('mainErrorContainer');
		expect(mainErrorContainer).toBeInTheDocument();
	});
});
