/* eslint-disable @typescript-eslint/consistent-type-imports */
import MainPage from './Main.page';
import { render, screen, userEvent } from '../../utils/test-utils';
import { FetchStatutes } from '../../utils/fetchStatuses.enum';
import { filteredPosts, originalPosts } from '../../mock/post.mock';

const mockUseAppDispatch = vi.fn();
const mockUseMainSelectorWithData = {
	userIdSelected: 2,
	originalPosts,
	posts: filteredPosts,
	status: FetchStatutes.Succeeded,
	error: null,
};

describe('Main page with data', () => {
	beforeAll(() => {
		vi.mock('../../hooks/reduxHooks', () => ({
			...vi.importActual('../../hooks/reduxHooks'),
			useAppDispatch: () => mockUseAppDispatch,
		}));

		vi.mock('./slice/mainSlice', async (importOriginal) => {
			const mod = await importOriginal<typeof import('./slice/mainSlice')>();

			return {
				...mod,
				useMainSelector: () => mockUseMainSelectorWithData,
			};
		});
	});

	it('Show the delete dialog and remove the filtered post', async () => {
		expect.hasAssertions();
		render(<MainPage />);

		const cardContainer = await screen.findByTestId('cardContainer3');
		expect(cardContainer).toBeInTheDocument();

		const openDeleteDialogButton = await screen.findByTestId(
			'openDeleteDialogButton3',
		);
		await userEvent.click(openDeleteDialogButton);
		const deleteDialogButton = await screen.findByTestId('deleteDialogButton3');
		expect(deleteDialogButton).toBeInTheDocument();
		await userEvent.click(deleteDialogButton);
	});
});
