import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Toolbar, AppBar, IconButton, Avatar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { type HeaderProps } from '../types/headerTypes';
import { type DsJWT } from '../types/authTypes';
import { useAuthSelector } from '../slice/authSlice';
import './Header.css';

const Header: React.FC<HeaderProps> = ({ isClosing, open, setOpen }) => {
	const navigate = useNavigate();
	const { isAuthenticated } = useAuthSelector();
	const [username, setUsername] = useState('');

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setOpen(!open);
		}
	};

	useEffect(() => {
		const token = localStorage.getItem('Authorization');

		if (token) {
			const tokenDecoded: DsJWT = jwtDecode(token);
			setUsername(tokenDecoded.username);
		}
	}, []);

	return (
		<AppBar className='appBarContainer'>
			<Toolbar className='toolbarContainer'>
				<IconButton
					id='menuDrawerButton'
					data-testid='menuDrawerButton'
					color='inherit'
					aria-label='Open drawer'
					onClick={handleDrawerToggle}
				>
					<MenuIcon />
				</IconButton>

				{isAuthenticated ? (
					<Avatar className='avatar'>{`${username[0].toUpperCase()}${username[1].toUpperCase()}`}</Avatar>
				) : (
					<Button color='inherit' onClick={() => navigate('/login')}>
						Login
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Header;
