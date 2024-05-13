import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
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
import { FetchStatutes } from '../utils/fetchStatuses.enum';
import { type SidebarProps } from '../types/sidebarTypes';
import { filterPosts, useMainSelector } from '../pages/main/slice/mainSlice';
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
	const { status, originalPosts, userIdSelected } = useMainSelector();
	const [users, setUsers] = useState<number[]>([]);

	const handleLogout = () => {
		localStorage.clear();
		sessionStorage.clear();

		navigate('/login');
		setOpen(false);
	};

	useEffect(() => {
		if (status === FetchStatutes.Succeeded) {
			const userIds = originalPosts.map((post) => post.userId);
			const uniqueUserIds = userIds.filter(
				(value, index, self) => self.indexOf(value) === index,
			);

			setUsers(uniqueUserIds);
		}
	}, [originalPosts, status]);

	const gotToHome = () => {
		navigate('/');
		setOpen(false);
	};

	const filterPostsByUserId = (userId: number) => () => {
		const filteredPosts = originalPosts.filter(
			(post) => post.userId === userId,
		);

		dispatch(filterPosts({ filteredPosts, userIdSelected: userId }));
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
								selected={userIdSelected === undefined}
								onClick={gotToHome}
							>
								<ListItemIcon className='listItemIcon'>
									<HomeIcon />
								</ListItemIcon>
								<ListItemText primary='Inicio' />
							</ListItemButton>
						</ListItem>
						{users.map((user) => {
							return (
								<ListItem key={user} disablePadding>
									<ListItemButton
										id={`postListItemButton${user}`}
										data-testid={`postListItemButton${user}`}
										selected={userIdSelected === user}
										onClick={filterPostsByUserId(user)}
									>
										<ListItemText primary={`Posts del usuario ${user}`} />
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>
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
				</Box>
			</Drawer>
		</Box>
	);
};

export default Sidebar;
