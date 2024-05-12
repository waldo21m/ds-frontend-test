import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import Flanders404 from '../../assets/flanders.png';
import './Error.css';

const ErrorPage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<Box
			id='errorContainer'
			data-testid='errorContainer'
			component='div'
			className='errorContainer'
		>
			<Typography className='sorryTitle' variant='h1' sx={{ mt: 2, mb: 1 }}>
				Lo sentimos
			</Typography>
			<img src={Flanders404} alt='Page not found' className='flandersImg' />
			<Typography variant='h5' className='sorryParagraph' sx={{ mb: 1 }}>
				Parece que esta página no existe
			</Typography>
			<Button
				id='goHomeButton'
				data-testid='goHomeButton'
				variant='contained'
				onClick={() => navigate('/')}
				sx={{ mb: 1 }}
			>
				Ir a la página principal
			</Button>
		</Box>
	);
};

export default ErrorPage;
