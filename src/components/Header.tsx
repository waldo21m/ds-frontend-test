import React from 'react';
import { Toolbar, AppBar, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { type HeaderProps } from '../types/headerTypes';
import './Header.css';

const Header: React.FC<HeaderProps> = ({
	isClosing,
	mobileOpen,
	setMobileOpen,
}) => {
	const handleDrawerToggle = () => {
		if (!isClosing) {
			setMobileOpen(!mobileOpen);
		}
	};

	const emailId = localStorage.getItem('id') ?? 'EM';

	return (
		<AppBar className='appBarContainer'>
			<Toolbar className='toolbarContainer'>
				<IconButton
					id='menuDrawerButton'
					data-testid='menuDrawerButton'
					className='drawerIcon'
					color='inherit'
					aria-label='Open drawer'
					onClick={handleDrawerToggle}
				>
					<MenuIcon />
				</IconButton>

				<Avatar className='avatar'>{`${emailId[0].toUpperCase()}${emailId[1].toUpperCase()}`}</Avatar>
			</Toolbar>
		</AppBar>
	);
};

export default Header;
