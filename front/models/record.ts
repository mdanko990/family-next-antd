import Person from "./person";
import { Role } from "./role";
import { Status } from "./status";
import { Type } from "./type";

export type Event = 'birth' | 'marriage' | 'death';

export type AgeUnitType = 'y' | 'm' | 'w' | 'd';

export class Record {
  _id: string = '';
  lastName: string = '';
  maidenName: string = '';
  firstName: string = '';
  patronym: string = '';
  isMain: string = '';
  role: Role = new Role();
  status: Status = new Status();
  age: number | null = null;
  ageUnit: AgeUnitType = 'y';
  comment: string = '';
  document: Document = new Document();
}

export class Document {
  _id: string = '';
  type: Type | null = null;
  date: Date | null = null;
  location: string = '';
  archive: string = '';
  fond: string = '';
  inventory: string = '';
  file: string = '';
  page: number = 0;
  link: string = '';
  records?: Record[] = [];
  members?: MemberList;
}

export class MemberList {
  child?: Record;
  mother?: Record;
  father?: Record;
  godmother?: Record;
  godfather?: Record;
}