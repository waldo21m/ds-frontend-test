import React, { useEffect, useState } from 'react';
import { Box, Button, Chip, Pagination, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { findAllContents, useMainSelector } from './slice/mainSlice';
import { UserTypes } from '../../utils/userTypes.enum';
import { FetchStatutes } from '../../utils/fetchStatuses.enum';
import { useAuthSelector } from '../../slice/authSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import Loader from '../../components/Loader';
import FetchErrorImg from '../../assets/fetchError.jpg';
import './Main.css';

const MainPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isAuthenticated, userData } = useAuthSelector();
	const { contentResponse, status, error } = useMainSelector();
	const [page, setPage] = useState(1);

	useEffect(() => {
		dispatch(findAllContents({ page, limit: 20 }));
	}, [dispatch, page]);

	return (
		<Box component='div' id='mainPage' data-testid='mainPage'>
			{status === FetchStatutes.Loading && <Loader />}

			{status === FetchStatutes.Succeeded && (
				<>
					<div
						id='contentsContainer'
						data-testid='contentsContainer'
						className='contentsContainer'
					>
						{contentResponse.contents.map((content) => {
							return (
								<div
									id={`cardContainer${content._id}`}
									data-testid={`cardContainer${content._id}`}
									key={content._id}
									className='cardContainer'
								>
									<h2 className='cardTitle'>{content.name}</h2>
									<div className='chipsContainer'>
										<Chip
											label={content.contentType.name}
											color='primary'
											className='contentTypeChip'
										/>
										<Chip
											label={content.topic.name}
											color='secondary'
											className='cardChip'
										/>
									</div>
									<p className='cardBody'>
										<b>Creado por</b> {content.createdBy.username}
									</p>
									{isAuthenticated && (
										<div className='cardActions'>
											{(userData._id === content.createdBy._id ||
												userData.userType === UserTypes.Admin) && (
												<Button
													id={`openEditDialogButton${content._id}`}
													data-testid={`openEditDialogButton${content._id}`}
													color='secondary'
													variant='contained'
													startIcon={<EditIcon />}
													sx={{ mr: 1 }}
												>
													Editar
												</Button>
											)}
											{userData.userType === UserTypes.Admin && (
												<Button
													id={`openDeleteDialogButton${content._id}`}
													data-testid={`openDeleteDialogButton${content._id}`}
													variant='contained'
													startIcon={<DeleteIcon />}
												>
													Eliminar
												</Button>
											)}
										</div>
									)}
								</div>
							);
						})}
					</div>

					<Box className='paginator'>
						<Pagination
							count={contentResponse.totalPages}
							defaultPage={page}
							color='secondary'
							size='large'
							showFirstButton
							showLastButton
							onChange={(_, value) => setPage(value)}
						/>
					</Box>
				</>
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
		</Box>
	);
};

export default MainPage;
