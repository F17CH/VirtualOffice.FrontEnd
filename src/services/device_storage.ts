export function saveItem(key: string, value: string) : void {
    try {
        window.localStorage.setItem(key, value);
    } catch (error) {
        console.log('Local Storage Error: ' + error.message);
    }
}

export function getItem(key: string) : string {
    var token = null;
    try {
        token = window.localStorage.getItem(key);
    } catch (error) {
        console.log('Local Storage Error: ' + error.message);
    }

    return token;
}

export function deleteItem(key: string) : void {
    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.log('Local Storage Error: ' + error.message);
    }
}