import { Role } from "./role";
import { Type } from "./type";

export class TypeRole {
    _id: string = '';
    role: Role | string = new Role();
    types: Type = new Type();
    limit: number = 0;
}