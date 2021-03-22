import { deleteItem, getItem, saveItem } from "./device_storage"

const userToken: string = "userToken"

export function setUserToken(token: string) : void {
    saveItem(userToken, token);
}

export function getUserToken() : string {
    return getItem(userToken);
}

export function deleteUserToken() : void {
    deleteItem(userToken);
}