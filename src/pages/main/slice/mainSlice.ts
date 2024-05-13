import { useSelector } from 'react-redux';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import { FetchStatutes } from '../../../utils/fetchStatuses.enum';
import axiosClient from '../../../utils/axiosClient';
import {
	type Post,
	type MainState,
	type FilterPosts,
	type RemovePost,
	type UpdatePost,
} from '../../../types/mainTypes';
import { type AppState } from '../../../App.store';

const axiosApi = axiosClient('https://jsonplaceholder.typicode.com');

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await axiosApi.get<Post[]>('/posts');

	return response.data;
});

export const initialState: MainState = {
	originalPosts: [],
	posts: [],
	status: FetchStatutes.Idle,
	error: null,
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {
		filterPosts: (state, action: PayloadAction<FilterPosts>) => {
			state.posts = action.payload.filteredPosts;
			state.userIdSelected = action.payload.userIdSelected;
		},
		updatePost: (state, action: PayloadAction<UpdatePost>) => {
			state.originalPosts = action.payload.originalPosts;
			state.posts = action.payload.posts;
		},
		removePost: (state, action: PayloadAction<RemovePost>) => {
			state.originalPosts = action.payload.originalPosts;
			state.posts = action.payload.posts;
			state.userIdSelected = action.payload.userIdSelected;
		},
		showAllPosts: (state) => {
			state.posts = state.originalPosts;
			state.userIdSelected = undefined;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.status = FetchStatutes.Loading;
			})
			.addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
				state.status = FetchStatutes.Succeeded;
				state.posts = action.payload;
				state.originalPosts = action.payload;
			})
			.addCase(fetchPosts.rejected, (state) => {
				state.status = FetchStatutes.Failed;
				state.error = 'Error al consultar posts, intente más tarde...';
			});
	},
});

export const { filterPosts, updatePost, removePost, showAllPosts } =
	mainSlice.actions;

export const useMainSelector = () =>
	useSelector<AppState, MainState>(({ [mainSlice.name]: slice }) => slice);

export default mainSlice.reducer;
