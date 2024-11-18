import { ProjectModel } from './project.model';
import { UserModel } from './user.model';

export interface GroupModel {
  students: UserModel[];
  groupName: string;
  project: ProjectModel;
}
