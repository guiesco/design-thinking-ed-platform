import { IClass } from 'src/app/common/interfaces/class.interface';

export interface ClassStoreModel {
  classes: IClass[];
  selectedClass: IClass | null;
  loading: boolean;
  error: string | null;
}
