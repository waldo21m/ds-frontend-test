import React from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { type DeleteDialogProps } from '../../../types/deleteDialogTypes';
import './Dialog.css';

const DeleteDialog: React.FC<DeleteDialogProps> = ({
	postId,
	open,
	handleClose,
	handleDeletePost,
}) => {
	return (
		<Dialog
			id={`deleteDialog${postId}`}
			data-testid={`deleteDialog${postId}`}
			onClose={handleClose}
			aria-labelledby='Delete dialog'
			open={open}
		>
			<Box component='div' className='dialogHeader'>
				<DialogTitle className='dialogTitle'>
					¿Deseas eliminar el post?
				</DialogTitle>
				<IconButton
					id={`closeDeleteDialogButton${postId}`}
					data-testid={`closeDeleteDialogButton${postId}`}
					className='closeDialogButton'
					aria-label='Close delete dialog'
					onClick={handleClose}
				>
					<CloseIcon />
				</IconButton>
			</Box>

			<DialogContent className='dialogContent' dividers>
				<Typography className='dialogText'>
					¿Estás segur@ que quieres eliminar el post 😱?
				</Typography>
			</DialogContent>

			<DialogActions className='dialogActions'>
				<Button color='secondary' onClick={handleClose}>
					Cancelar
				</Button>
				<Button
					id={`deleteDialogButton${postId}`}
					data-testid={`deleteDialogButton${postId}`}
					variant='contained'
					onClick={handleDeletePost(postId)}
				>
					Si, eliminar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteDialog;
