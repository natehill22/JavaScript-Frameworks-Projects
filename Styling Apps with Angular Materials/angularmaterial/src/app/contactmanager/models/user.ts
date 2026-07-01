import { Note } from "./note";

//Defines a User class and its properties (types)
export class User {
    id: number = 0;
    birthDate: Date = new Date();
    name: string = '';
    avatar: string = '';
    bio: string = '';

    notes: Note[] = [];
}
