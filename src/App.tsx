import { ToastContainer } from 'react-toastify';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useRef } from 'react';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Session from './components/Session';
import { makeStore, type AppStore } from './App.store';
import { router } from './App.routes';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore();
	}

	return (
		<Provider store={storeRef.current}>
			<ThemeProvider theme={theme}>
				<StyledEngineProvider injectFirst>
					<Session>
						<ToastContainer />
						<RouterProvider router={router} />
					</Session>
				</StyledEngineProvider>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
