import React, { useEffect, useState } from 'react';
import { Box, Chip, IconButton, Pagination, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
	findAllContents,
	findAllContentsByContentTypeId,
	useMainSelector,
} from './slice/mainSlice';
import { UserTypes } from '../../utils/userTypes.enum';
import { FetchStatutes } from '../../utils/fetchStatuses.enum';
import { useSidebarSelector } from '../../slice/sidebarSlice';
import { useAuthSelector } from '../../slice/authSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import Loader from '../../components/Loader';
import FetchErrorImg from '../../assets/fetchError.jpg';
import './Main.css';

const MainPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { isAuthenticated, userData } = useAuthSelector();
	const { contentResponse, status, error } = useMainSelector();
	const { contentTypeIdSelected } = useSidebarSelector();
	const [page, setPage] = useState(1);

	useEffect(() => {
		if (contentTypeIdSelected === undefined) {
			dispatch(findAllContents({ page, limit: 20 }));
		} else {
			dispatch(
				findAllContentsByContentTypeId({
					page,
					limit: 20,
					contentTypeIdSelected,
				}),
			);
		}
	}, [contentTypeIdSelected, dispatch, page]);

	useEffect(() => {
		setPage(1);
	}, [contentTypeIdSelected]);

	return (
		<Box component='div' id='mainPage' data-testid='mainPage'>
			{status === FetchStatutes.Loading && <Loader />}

			{status === FetchStatutes.Succeeded &&
				contentResponse.contents.length > 0 && (
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
												<IconButton
													id={`detailButton${content._id}`}
													data-testid={`detailButton${content._id}`}
													aria-label='detail'
													color='secondary'
												>
													<VisibilityIcon />
												</IconButton>
												{((userData._id === content.createdBy._id &&
													userData.userType === UserTypes.Creator) ||
													userData.userType === UserTypes.Admin) && (
													<IconButton
														id={`editButton${content._id}`}
														data-testid={`editButton${content._id}`}
														aria-label='edit'
														color='primary'
													>
														<EditIcon />
													</IconButton>
												)}
												{userData.userType === UserTypes.Admin && (
													<IconButton
														id={`deleteButton${content._id}`}
														data-testid={`deleteButton${content._id}`}
														aria-label='delete'
														color='error'
													>
														<DeleteIcon />
													</IconButton>
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

			{status === FetchStatutes.Succeeded &&
				contentResponse.contents.length === 0 && (
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
							No hay contenidos disponibles...
						</Typography>
					</Box>
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
