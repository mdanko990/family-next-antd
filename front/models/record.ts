import Person from "./person";
import { Role } from "./role";
import { Status } from "./status";

export type Event = 'birth' | 'marriage' | 'death';

export type AgeUnitType = 'y' | 'm' | 'w' | 'd';

export class Record {
  index: string = '';
  person: Person = new Person();
  is_main: string = '';
  event: string = '';
  date: Date | null = null;
  role: Role = new Role();
  status: Status = new Status();
  age: number | null = null;
  ageUnit: AgeUnitType = 'y';
  comments: string = '';
  registrationLocation: string = '';
  archive: string = '';
  fond: string = '';
  inventory: string = '';
  file: string = '';
  page: number = 0;
  link: string = '';
}