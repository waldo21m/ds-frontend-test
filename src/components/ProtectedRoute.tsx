import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import type React from 'react';
import { useAuthSelector } from '../slice/authSlice';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuthSelector();

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/');
		}
	}, [isAuthenticated, navigate]);

	return children;
};

export default ProtectedRoute;
