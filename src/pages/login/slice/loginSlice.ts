import { useSelector } from 'react-redux';
import { isAxiosError } from 'axios';
import {
	createAsyncThunk,
	createSlice,
	type PayloadAction,
} from '@reduxjs/toolkit';
import { FetchStatutes } from '../../../utils/fetchStatuses.enum';
import AxiosClient from '../../../utils/AxiosClient';
import {
	type LoginState,
	type LoginFormInputs,
	type LoginResponse,
} from '../../../types/loginTypes';
import { type AppState } from '../../../App.store';

const axiosInstance = AxiosClient.getInstance(import.meta.env.VITE_DS_API_URL);

export const loginThunk = createAsyncThunk<
	LoginResponse,
	LoginFormInputs,
	{ rejectValue: string }
>('login', async (body: LoginFormInputs, thunkAPI) => {
	try {
		const response = await axiosInstance.post<LoginResponse>(
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

export const initialState: LoginState = {
	verifyIfIsAuthenticated: true,
	isAuthenticated: false,
	status: FetchStatutes.Idle,
	error: null,
};

export const loginSlice = createSlice({
	name: 'login',
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
					state.status = FetchStatutes.Failed;
					state.error = action.payload ?? 'Ocurrió un error inesperado';
				},
			);
	},
});

export const useLoginSelector = () =>
	useSelector<AppState, LoginState>(({ [loginSlice.name]: slice }) => slice);

export default loginSlice.reducer;
