import { IClass } from "./class.interface";
import { IUser } from "./user.interface";

export interface IGroup {
    id: number;
    groupName: string;
    students: IUser[];
    class: IClass;

}
