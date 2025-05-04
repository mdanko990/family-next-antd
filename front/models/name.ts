export class Name {
    _id: string = '';
    name: string = '';
}

export type Gender = 'F' | 'M';

export class FirsName extends Name {
    similar: Name[] | null = null;
    gender: Gender = 'M';
}