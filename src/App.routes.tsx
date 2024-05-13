import { createBrowserRouter } from 'react-router-dom';
import MainPage from './pages/main/Main.page';
import LoginPage from './pages/login/Login.page';
import ErrorPage from './pages/error/Error.page';
import BaseLayout from './layouts/Base.layout';

const router = createBrowserRouter([
	{
		element: <BaseLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <MainPage />,
			},
		],
	},
	{
		path: '/login',
		element: <LoginPage />,
		errorElement: <ErrorPage />,
	},
]);

export { router };
