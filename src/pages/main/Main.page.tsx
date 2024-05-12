import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Box, Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import {
	fetchPosts,
	updatePost,
	removePost,
	useMainSelector,
} from './slice/mainSlice';
import EditDialog from './components/EditDialog';
import DeleteDialog from './components/DeleteDialog';
import { FetchStatutes } from '../../utils/fetchStatuses.enum';
import { type Post } from '../../types/mainTypes';
import { useAppDispatch } from '../../hooks/reduxHooks';
import Loader from '../../components/Loader';
import CustomBreadcrumbs from '../../components/CustomBreadcrumbs';
import FetchErrorImg from '../../assets/fetchError.jpg';
import './Main.css';

const MainPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { originalPosts, posts, userIdSelected, status, error } =
		useMainSelector();
	const [selectedPost, setSelectedPost] = React.useState<Post>();
	const [openEditDialog, setOpenEditDialog] = React.useState(false);
	const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

	const notistackConfig = {
		variant: 'success' as const,
		autoHideDuration: 5000,
		action: (key: string | number) => (
			<IconButton color='inherit' onClick={() => closeSnackbar(key)}>
				<CloseIcon />
			</IconButton>
		),
	};

	const handleClickOpenEditDialog = (post: Post) => () => {
		setSelectedPost(post);
		setOpenEditDialog(true);
	};

	const handleClickOpenDeleteDialog = (post: Post) => () => {
		setSelectedPost(post);
		setOpenDeleteDialog(true);
	};

	const handleCloseDialog = () => {
		setSelectedPost(undefined);
		setOpenEditDialog(false);
		setOpenDeleteDialog(false);
	};

	const handleEditPost = (post: Post) => {
		const updatedOriginalPosts = originalPosts.map((originalPost) => {
			if (originalPost.id === post.id) {
				return post;
			}

			return originalPost;
		});

		const updatedPosts = posts.map((oldPost) => {
			if (oldPost.id === post.id) {
				return post;
			}

			return oldPost;
		});

		dispatch(
			updatePost({
				originalPosts: updatedOriginalPosts,
				posts: updatedPosts,
			}),
		);

		enqueueSnackbar('Modificaste un post con éxito', notistackConfig);
		handleCloseDialog();
	};

	const handleDeletePost = (postId: number) => () => {
		const postDeleted = originalPosts.find((post) => post.id === postId);
		const originalPostsFiltered = originalPosts.filter(
			(post) => post.id !== postId,
		);
		let postsFiltered = posts.filter((post) => post.id !== postId);
		let userId = userIdSelected;

		if (postsFiltered.length === 0) {
			postsFiltered = originalPostsFiltered;
			userId = undefined;
		}

		dispatch(
			removePost({
				originalPosts: originalPostsFiltered,
				posts: postsFiltered,
				userIdSelected: userId,
			}),
		);

		enqueueSnackbar(
			`Eliminaste el post ${postDeleted?.title}`,
			notistackConfig,
		);
		handleCloseDialog();
	};

	useEffect(() => {
		if (status === FetchStatutes.Idle) {
			dispatch(fetchPosts());
		}
	}, [status, dispatch]);

	return (
		<Box component='div' id='mainPage' data-testid='mainPage'>
			<CustomBreadcrumbs />

			{status === FetchStatutes.Loading && <Loader />}

			{status === FetchStatutes.Succeeded && (
				<div
					id='postsContainer'
					data-testid='postsContainer'
					className='postsContainer'
				>
					{posts.map((post) => {
						return (
							<div
								id={`cardContainer${post.id}`}
								data-testid={`cardContainer${post.id}`}
								key={post.id}
								className='cardContainer'
							>
								<div className='cardHeader'>
									<div className='cardAvatar'>{post.userId}</div>
									<h2 className='cardTitle'>{post.title}</h2>
								</div>
								<p className='cardBody'>{post.body}</p>
								<div className='cardActions'>
									<Button
										id={`openEditDialogButton${post.id}`}
										data-testid={`openEditDialogButton${post.id}`}
										color='secondary'
										variant='contained'
										startIcon={<EditIcon />}
										onClick={handleClickOpenEditDialog(post)}
										sx={{ mr: 1 }}
									>
										Editar
									</Button>
									<Button
										id={`openDeleteDialogButton${post.id}`}
										data-testid={`openDeleteDialogButton${post.id}`}
										variant='contained'
										startIcon={<DeleteIcon />}
										onClick={handleClickOpenDeleteDialog(post)}
									>
										Eliminar
									</Button>
								</div>
							</div>
						);
					})}
				</div>
			)}

			{status === FetchStatutes.Failed && (
				<Box
					id='mainErrorContainer'
					data-testid='mainErrorContainer'
					className='mainErrorContainer'
					component='div'
				>
					<img
						src={FetchErrorImg}
						alt='Fetch error'
						className='fetchErrorImg'
					/>
					<Typography variant='h5' className='errorParagraph'>
						{error}
					</Typography>
				</Box>
			)}

			{selectedPost && (
				<DeleteDialog
					postId={selectedPost.id}
					open={openDeleteDialog}
					handleClose={handleCloseDialog}
					handleDeletePost={handleDeletePost}
				/>
			)}

			{selectedPost && (
				<EditDialog
					post={selectedPost}
					open={openEditDialog}
					handleClose={handleCloseDialog}
					handleEditPost={handleEditPost}
				/>
			)}
		</Box>
	);
};

export default MainPage;
