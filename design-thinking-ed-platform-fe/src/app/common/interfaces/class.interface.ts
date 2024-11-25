export interface ICreateClass {
  className: string | null;
  studentEmails: string | null;
  semester: string | null;
}

export interface IClass extends ICreateClass {
  professor: string | null;
}
