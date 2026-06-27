import { Note } from "./note";

export class User {
    id: number = 0;
    birthDate: Date = new Date();
    name: string = '';
    avatar: string = '';
    bio: string = '';

    notes: Note[] = [];
}
