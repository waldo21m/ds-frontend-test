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
import {
	filterPosts,
	showAllPosts,
	useMainSelector,
} from '../pages/main/slice/mainSlice';
import { useAppDispatch } from '../hooks/reduxHooks';
import DisruptiveStudio from '../assets/disruptive-studio-logo.svg';
import './Sidebar.css';

const handleLogout = () => {
	localStorage.clear();
	sessionStorage.clear();

	window.location.href = `${import.meta.env.VITE_HOST_BASE}`;
};

const Sidebar: React.FC<SidebarProps> = ({
	open,
	setOpen,
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
							src={DisruptiveStudio}
							alt='Disruptive Studio logo'
							className='dsLogo'
						/>
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
			</Drawer>
		</Box>
	);
};

export default Sidebar;
