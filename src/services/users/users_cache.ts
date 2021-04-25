import { User } from "../../types/user";
import { getUser } from "../api/user/user_requests";

var currentUser: User;
const loadedUsers: { [id: string]: User } = {};

export async function userCacheloadUser(userId: string): Promise<User> {
    var user: User = null;

    if (userId == currentUser.id) {
        debugger;
        user = currentUser;
    }
    else if (loadedUsers[userId]) {
        debugger;
        user = loadedUsers[userId];
    }
    
    else {
        debugger;
        user = await getUser(userId);
        loadedUsers[userId] = user;
    }

    return user;
}

export function userCacheCurrentUser(user: User) : void {
    currentUser = user;
}