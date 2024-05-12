export interface DeleteDialogProps {
	postId: number;
	open: boolean;
	handleClose: () => void;
	handleDeletePost: (postId: number) => () => void;
}
