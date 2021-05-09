import { User } from "../user";
import { Association } from "./association";

export type Member = {
    role: string;
    user: User
    association: Association
}