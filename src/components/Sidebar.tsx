import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import {
	Toolbar,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Box,
	Drawer,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { type SidebarProps } from '../types/sidebarTypes';
import {
	findAllContentTypes,
	setContentTypeId,
	useSidebarSelector,
} from '../slice/sidebarSlice';
import { logoutThunk, useAuthSelector } from '../slice/authSlice';
import { useAppDispatch } from '../hooks/reduxHooks';
import DisruptiveStudioLogo from '../assets/disruptive-studio-logo.svg';
import './Sidebar.css';

const Sidebar: React.FC<SidebarProps> = ({
	open,
	setOpen,
	handleDrawerTransitionEnd,
	handleDrawerClose,
}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isAuthenticated } = useAuthSelector();
	const { contentTypes, contentTypeIdSelected } = useSidebarSelector();

	const handleLogout = () => {
		dispatch(logoutThunk());
		navigate('/login');
		setOpen(false);
	};

	useEffect(() => {
		dispatch(findAllContentTypes());
	}, [dispatch]);

	const gotToHome = () => {
		dispatch(setContentTypeId(undefined));
		navigate('/');
		setOpen(false);
	};

	const filterContentsByContentTypeId = (contentTypeId: string) => () => {
		dispatch(setContentTypeId(contentTypeId));
		navigate('/');
		setOpen(false);
	};

	return (
		<Box
			id='sidebarContainer'
			data-testid='sidebarContainer'
			className='sidebarContainer'
			component='nav'
			aria-label='Sidebar'
		>
			<Drawer
				className='drawer'
				variant='temporary'
				open={open}
				onTransitionEnd={handleDrawerTransitionEnd}
				onClose={handleDrawerClose}
				ModalProps={{
					keepMounted: true,
				}}
			>
				<Box className='drawerContainer' component='div'>
					<Toolbar className='drawerToolbarContainer'>
						<img
							src={DisruptiveStudioLogo}
							alt='Disruptive Studio logo'
							className='disruptiveStudioLogo'
						/>
					</Toolbar>
					<Divider />
					<List className='listMenu'>
						<ListItem disablePadding>
							<ListItemButton
								id='homeListItemButton'
								data-testid='homeListItemButton'
								selected={contentTypeIdSelected === undefined}
								onClick={gotToHome}
							>
								<ListItemIcon className='listItemIcon'>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary='Inicio' />
							</ListItemButton>
						</ListItem>
						{contentTypes.map((contentType) => {
							return (
								<ListItem key={contentType._id} disablePadding>
									<ListItemButton
										id={`postListItemButton${contentType._id}`}
										data-testid={`postListItemButton${contentType._id}`}
										selected={contentTypeIdSelected === contentType._id}
										onClick={filterContentsByContentTypeId(contentType._id)}
									>
										<ListItemText primary={contentType.name} />
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>

					{isAuthenticated && (
						<>
							<Divider />
							<List>
								<ListItem disablePadding>
									<ListItemButton
										id='logoutListItemButton'
										data-testid='logoutListItemButton'
										onClick={handleLogout}
									>
										<ListItemIcon className='listItemIcon'>
											<LogoutIcon />
										</ListItemIcon>
										<ListItemText primary='Cerrar sesión' />
									</ListItemButton>
								</ListItem>
							</List>
						</>
					)}
				</Box>
			</Drawer>
		</Box>
	);
};

export default Sidebar;
