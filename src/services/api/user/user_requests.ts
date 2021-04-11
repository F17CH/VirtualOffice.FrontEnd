import { LoginCredentials } from "../../../types/login_credentials";
import { LoginResult } from "../../../types/login_result";
import { User } from "../../../types/user";
import { setUserToken } from "../../user_token_manager";
import { getResponseBody } from "../api_utils";
import { nonAuthorizedRequest } from "../non_authorized_request";
import { userAuthorizedRequest } from "../user_authorized_request";
import { SignInResponse } from "./types/sign_in_response";

export async function postAttemptSignIn(loginCredentials: LoginCredentials): Promise<LoginResult> {
    var result: LoginResult = {
        success: false,
        message: "",
    }

    return await nonAuthorizedRequest(`http://localhost:4010/api/users/sign_in`,
        "post",
        {   headers: {"Content-Type": "application/json"},
            body: JSON.stringify(loginCredentials) }
    ).then(async (response) => {
        var signInResponse: SignInResponse = await getResponseBody<SignInResponse>(response);

        switch (response.status) {
            case 200: {
                setUserToken(signInResponse.token);

                result = {
                    success: true,
                    message: "Login Successful.",
                }
                break;
            }
            case 401: {
                result = {
                    success: false,
                    message: "Incorrect Username Or Password",
                }
            }
            default: {
                break;
            }
        }
        return result;
    });
}

export async function postSignOut(): Promise<boolean> {
    return await userAuthorizedRequest(`http://localhost:4010/api/users/sign_out`,
        "post",
    ).then((response) => {
        return response.ok;
        });

}

export async function getHealthCheck(): Promise<boolean> {
    return await userAuthorizedRequest(`http://localhost:4010/api/users/health`,
        "get",
    ).then((response) => {
        var result: boolean = false;

        if (response)
        {
            result = response.ok;
        }

        return result;
        });
}

export async function getSelf(): Promise<User> {
    return await userAuthorizedRequest(`http://localhost:4010/api/users/self`,
        "get",
    ).then((response) => {
        return getResponseBody<User>(response);
        });
}