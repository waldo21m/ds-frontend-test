import { createBrowserRouter } from 'react-router-dom';
import RegisterPage from './pages/register/Register.page';
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
			{
				path: '/login',
				element: <LoginPage />,
			},
			{
				path: '/register',
				element: <RegisterPage />,
			},
		],
	},
]);

export { router };
