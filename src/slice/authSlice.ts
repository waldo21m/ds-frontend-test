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
import { type RegisterFormInputs } from '../types/registerTypes';
import {
	type AuthState,
	type LoginFormInputs,
	type AuthResponse,
} from '../types/authTypes';
import { type AppState } from '../App.store';

const axiosApi = axiosClient(import.meta.env.VITE_DS_API_URL);

export const loginThunk = createAsyncThunk<
	AuthResponse,
	LoginFormInputs,
	{ rejectValue: string }
>('login', async (body: LoginFormInputs, thunkAPI) => {
	try {
		const response = await axiosApi.post<AuthResponse>(
			'/api/v1/users/sign-in',
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

export const registerThunk = createAsyncThunk<
	AuthResponse,
	RegisterFormInputs,
	{ rejectValue: string }
>('register', async (body: RegisterFormInputs, thunkAPI) => {
	try {
		const response = await axiosApi.post<AuthResponse>(
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

export const initialState: AuthState = {
	verifyIfIsAuthenticated: true,
	isAuthenticated: false,
	status: FetchStatutes.Idle,
	error: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(loginThunk.pending, (state) => {
				state.status = FetchStatutes.Loading;
			})
			.addCase(loginThunk.fulfilled, (state) => {
				state.status = FetchStatutes.Succeeded;
				state.verifyIfIsAuthenticated = false;
				state.isAuthenticated = true;
			})
			.addCase(
				loginThunk.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.status = FetchStatutes.Idle;

					const errorMessage = action.payload ?? 'Ocurrió un error inesperado';
					toast.error(errorMessage, toastConfig);
				},
			)
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

export const useAuthSelector = () =>
	useSelector<AppState, AuthState>(({ [authSlice.name]: slice }) => slice);

export default authSlice.reducer;
