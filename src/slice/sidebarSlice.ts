import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { isAxiosError } from 'axios';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import { toastConfig } from '../utils/toastConfig';
import { FetchStatutes } from '../utils/fetchStatuses.enum';
import axiosClient from '../utils/axiosClient';
import {
	type SidebarState,
	type ContentTypeResponse,
} from '../types/sidebarTypes';
import { type AppState } from '../App.store';

const axiosApi = axiosClient(import.meta.env.VITE_DS_API_URL);

export const findAllContentTypes = createAsyncThunk<
	ContentTypeResponse,
	undefined,
	{ rejectValue: string }
>('contentTypes/findAll', async (_, thunkAPI) => {
	try {
		const response = await axiosApi.get('/api/v1/content-types');

		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			return thunkAPI.rejectWithValue(error.response?.data.message);
		}

		return thunkAPI.rejectWithValue('Ocurrió un error inesperado');
	}
});

export const initialState: SidebarState = {
	contentTypes: [],
	status: FetchStatutes.Idle,
	error: null,
};

export const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		setContentTypeId: (state, action: PayloadAction<string | undefined>) => {
			state.contentTypeIdSelected = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(findAllContentTypes.pending, (state) => {
				state.status = FetchStatutes.Loading;
			})
			.addCase(
				findAllContentTypes.fulfilled,
				(state, action: PayloadAction<ContentTypeResponse>) => {
					state.status = FetchStatutes.Succeeded;
					state.contentTypes = action.payload.contentTypes;
				},
			)
			.addCase(
				findAllContentTypes.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					const errorMessage =
						action.payload ??
						'Error al consultar las categorías de contenido, intente más tarde...';
					state.status = FetchStatutes.Failed;
					state.error = errorMessage;

					toast.error(errorMessage, toastConfig);
				},
			);
	},
});

export const { setContentTypeId } = sidebarSlice.actions;

export const useSidebarSelector = () =>
	useSelector<AppState, SidebarState>(
		({ [sidebarSlice.name]: slice }) => slice,
	);

export default sidebarSlice.reducer;
