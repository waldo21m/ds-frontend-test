import { type Post } from './mainTypes';

export interface EditDialogProps {
	post: Post;
	open: boolean;
	handleClose: () => void;
	handleEditPost: (post: Post) => void;
}

export interface EditDialogFormInputs {
	title: string;
	body: string;
}
