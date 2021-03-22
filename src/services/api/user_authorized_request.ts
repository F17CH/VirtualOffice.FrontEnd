import { getUserToken } from "../user_token_manager";

export async function userAuthorizedRequest(url: string, method: string, options?: {headers?: any, body?: any}): Promise<Response|null> {
    const { headers, body } = options || {headers: undefined, body: undefined, token: undefined};

    var userToken: string = getUserToken();

    var response;

    if (userToken)
    {
        response = await fetch(url, getRequestInit(method, userToken, headers, body));
    }
    else
    {
        response = null;
    }

    return response;
}

function getRequestInit(method: string, userToken: string, headers?: any, body?: any): RequestInit {
    const request: RequestInit = {method: method};

    headers = addAuthorizationHeader(headers, userToken)
    request.headers = headers;

    if (body) {
        request.body = body;
    }

    return request;
}

function addAuthorizationHeader(headers: any, userToken: string): HeadersInit {
    if (headers) {
        headers["Authorization"] = "Bearer " + userToken; 
    }
    else
    {
        headers = {"Authorization": "Bearer " + userToken};
    }

    return headers;
}

async function getResponseBody<T>(response: Response): Promise<T> {
    const text: string = await response.text();

    let data: T = null;

    if (text) {
        data = JSON.parse(text);
    }

    return data;
}