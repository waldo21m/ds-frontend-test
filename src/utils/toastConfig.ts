import { type ToastOptions } from 'react-toastify';

export const toastConfig: ToastOptions = {
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'dark',
	style: { textAlign: 'left' },
	position: 'top-right',
	autoClose: 4000,
};
