import { UploadedFile } from '../../common/services/file-upload.service';

export interface PrototypeState {
  prototype: Prototype | null;
  files: UploadedFile[];
  loading: boolean;
  error: string | null;
}

export interface Prototype {
  id: number;
  projectId: number;
  userId: number;
  description: string;
  isFinalized: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePrototypeDto {
  projectId: number;
  userId: number;
  description?: string;
}

export interface UpdatePrototypeDto {
  description?: string;
  isFinalized?: boolean;
}

export const initialPrototypeState: PrototypeState = {
  prototype: null,
  files: [],
  loading: false,
  error: null,
};
