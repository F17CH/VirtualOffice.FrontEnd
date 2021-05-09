import { Member } from "./member";

export type Association = {
    id: string;
    name: string;
    members: Member[];
}