import { type StatusTypes } from './statusTypes';

export interface SidebarProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	handleDrawerTransitionEnd: () => void;
	handleDrawerClose: () => void;
}

export interface ContentType {
	_id: string;
	name: string;
	isDeleted: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface ContentTypeResponse {
	contentTypes: ContentType[];
}

export interface SidebarState {
	contentTypeIdSelected?: string;
	contentTypes: ContentType[];
	status: StatusTypes;
	error: string | null;
}
