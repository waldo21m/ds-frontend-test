import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { mainSlice } from './pages/main/slice/mainSlice';
import { loginSlice } from './pages/login/slice/loginSlice';

export const appReducer = combineReducers({
	[mainSlice.name]: mainSlice.reducer,
	[loginSlice.name]: loginSlice.reducer,
});

export const makeStore = () => {
	return configureStore({
		reducer: appReducer,
		devTools: import.meta.env.VITE_ENVIRONMENT !== 'production',
	});
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
