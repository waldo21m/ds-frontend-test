import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { isAxiosError } from 'axios';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import { toastConfig } from '../../../utils/toastConfig';
import { FetchStatutes } from '../../../utils/fetchStatuses.enum';
import axiosClient from '../../../utils/axiosClient';
import { type MainState, type ContentResponse } from '../../../types/mainTypes';
import { type AppState } from '../../../App.store';

const axiosApi = axiosClient(import.meta.env.VITE_DS_API_URL);

export const findAllContents = createAsyncThunk<
	ContentResponse,
	{ page: number; limit: number },
	{ rejectValue: string }
>('contents/findAll', async (request, thunkAPI) => {
	try {
		const response = await axiosApi.get(
			`/api/v1/contents?page=${request.page}&limit=${request.limit}`,
		);

		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			return thunkAPI.rejectWithValue(error.response?.data.message);
		}

		return thunkAPI.rejectWithValue('Ocurrió un error inesperado');
	}
});

export const findAllContentsByContentTypeId = createAsyncThunk<
	ContentResponse,
	{ page: number; limit: number; contentTypeIdSelected: string },
	{ rejectValue: string }
>('contents/findAllByContentTypeId', async (request, thunkAPI) => {
	try {
		const response = await axiosApi.get(
			`/api/v1/content-types/${request.contentTypeIdSelected}/contents?page=${request.page}&limit=${request.limit}`,
		);

		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			return thunkAPI.rejectWithValue(error.response?.data.message);
		}

		return thunkAPI.rejectWithValue('Ocurrió un error inesperado');
	}
});

export const initialState: MainState = {
	contentResponse: {} as ContentResponse,
	status: FetchStatutes.Idle,
	error: null,
};

export const mainSlice = createSlice({
	name: 'main',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(findAllContents.pending, (state) => {
				state.status = FetchStatutes.Loading;
			})
			.addCase(
				findAllContents.fulfilled,
				(state, action: PayloadAction<ContentResponse>) => {
					state.status = FetchStatutes.Succeeded;
					state.contentResponse = action.payload;
				},
			)
			.addCase(
				findAllContents.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					const errorMessage =
						action.payload ??
						'Error al consultar los contenidos, intente más tarde...';
					state.status = FetchStatutes.Failed;
					state.error = errorMessage;

					toast.error(errorMessage, toastConfig);
				},
			)
			.addCase(findAllContentsByContentTypeId.pending, (state) => {
				state.status = FetchStatutes.Loading;
			})
			.addCase(
				findAllContentsByContentTypeId.fulfilled,
				(state, action: PayloadAction<ContentResponse>) => {
					state.status = FetchStatutes.Succeeded;
					state.contentResponse = action.payload;
				},
			)
			.addCase(
				findAllContentsByContentTypeId.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					const errorMessage =
						action.payload ??
						'Error al consultar los contenidos por categoría, intente más tarde...';
					state.status = FetchStatutes.Failed;
					state.error = errorMessage;

					toast.error(errorMessage, toastConfig);
				},
			);
	},
});

export const useMainSelector = () =>
	useSelector<AppState, MainState>(({ [mainSlice.name]: slice }) => slice);

export default mainSlice.reducer;
