import { Outlet } from 'react-router-dom';
import React from 'react';
import { SnackbarProvider } from 'notistack';
import { Toolbar, Box, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './App.css';

const BaseLayout = () => {
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [isClosing, setIsClosing] = React.useState(false);

	const handleDrawerClose = () => {
		setIsClosing(true);
		setMobileOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	return (
		<SnackbarProvider
			maxSnack={3}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
		>
			<Box component='div' className='rootLayout'>
				<CssBaseline />
				<Header
					isClosing={isClosing}
					mobileOpen={mobileOpen}
					setMobileOpen={setMobileOpen}
				/>

				<Sidebar
					mobileOpen={mobileOpen}
					setMobileOpen={setMobileOpen}
					handleDrawerTransitionEnd={handleDrawerTransitionEnd}
					handleDrawerClose={handleDrawerClose}
				/>

				<Box component='main' className='mainContainer'>
					<Toolbar />
					<Outlet />
				</Box>
			</Box>
		</SnackbarProvider>
	);
};

export default BaseLayout;
