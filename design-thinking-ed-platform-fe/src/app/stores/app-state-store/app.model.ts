import { UserStoreModel } from '../user-state-store/user.model';

export interface AppState {
  users: UserStoreModel;
}
