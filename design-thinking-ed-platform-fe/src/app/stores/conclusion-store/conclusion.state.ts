import { UploadedFile } from '../../common/services/file-upload.service';

export interface ConclusionState {
  conclusion: Conclusion | null;
  files: UploadedFile[];
  loading: boolean;
  error: string | null;
}

export interface Conclusion {
  id: number;
  projectId: number;
  userId: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateConclusionDto {
  projectId: number;
  userId: number;
  description?: string;
}

export interface UpdateConclusionDto {
  description?: string;
}

export const initialConclusionState: ConclusionState = {
  conclusion: null,
  files: [],
  loading: false,
  error: null,
};
