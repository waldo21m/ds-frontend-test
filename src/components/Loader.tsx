import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import './Loader.css';

const Loader: React.FC = () => {
	return (
		<Box
			id='loaderContainer'
			data-testid='loaderContainer'
			className='loaderContainer'
			component='div'
		>
			<CircularProgress color='secondary' />
		</Box>
	);
};

export default Loader;
