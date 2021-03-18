import { request } from "../lib/request";
import { LoginCredentials } from "../types/login_credentials";
import { LoginResult } from "../types/login_result";
import { User } from "../types/user";

export async function postAttemptLogin(loginCredentials: LoginCredentials): Promise<LoginResult> {
    var result: LoginResult = {
        success: false,
        message: "",
        user: null
    }

    return await request(`http://localhost:4001/api/users/sign_in`,
        "post",
        {   headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginCredentials) }
    ).then(async (response) => {
        switch (response.status) {
            case 200: {
                debugger;
                var newUser: User = JSON.parse(await response.text());

                result = {
                    success: true,
                    message: "Login Successful.",
                    user: newUser
                }
                break;
            }
            case 401: {
                result = {
                    success: false,
                    message: "Incorrect Username Or Password",
                    user: null
                }
            }
            default: {
                break;
            }
        }
        return result;
    });
}