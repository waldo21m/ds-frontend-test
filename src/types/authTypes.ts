import { type StatusTypes } from './statusTypes';

export interface LoginFormInputs {
	emailOrUsername: string;
	password: string;
}

export interface RegisterFormInputs {
	username: string;
	email: string;
	password: string;
	userType: string;
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
