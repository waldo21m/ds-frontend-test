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
	MenuItem,
	TextField,
	Typography,
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserTypes } from '../../utils/userTypes.enum';
import { FetchStatutes } from '../../utils/fetchStatuses.enum';
import { type RegisterFormInputs } from '../../types/authTypes';
import { registerThunk, useAuthSelector } from '../../slice/authSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import ProtectedRoute from '../../components/ProtectedRoute';
import DisruptiveStudioLogo from '../../assets/disruptive-studio-logo.svg';
import './Register.css';

const schema = yup.object().shape({
	username: yup.string().required('El nombre de usuario es obligatorio'),
	email: yup
		.string()
		.required('El correo electrónico es obligatorio')
		.email('El correo electrónico no es válido'),
	password: yup.string().required('La contraseña es obligatoria'),
	userType: yup.string().required('El tipo de usuario es obligatorio'),
});

const RegisterPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { status } = useAuthSelector();
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<RegisterFormInputs>({
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

	const onSubmit = (data: RegisterFormInputs) => {
		dispatch(registerThunk(data));
	};

	return (
		<ProtectedRoute>
			<Box
				id='registerPage'
				data-testid='registerPage'
				component='div'
				className='registerContainer'
			>
				<Box component='div' sx={{ mb: 1 }}>
					<img
						src={DisruptiveStudioLogo}
						alt='Disruptive Studio logo'
						className='registerDisruptiveStudioLogo'
					/>
				</Box>
				<Typography variant='h5' sx={{ textAlign: 'center', mb: 2 }}>
					¡Bienvenido 👋🏽!
				</Typography>
				<form
					className='registerFormContainer'
					onSubmit={handleSubmit(onSubmit)}
				>
					<TextField
						{...register('username')}
						error={Boolean(errors.username)}
						helperText={errors.username?.message}
						label='Nombre de usuario'
						variant='standard'
						fullWidth
						sx={{ mb: 2 }}
					/>
					<TextField
						{...register('email')}
						error={Boolean(errors.email)}
						helperText={errors.email?.message}
						label='Correo electrónico'
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
					<TextField
						{...register('userType')}
						error={Boolean(errors.userType)}
						helperText={errors.userType?.message}
						label='Tipo de usuario'
						select
						variant='standard'
						fullWidth
						defaultValue={UserTypes.Reader}
						sx={{ mb: 2 }}
					>
						<MenuItem value={UserTypes.Reader}>{UserTypes.Reader}</MenuItem>
						<MenuItem value={UserTypes.Creator}>{UserTypes.Creator}</MenuItem>
					</TextField>
					<Button
						id='registerButton'
						data-testid='registerButton'
						color='primary'
						variant='contained'
						type='submit'
						disabled={!isValid || status === FetchStatutes.Loading}
						fullWidth
						sx={{ mb: 1 }}
					>
						Registrarse
					</Button>
					<Button
						id='loginButton'
						data-testid='loginButton'
						color='secondary'
						variant='contained'
						fullWidth
						sx={{ mb: 1 }}
						onClick={() => navigate('/login')}
					>
						Iniciar sesión
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

export default RegisterPage;
