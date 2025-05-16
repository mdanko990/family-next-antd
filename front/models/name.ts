export class LastName {
    _id: string = '';
    name: string = '';
    male: string = '';
    female: string = '';
}

export type Gender = 'F' | 'M';

export class FirstName {
    _id: string = '';
    name: string = '';
    group: FirstName[] | null = null;
    gender: Gender = 'M';
    constructor(firstname: FirstName){
        this._id = firstname._id;
        this.gender = firstname.gender;
        this.name = firstname.name;
        this.group = firstname.group;
    }
}

export class FirstNameGroup {
    _id: string = '';
    group: FirstName[] | null = null;
    gender: Gender = 'M';
    constructor(firstname: FirstName){
        this._id = firstname._id;
        this.gender = firstname.gender;
        this.group = firstname.group;
    }
}