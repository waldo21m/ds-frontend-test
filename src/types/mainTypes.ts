import { type StatusTypes } from './statusTypes';

export interface Post {
	userId: number;
	id: number;
	title: string;
	body: string;
}

export interface MainState {
	userIdSelected?: number;
	originalPosts: Post[];
	posts: Post[];
	status: StatusTypes;
	error: string | null;
}

export interface FilterPosts {
	filteredPosts: Post[];
	userIdSelected: number;
}

export interface RemovePost {
	originalPosts: Post[];
	posts: Post[];
	userIdSelected?: number;
}

export type UpdatePost = Omit<RemovePost, 'userIdSelected'>;
