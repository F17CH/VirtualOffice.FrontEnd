import { request } from "../lib/request";
import { LoginCredentials } from "../types/login_credentials";
import { LoginResult } from "../types/login_result";

export async function postAttemptLogin(loginCredentials: LoginCredentials): Promise<LoginResult> {
    var result: LoginResult = {
        success: false,
        message: ""
    }

    return await request(`http://localhost:4001/api/users/sign_in`,
        "post",
        {   headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginCredentials) }
    ).then((response) => {
        switch (response.status) {
            case 200: {
                result = {
                    success: true,
                    message: "Login Successful."
                }
                break;
            }
            case 401: {
                result = {
                    success: false,
                    message: "Incorrect Username Or Password"
                }
            }
            default: {
                break;
            }
        }
        return result;
    });
}