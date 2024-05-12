import axios, { type AxiosInstance } from 'axios';

const hs = {
	Accept: 'application/json',
	'Content-type': 'application/json',
	'Accept-Language': 'es',
	'Cache-Control': 'no-cache',
	Pragma: 'no-cache',
	Expires: '0',
};

class AxiosClient {
	private static instance: AxiosInstance | null = null;

	private constructor(url: string) {
		AxiosClient.instance = axios.create({
			withCredentials: true,
			baseURL: url,
			headers: hs,
		});

		// Set the AUTH token for any request
		AxiosClient.instance.interceptors.request.use((config) => {
			const latestConfig = config;
			const IS_SERVER = typeof window === 'undefined';
			if (!IS_SERVER) {
				const authorization = localStorage.getItem('Authorization');
				latestConfig.headers.Authorization = authorization || '';
			}

			return latestConfig;
		});
	}

	public static getInstance(url: string): AxiosInstance {
		if (!AxiosClient.instance) {
			new AxiosClient(url);
		}

		return AxiosClient.instance as AxiosInstance;
	}
}

export default AxiosClient;
