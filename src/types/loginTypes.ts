import { type StatusTypes } from './statusTypes';

export interface LoginFormInputs {
	emailOrUsername: string;
	password: string;
}

export interface LoginState {
	verifyIfIsAuthenticated: boolean;
	isAuthenticated: boolean;
	status: StatusTypes;
	error: string | null;
}

export interface LoginResponse {
	token: string;
}
