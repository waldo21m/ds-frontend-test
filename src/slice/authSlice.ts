import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
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
	type DsJWT,
	type UserData,
	type AuthResponse,
	type AuthState,
	type LoginFormInputs,
	type RegisterFormInputs,
} from '../types/authTypes';
import { type AppState } from '../App.store';

const axiosApi = axiosClient(import.meta.env.VITE_DS_API_URL);

export const loginThunk = createAsyncThunk<
	DsJWT,
	LoginFormInputs,
	{ rejectValue: string }
>('login', async (body: LoginFormInputs, thunkAPI) => {
	try {
		const response = await axiosApi.post<AuthResponse>(
			'/api/v1/users/sign-in',
			body,
		);

		localStorage.setItem('Authorization', response.data.token);

		const tokenDecoded: DsJWT = jwtDecode(response.data.token);

		return tokenDecoded;
	} catch (error) {
		if (isAxiosError(error)) {
			return thunkAPI.rejectWithValue(error.response?.data.message);
		}

		return thunkAPI.rejectWithValue('Ocurrió un error inesperado');
	}
});

export const registerThunk = createAsyncThunk<
	DsJWT,
	RegisterFormInputs,
	{ rejectValue: string }
>('register', async (body: RegisterFormInputs, thunkAPI) => {
	try {
		const response = await axiosApi.post<AuthResponse>(
			'/api/v1/users/sign-up',
			body,
		);

		localStorage.setItem('Authorization', response.data.token);

		const tokenDecoded: DsJWT = jwtDecode(response.data.token);

		return tokenDecoded;
	} catch (error) {
		if (isAxiosError(error)) {
			return thunkAPI.rejectWithValue(error.response?.data.message);
		}

		return thunkAPI.rejectWithValue('Ocurrió un error inesperado');
	}
});

export const checkJWTThunk = createAsyncThunk<
	DsJWT,
	undefined,
	{ rejectValue: string }
>('checkJWT', async (_, thunkAPI) => {
	try {
		await axiosApi.get('/api/v1/check-jwt');

		const token = localStorage.getItem('Authorization') as string;
		const tokenDecoded: DsJWT = jwtDecode(token);

		return tokenDecoded;
	} catch (error) {
		if (isAxiosError(error)) {
			return thunkAPI.rejectWithValue(error.response?.data.message);
		}

		return thunkAPI.rejectWithValue('Ocurrió un error inesperado');
	}
});

export const logoutThunk = createAsyncThunk<
	boolean,
	undefined,
	{ rejectValue: string }
>('logout', async (_, thunkAPI) => {
	try {
		await axiosApi.post('/api/v1/logout');

		localStorage.clear();
		sessionStorage.clear();

		return true;
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
	userData: {} as UserData,
	status: FetchStatutes.Idle,
	error: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		userIsNotAuthenticated: (state) => {
			state.verifyIfIsAuthenticated = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginThunk.pending, (state) => {
				state.status = FetchStatutes.Loading;
			})
			.addCase(loginThunk.fulfilled, (state, action: PayloadAction<DsJWT>) => {
				state.status = FetchStatutes.Succeeded;
				state.isAuthenticated = true;
				state.userData = action.payload;
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
			.addCase(
				registerThunk.fulfilled,
				(state, action: PayloadAction<DsJWT>) => {
					state.status = FetchStatutes.Succeeded;
					state.isAuthenticated = true;
					state.userData = action.payload;
				},
			)
			.addCase(
				registerThunk.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.status = FetchStatutes.Idle;

					const errorMessage = action.payload ?? 'Ocurrió un error inesperado';
					toast.error(errorMessage, toastConfig);
				},
			)
			.addCase(checkJWTThunk.pending, (state) => {
				state.status = FetchStatutes.Loading;
			})
			.addCase(
				checkJWTThunk.fulfilled,
				(state, action: PayloadAction<DsJWT>) => {
					state.status = FetchStatutes.Succeeded;
					state.verifyIfIsAuthenticated = false;
					state.isAuthenticated = true;
					state.userData = action.payload;
				},
			)
			.addCase(
				checkJWTThunk.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.status = FetchStatutes.Idle;
					state.verifyIfIsAuthenticated = false;

					const errorMessage = action.payload ?? 'Ocurrió un error inesperado';
					toast.error(errorMessage, toastConfig);
				},
			)
			.addCase(logoutThunk.pending, (state) => {
				state.status = FetchStatutes.Loading;
			})
			.addCase(logoutThunk.fulfilled, (state) => {
				state.status = FetchStatutes.Succeeded;
				state.isAuthenticated = false;
				state.userData = {} as UserData;
			})
			.addCase(
				logoutThunk.rejected,
				(state, action: PayloadAction<string | undefined>) => {
					state.status = FetchStatutes.Idle;

					const errorMessage = action.payload ?? 'Ocurrió un error inesperado';
					toast.error(errorMessage, toastConfig);
				},
			);
	},
});

export const { userIsNotAuthenticated } = authSlice.actions;

export const useAuthSelector = () =>
	useSelector<AppState, AuthState>(({ [authSlice.name]: slice }) => slice);

export default authSlice.reducer;
