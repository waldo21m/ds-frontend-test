import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/main/Main.page';
import LoginPage from './pages/login/Login.page';
import ErrorPage from './pages/error/Error.page';
import BaseLayout from './layouts/Base.layout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <LoginPage />,
		errorElement: <ErrorPage />,
	},
	{
		element: <BaseLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/inicio',
				element: <MainPage />,
			},
		],
	},
]);

export { router };
