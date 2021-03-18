import { User } from "./user";

export type LoginResult = {
    success: boolean;
    message: string;
    user: User;
}