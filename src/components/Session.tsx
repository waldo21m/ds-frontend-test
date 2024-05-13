import React, { useEffect } from 'react';
import Loader from './Loader';
import {
	checkJWTThunk,
	useAuthSelector,
	userIsNotAuthenticated,
} from '../slice/authSlice';
import { useAppDispatch } from '../hooks/reduxHooks';

const Session: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const dispatch = useAppDispatch();
	const { verifyIfIsAuthenticated } = useAuthSelector();

	useEffect(() => {
		const token = localStorage.getItem('Authorization');

		if (token) {
			dispatch(checkJWTThunk());
		} else {
			dispatch(userIsNotAuthenticated());
		}
	}, [dispatch]);

	if (verifyIfIsAuthenticated) {
		return <Loader />;
	}

	return children;
};

export default Session;
