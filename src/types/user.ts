export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
}

export function getFullName(user: User): string {
    return user.firstName + " " + user.lastName
}