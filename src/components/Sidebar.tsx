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
	Typography,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { FetchStatutes } from '../utils/fetchStatuses.enum';
import { type SidebarProps } from '../types/sidebarTypes';
import {
	filterPosts,
	showAllPosts,
	useMainSelector,
} from '../pages/main/slice/mainSlice';
import { useAppDispatch } from '../hooks/reduxHooks';
import CleverpyLogo from '../assets/cleverpy-logo.jpeg';
import './Sidebar.css';

const handleLogout = () => {
	localStorage.clear();
	sessionStorage.clear();

	window.location.href = `${import.meta.env.VITE_HOST_BASE}`;
};

const Sidebar: React.FC<SidebarProps> = ({
	mobileOpen,
	setMobileOpen,
	handleDrawerTransitionEnd,
	handleDrawerClose,
}) => {
	const dispatch = useAppDispatch();
	const { status, originalPosts, userIdSelected } = useMainSelector();
	const [users, setUsers] = useState<number[]>([]);

	useEffect(() => {
		if (status === FetchStatutes.Succeeded) {
			const userIds = originalPosts.map((post) => post.userId);
			const uniqueUserIds = userIds.filter(
				(value, index, self) => self.indexOf(value) === index,
			);

			setUsers(uniqueUserIds);
		}
	}, [originalPosts, status]);

	const dispatchShowAllPosts = () => {
		dispatch(showAllPosts());
		setMobileOpen(false);
	};

	const filterPostsByUserId = (userId: number) => () => {
		const filteredPosts = originalPosts.filter(
			(post) => post.userId === userId,
		);

		dispatch(filterPosts({ filteredPosts, userIdSelected: userId }));
		setMobileOpen(false);
	};

	const drawer = (
		<Box className='drawerContainer' component='div'>
			<Toolbar className='drawerToolbarContainer'>
				<img src={CleverpyLogo} alt='Cleverpy logo' className='cleverpyLogo' />
				<Typography variant='h6' component='div'>
					Cleverpy test
				</Typography>
			</Toolbar>
			<Divider />
			<List className='listMenu'>
				<ListItem disablePadding>
					<ListItemButton
						id='homeListItemButton'
						data-testid='homeListItemButton'
						selected={userIdSelected === undefined}
						onClick={dispatchShowAllPosts}
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
	);

	return (
		<Box
			id='sidebarContainer'
			data-testid='sidebarContainer'
			className='sidebarContainer'
			component='nav'
			aria-label='Sidebar'
		>
			<Drawer
				className='mobileDrawer'
				variant='temporary'
				open={mobileOpen}
				onTransitionEnd={handleDrawerTransitionEnd}
				onClose={handleDrawerClose}
				ModalProps={{
					keepMounted: true,
				}}
			>
				{drawer}
			</Drawer>
			<Drawer className='desktopDrawer' variant='permanent' open>
				{drawer}
			</Drawer>
		</Box>
	);
};

export default Sidebar;
