import { Association } from "./group/association";

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    associations: Association[];
}