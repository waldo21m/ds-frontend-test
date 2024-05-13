import { type StatusTypes } from './statusTypes';

export interface LoginFormInputs {
	emailOrUsername: string;
	password: string;
}

export interface AuthState {
	verifyIfIsAuthenticated: boolean;
	isAuthenticated: boolean;
	status: StatusTypes;
	error: string | null;
}

export interface AuthResponse {
	token: string;
}
