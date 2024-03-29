import { LoginCredentials } from "../../../types/login_credentials";
import { LoginResult } from "../../../types/login_result";
import { RegisterCredentials } from "../../../types/register_credentials";
import { SessionUser } from "../../../types/session_user";
import { User } from "../../../types/user";
import { setUserToken } from "../../user_token_manager";
import { getDataResponseBody, getErrorResponseBody } from "../api_utils";
import { ErrorResponse } from "../error_response";
import { nonAuthorizedRequest } from "../non_authorized_request";
import { userAuthorizedRequest } from "../user_authorized_request";
import { SignInResponse } from "./types/sign_in_response";

export async function postAttemptSignIn(loginCredentials: LoginCredentials): Promise<LoginResult> {
    var result: LoginResult = {
        success: false,
        message: "",
    }

    return await nonAuthorizedRequest(`${process.env.VIRTUAL_OFFICE_API_URL}/users/sign_in`,
        "post",
        {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginCredentials)
        }
    ).then(async (response) => {
        var signInResponse: SignInResponse = await getDataResponseBody<SignInResponse>(response);

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
                break;
            }
            default: {
                result = {
                    success: false,
                    message: "Unknown Error has occured.",
                }
                break;
            }
        }
        return result;
    });
}

export async function postAttemptRegister(registerCredentials: RegisterCredentials): Promise<LoginResult> {
    var result: LoginResult = {
        success: false,
        message: "",
    }

    return await nonAuthorizedRequest(`${process.env.VIRTUAL_OFFICE_API_URL}/users/sign_up`,
        "post",
        {
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerCredentials)
        }
    ).then(async (response) => {
        switch (response.status) {
            case 200: {
                var signInResponse: SignInResponse = await getDataResponseBody<SignInResponse>(response);

                setUserToken(signInResponse.token);

                result = {
                    success: true,
                    message: "Login Successful.",
                }
                break;
            }
            case 422: {
                var errorResponse: ErrorResponse = await getErrorResponseBody<ErrorResponse>(response);

                result = {
                    success: false,
                    message: errorResponse.details
                }
                break;
            }
            default: {
                result = {
                    success: false,
                    message: "Unknown Error has occured.",
                }
                break;
            }
        }
        return result;
    });
}


export async function postSignOut(): Promise<boolean> {
    return await userAuthorizedRequest(`${process.env.VIRTUAL_OFFICE_API_URL}/users/sign_out`,
        "post",
    ).then((response) => {
        return response.ok;
    });

}

export async function getCurrentUser(): Promise<SessionUser | null> {
    return await userAuthorizedRequest(`${process.env.VIRTUAL_OFFICE_API_URL}/users/current`,
        "get",
    ).then(async (response) => {
        var result: SessionUser | null = null;

        if (response) {
            result = await getDataResponseBody<SessionUser>(response);
        }

        return result;
    });
}

export async function getUser(userId: string): Promise<User> {
    return await userAuthorizedRequest(`${process.env.VIRTUAL_OFFICE_API_URL}/users/${userId}`,
        "get",
    ).then((response) => {
        return getDataResponseBody<User>(response);
    });
}