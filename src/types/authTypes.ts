import { type StatusTypes } from './statusTypes';
import { type UserTypes } from '../utils/userTypes.enum';

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

export interface DsJWT {
	_id: string;
	username: string;
	email: string;
	userType: UserTypes;
	iat: number;
}

export type UserData = Omit<DsJWT, 'iat'>;

export interface AuthState {
	verifyIfIsAuthenticated: boolean;
	isAuthenticated: boolean;
	userData: UserData;
	status: StatusTypes;
	error: string | null;
}

export interface AuthResponse {
	token: string;
}
