export interface SidebarProps {
	mobileOpen: boolean;
	setMobileOpen: (mobileOpen: boolean) => void;
	handleDrawerTransitionEnd: () => void;
	handleDrawerClose: () => void;
}
