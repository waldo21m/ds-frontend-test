/* eslint-disable @typescript-eslint/consistent-type-imports */
import MainPage from './Main.page';
import { fireEvent, render, screen, userEvent } from '../../utils/test-utils';
import { FetchStatutes } from '../../utils/fetchStatuses.enum';
import { originalPosts, posts } from '../../mock/post.mock';

const mockUseAppDispatch = vi.fn();
const mockUseMainSelectorWithData = {
	originalPosts,
	posts,
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

	it('The main page is visible with data', async () => {
		expect.hasAssertions();
		render(<MainPage />);

		const postsContainer = await screen.findByTestId('postsContainer');
		expect(postsContainer).toBeInTheDocument();
	});

	it('Show the delete dialog and close it', async () => {
		expect.hasAssertions();
		render(<MainPage />);

		const deleteDialogButton = await screen.findByTestId(
			'openDeleteDialogButton1',
		);
		expect(deleteDialogButton).toBeInTheDocument();

		await userEvent.click(deleteDialogButton);
		const deleteDialog = await screen.findByTestId('deleteDialog1');
		expect(deleteDialog).toBeInTheDocument();

		const closeDeleteDialogButton = await screen.findByTestId(
			'closeDeleteDialogButton1',
		);
		expect(closeDeleteDialogButton).toBeInTheDocument();

		await userEvent.click(closeDeleteDialogButton);
		expect(deleteDialog).not.toBeInTheDocument();
	});

	it('Show the delete dialog and remove a post', async () => {
		expect.hasAssertions();
		render(<MainPage />);

		const cardContainer = await screen.findByTestId('cardContainer1');
		expect(cardContainer).toBeInTheDocument();

		const openDeleteDialogButton = await screen.findByTestId(
			'openDeleteDialogButton1',
		);
		await userEvent.click(openDeleteDialogButton);
		const deleteDialogButton = await screen.findByTestId('deleteDialogButton1');
		expect(deleteDialogButton).toBeInTheDocument();
		await userEvent.click(deleteDialogButton);
	});

	it('Show the edit dialog and close it', async () => {
		expect.hasAssertions();
		render(<MainPage />);

		const openEditDialogButton = await screen.findByTestId(
			'openEditDialogButton1',
		);
		expect(openEditDialogButton).toBeInTheDocument();

		await userEvent.click(openEditDialogButton);
		const editDialog = await screen.findByTestId('editDialog1');
		expect(editDialog).toBeInTheDocument();

		const closeEditDialogButton = await screen.findByTestId(
			'closeEditDialogButton1',
		);
		expect(closeEditDialogButton).toBeInTheDocument();

		await userEvent.click(closeEditDialogButton);
		expect(editDialog).not.toBeInTheDocument();
	});

	it('Show the edit dialog and edit the post', async () => {
		expect.hasAssertions();
		render(<MainPage />);

		const openEditDialogButton = await screen.findByTestId(
			'openEditDialogButton1',
		);
		await userEvent.click(openEditDialogButton);

		const titleInput = screen.getByLabelText('Título');
		const bodyInput = screen.getByLabelText('Cuerpo');

		fireEvent.change(titleInput, { target: { value: 'Hola' } });
		fireEvent.blur(titleInput);
		fireEvent.change(bodyInput, { target: { value: 'Mundo' } });
		fireEvent.blur(bodyInput);

		const editDialogButton = await screen.findByTestId('editDialogButton1');
		expect(editDialogButton).toBeInTheDocument();
		await userEvent.click(editDialogButton);
	});
});
