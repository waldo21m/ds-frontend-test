import { afterEach } from 'vitest';
import { Provider } from 'react-redux';
import { type ReactElement } from 'react';
import {
	render as rtlRender,
	type RenderOptions,
	type RenderResult,
	cleanup,
} from '@testing-library/react';
import {
	type EnhancedStore,
	configureStore,
	type UnknownAction,
} from '@reduxjs/toolkit';
import { appReducer, type AppState } from '../App.store';

afterEach(() => {
	cleanup();
});

interface CustomRenderOptions extends RenderOptions {
	preloadedState?: AppState;
	store?: EnhancedStore<AppState, UnknownAction>;
}

function customRender(
	ui: ReactElement,
	{
		preloadedState,
		store = configureStore({ reducer: appReducer, preloadedState }),
		...renderOptions
	}: CustomRenderOptions = {},
): RenderResult {
	function Wrapper({ children }: { children?: React.ReactNode }) {
		return <Provider store={store}>{children}</Provider>;
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render method
export { customRender as render };
