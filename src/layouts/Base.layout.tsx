import { Outlet } from 'react-router-dom';
import React from 'react';
import { Toolbar, Box, CssBaseline } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import './Base.css';

const BaseLayout = () => {
	const [open, setOpen] = React.useState(false);
	const [isClosing, setIsClosing] = React.useState(false);

	const handleDrawerClose = () => {
		setIsClosing(true);
		setOpen(false);
	};

	const handleDrawerTransitionEnd = () => {
		setIsClosing(false);
	};

	return (
		<Box component='div' className='rootLayout'>
			<CssBaseline />
			<Header isClosing={isClosing} open={open} setOpen={setOpen} />

			<Sidebar
				open={open}
				setOpen={setOpen}
				handleDrawerTransitionEnd={handleDrawerTransitionEnd}
				handleDrawerClose={handleDrawerClose}
			/>

			<Box component='main' className='mainContainer'>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
};

export default BaseLayout;
