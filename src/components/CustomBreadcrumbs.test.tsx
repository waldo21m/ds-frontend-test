/* eslint-disable @typescript-eslint/consistent-type-imports */
import { vi } from 'vitest';
import CustomBreadcrumbs from './CustomBreadcrumbs';
import { render, screen, fireEvent } from '../utils/test-utils';
import { FetchStatutes } from '../utils/fetchStatuses.enum';
import { originalPosts, posts } from '../mock/post.mock';

const mockUseAppDispatch = vi.fn();
const mockUseMainSelector = {
	userIdSelected: 1,
	originalPosts,
	posts,
	status: FetchStatutes.Succeeded,
	error: null,
};

describe('CustomBreadcrumbs', () => {
	beforeAll(() => {
		vi.mock('../hooks/reduxHooks', () => ({
			...vi.importActual('../hooks/reduxHooks'),
			useAppDispatch: () => mockUseAppDispatch,
		}));

		// https://vitest.dev/api/vi#vi-mock
		vi.mock('../pages/main/slice/mainSlice', async (importOriginal) => {
			const mod =
				await importOriginal<typeof import('../pages/main/slice/mainSlice')>();

			return {
				...mod,
				useMainSelector: () => mockUseMainSelector,
			};
		});
	});

	it('Find home breadcrumb link and click in it', async () => {
		expect.hasAssertions();
		render(<CustomBreadcrumbs />);

		const homeBreadcrumbLink = await screen.findByTestId('homeBreadcrumbLink');
		expect(homeBreadcrumbLink).toBeInTheDocument();

		fireEvent.click(homeBreadcrumbLink);
		expect(mockUseAppDispatch).toHaveBeenCalled();
	});

	it('Find posts by user', async () => {
		expect.hasAssertions();

		render(<CustomBreadcrumbs />);

		const homeBreadcrumbTypography = await screen.findByTestId(
			'homeBreadcrumbTypography',
		);
		expect(homeBreadcrumbTypography).toBeInTheDocument();
	});
});
