import React from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { showAllPosts, useMainSelector } from '../pages/main/slice/mainSlice';
import { useAppDispatch } from '../hooks/reduxHooks';

const CustomBreadcrumbs: React.FC = () => {
	const dispatch = useAppDispatch();
	const { userIdSelected } = useMainSelector();

	const handleClick = (
		event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
	) => {
		event.preventDefault();
		dispatch(showAllPosts());
	};

	return (
		<Breadcrumbs aria-label='breadcrumb' sx={{ mb: 1 }}>
			<Link
				id='homeBreadcrumbLink'
				data-testid='homeBreadcrumbLink'
				underline='hover'
				color='inherit'
				href='/'
				onClick={handleClick}
			>
				Inicio
			</Link>

			{userIdSelected && (
				<Typography
					id='homeBreadcrumbTypography'
					data-testid='homeBreadcrumbTypography'
					color='text.primary'
				>
					Posts del usuario {userIdSelected}
				</Typography>
			)}
		</Breadcrumbs>
	);
};

export default CustomBreadcrumbs;
