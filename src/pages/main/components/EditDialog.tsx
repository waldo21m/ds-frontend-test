import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import React from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	TextField,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { yupResolver } from '@hookform/resolvers/yup';
import { type Post } from '../../../types/mainTypes';
import {
	type EditDialogFormInputs,
	type EditDialogProps,
} from '../../../types/editDialogTypes';
import './Dialog.css';

const schema = yup.object().shape({
	title: yup
		.string()
		.required('El título es requerido')
		.max(255, 'El tíutlo debe tener menos de 255 caracteres'),
	body: yup
		.string()
		.required('El cuerpo es requerido')
		.max(1000, 'El cuerpo debe tener menos de 1000 caracteres'),
});

const EditDialog: React.FC<EditDialogProps> = ({
	post,
	open,
	handleClose,
	handleEditPost,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		trigger,
	} = useForm<EditDialogFormInputs>({
		resolver: yupResolver(schema),
		mode: 'onChange',
		defaultValues: {
			title: post.title,
			body: post.body,
		},
	});

	const onSubmit = (data: EditDialogFormInputs) => {
		const editedPost: Post = {
			userId: post.userId,
			id: post.id,
			title: data.title,
			body: data.body,
		};

		handleEditPost(editedPost);
	};

	return (
		<Dialog
			id={`editDialog${post.id}`}
			data-testid={`editDialog${post.id}`}
			className='editDialog'
			onClose={handleClose}
			aria-labelledby='Edit dialog'
			open={open}
		>
			<Box component='div' className='dialogHeader'>
				<DialogTitle className='dialogTitle'>
					¿Deseas editar el post?
				</DialogTitle>
				<IconButton
					id={`closeEditDialogButton${post.id}`}
					data-testid={`closeEditDialogButton${post.id}`}
					className='closeDialogButton'
					aria-label='Close edit dialog'
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>
			</Box>

			<DialogContent className='dialogContent' dividers>
				<form onSubmit={handleSubmit(onSubmit)}>
					<TextField
						{...register('title')}
						error={Boolean(errors.title)}
						helperText={errors.title?.message}
						label='Título'
						variant='standard'
						fullWidth
						onBlur={() => {
							trigger('title');
						}}
						sx={{ mb: 2 }}
					/>
					<TextField
						{...register('body')}
						error={Boolean(errors.body)}
						helperText={errors.body?.message}
						label='Cuerpo'
						variant='standard'
						multiline
						fullWidth
						onBlur={() => {
							trigger('body');
						}}
					/>
				</form>
			</DialogContent>

			<DialogActions className='dialogActions'>
				<Button onClick={handleClose}>Cancelar</Button>
				<Button
					id={`editDialogButton${post.id}`}
					data-testid={`editDialogButton${post.id}`}
					color='secondary'
					variant='contained'
					startIcon={<SaveIcon />}
					onClick={handleSubmit(onSubmit)}
					disabled={!isValid}
				>
					Guardar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditDialog;
