import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Toolbar, AppBar, IconButton, Avatar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { type HeaderProps } from '../types/headerTypes';
import { useAuthSelector } from '../slice/authSlice';
import './Header.css';

const Header: React.FC<HeaderProps> = ({ isClosing, open, setOpen }) => {
	const navigate = useNavigate();
	const { isAuthenticated, userData } = useAuthSelector();

	const handleDrawerToggle = () => {
		if (!isClosing) {
			setOpen(!open);
		}
	};

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
					<Avatar className='avatar'>{`${userData.username[0].toUpperCase()}${userData.username[1].toUpperCase()}`}</Avatar>
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
