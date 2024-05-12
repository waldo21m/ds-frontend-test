import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import React from 'react';
import {
	Box,
	Button,
	FormControl,
	FormHelperText,
	IconButton,
	Input,
	InputAdornment,
	InputLabel,
	TextField,
	Typography,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { type LoginFormInputs } from '../../types/loginTypes';
import CleverpyLogo from '../../assets/cleverpy-logo.jpeg';
import './Login.css';

const schema = yup.object().shape({
	email: yup
		.string()
		.required('El correo electrónico es obligatorio')
		.email('El correo electrónico no es válido'),
	password: yup.string().required('La contraseña es obligatoria'),
});

const LoginPage: React.FC = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		trigger,
	} = useForm<LoginFormInputs>({
		resolver: yupResolver(schema),
	});
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	const onSubmit = (data: LoginFormInputs) => {
		localStorage.setItem('id', data.email);
		navigate('/inicio');
	};

	return (
		<Box
			component='div'
			id='loginPage'
			data-testid='loginPage'
			className='loginPage'
		>
			<Box component='div' className='loginCard'>
				<Box component='div' className='loginHeader'>
					<img
						src={CleverpyLogo}
						alt='Cleverpy logo'
						className='loginCleverpyLogo'
					/>
					<Typography variant='h4' component='div'>
						Cleverpy test
					</Typography>
				</Box>
				<Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>
					¡Bienvenido 👋🏽!
				</Typography>
				<form className='loginFormContainer' onSubmit={handleSubmit(onSubmit)}>
					<TextField
						{...register('email')}
						error={Boolean(errors.email)}
						helperText={errors.email?.message}
						label='Correo electrónico'
						variant='standard'
						fullWidth
						onBlur={() => {
							trigger('email');
						}}
						sx={{ mb: 2 }}
					/>
					<FormControl variant='standard' fullWidth sx={{ mb: 2 }}>
						<InputLabel htmlFor='standard-adornment-password'>
							Contraseña
						</InputLabel>
						<Input
							{...register('password')}
							id='standard-adornment-password'
							type={showPassword ? 'text' : 'password'}
							error={Boolean(errors.password)}
							onBlur={() => {
								trigger('password');
							}}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText error={Boolean(errors.password)}>
							{errors.password?.message}
						</FormHelperText>
					</FormControl>
					<Button
						id='loginButton'
						data-testid='loginButton'
						className='loginButton'
						color='primary'
						variant='contained'
						type='submit'
						disabled={!isValid}
						fullWidth
					>
						Iniciar sesión
					</Button>
				</form>
			</Box>
		</Box>
	);
};

export default LoginPage;
