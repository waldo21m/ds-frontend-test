import axios from 'axios';

const hs = {
	Accept: 'application/json',
	'Content-type': 'application/json',
	'Accept-Language': 'es',
};

const axiosClient = (url: string) => {
	const axiosInstance = axios.create({
		withCredentials: true,
		baseURL: url,
		headers: hs,
	});

	// Set the AUTH token for any request
	axiosInstance.interceptors.request.use((config) => {
		const latestConfig = config;
		const IS_SERVER = typeof window === 'undefined';
		if (!IS_SERVER) {
			const authorization = localStorage.getItem('Authorization');
			latestConfig.headers.Authorization = authorization || '';
		}

		return latestConfig;
	});

	return axiosInstance;
};

export default axiosClient;
