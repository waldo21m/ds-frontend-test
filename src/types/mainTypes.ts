import { type StatusTypes } from './statusTypes';

interface ContentType {
	_id: string;
	name: string;
}

interface Topic {
	_id: string;
	name: string;
}

interface CreatedBy {
	_id: string;
	username: string;
}

export interface Content {
	_id: string;
	name: string;
	data: string;
	contentType: ContentType;
	topic: Topic;
	createdBy: CreatedBy;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface ContentResponse {
	contents: Content[];
	totalPages: number;
}

export interface MainState {
	contentResponse: ContentResponse;
	status: StatusTypes;
	error: string | null;
}
