import { afterEach, describe, expect, it, vi } from 'vitest';
import reducer, {
	filterPosts,
	updatePost,
	removePost,
	showAllPosts,
	initialState,
	fetchPosts,
} from './mainSlice';
import { FetchStatutes } from '../../../utils/fetchStatuses.enum';
import { posts } from '../../../mock/post.mock';

describe('mainSlice', () => {
	afterEach(() => {
		vi.restoreAllMocks();
	});

	it('Should redux createSlice', () => {
		reducer(
			initialState,
			filterPosts({ filteredPosts: posts, userIdSelected: 1 }),
		);
		reducer(initialState, updatePost({ originalPosts: posts, posts }));
		reducer(
			initialState,
			removePost({ originalPosts: posts, posts, userIdSelected: 1 }),
		);
		reducer(initialState, showAllPosts());

		expect(reducer).not.toBeNull();
	});

	it('Handles fetchPosts.pending', () => {
		const action = { type: fetchPosts.pending.type };
		const state = reducer(initialState, action);

		expect(state.status).toEqual(FetchStatutes.Loading);
	});

	it('Handles fetchPosts.fulfilled', () => {
		const action = { type: fetchPosts.fulfilled.type, payload: posts };
		const state = reducer(initialState, action);

		expect(state.posts).toEqual(posts);
		expect(state.originalPosts).toEqual(posts);
		expect(state.status).toEqual(FetchStatutes.Succeeded);
	});

	it('Handles fetchPosts.rejected', () => {
		const action = { type: fetchPosts.rejected.type };
		const state = reducer(initialState, action);

		expect(state.status).toEqual(FetchStatutes.Failed);
		expect(state.error).toEqual(
			'Error al consultar posts, intente más tarde...',
		);
	});
});
