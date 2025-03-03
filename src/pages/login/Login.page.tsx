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
import { FetchStatutes } from '../../utils/fetchStatuses.enum';
import { type LoginFormInputs } from '../../types/authTypes';
import { loginThunk, useAuthSelector } from '../../slice/authSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import ProtectedRoute from '../../components/ProtectedRoute';
import DisruptiveStudioLogo from '../../assets/disruptive-studio-logo.svg';
import './Login.css';

const schema = yup.object().shape({
	emailOrUsername: yup
		.string()
		.required('El correo electrónico o el nombre de usuario es obligatorio'),
	password: yup.string().required('La contraseña es obligatoria'),
});

const LoginPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { status } = useAuthSelector();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<LoginFormInputs>({
		resolver: yupResolver(schema),
		mode: 'onBlur',
	});
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	const onSubmit = (data: LoginFormInputs) => {
		dispatch(loginThunk(data));
	};

	return (
		<ProtectedRoute>
			<Box
				id='loginPage'
				data-testid='loginPage'
				component='div'
				className='loginContainer'
			>
				<Box component='div' sx={{ mb: 1 }}>
					<img
						src={DisruptiveStudioLogo}
						alt='Disruptive Studio logo'
						className='loginDisruptiveStudioLogo'
					/>
				</Box>
				<Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>
					¡Bienvenido 👋🏽!
				</Typography>
				<form className='loginFormContainer' onSubmit={handleSubmit(onSubmit)}>
					<TextField
						{...register('emailOrUsername')}
						error={Boolean(errors.emailOrUsername)}
						helperText={errors.emailOrUsername?.message}
						label='Correo electrónico o nombre de usuario'
						variant='standard'
						fullWidth
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
						color='primary'
						variant='contained'
						type='submit'
						disabled={!isValid || status === FetchStatutes.Loading}
						fullWidth
						sx={{ mb: 1 }}
					>
						Iniciar sesión
					</Button>
					<Button
						id='registerButton'
						data-testid='registerButton'
						color='secondary'
						variant='contained'
						fullWidth
						sx={{ mb: 1 }}
						onClick={() => navigate('/register')}
					>
						Registrarse
					</Button>
					<Button
						id='homeButton'
						data-testid='homeButton'
						className='homeButton'
						variant='text'
						fullWidth
						onClick={() => navigate('/')}
					>
						Volver al home
					</Button>
				</form>
			</Box>
		</ProtectedRoute>
	);
};

export default LoginPage;
