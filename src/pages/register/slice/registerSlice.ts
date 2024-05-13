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
import { type RegisterFormInputs } from '../../../types/registerTypes';
import { type LoginState, type LoginResponse } from '../../../types/loginTypes';
import { type AppState } from '../../../App.store';

const axiosApi = axiosClient(import.meta.env.VITE_DS_API_URL);

export const registerThunk = createAsyncThunk<
	LoginResponse,
	RegisterFormInputs,
	{ rejectValue: string }
>('register', async (body: RegisterFormInputs, thunkAPI) => {
	try {
		const response = await axiosApi.post<LoginResponse>(
			'/api/v1/users/sign-up',
			body,
		);

		localStorage.setItem('Authorization', response.data.token);

		return response.data;
	} catch (error) {
		if (isAxiosError(error)) {
			return thunkAPI.rejectWithValue(error.response?.data.message);
		}

		return thunkAPI.rejectWithValue('Ocurrió un error inesperado');
	}
});

export const initialState: LoginState = {
	verifyIfIsAuthenticated: true,
	isAuthenticated: false,
	status: FetchStatutes.Idle,
	error: null,
};

export const registerSlice = createSlice({
	name: 'register',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerThunk.pending, (state) => {
				state.status = FetchStatutes.Loading;
			})
			.addCase(registerThunk.fulfilled, (state) => {
				state.status = FetchStatutes.Succeeded;
				state.verifyIfIsAuthenticated = false;
				state.isAuthenticated = true;
			})
			.addCase(
				registerThunk.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.status = FetchStatutes.Idle;

					const errorMessage = action.payload ?? 'Ocurrió un error inesperado';
					toast.error(errorMessage, toastConfig);
				},
			);
	},
});

export const useRegisterSelector = () =>
	useSelector<AppState, LoginState>(({ [registerSlice.name]: slice }) => slice);

export default registerSlice.reducer;
