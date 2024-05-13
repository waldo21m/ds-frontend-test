export interface SidebarProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	handleDrawerTransitionEnd: () => void;
	handleDrawerClose: () => void;
}
