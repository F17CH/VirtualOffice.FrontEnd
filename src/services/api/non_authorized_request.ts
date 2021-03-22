export async function nonAuthorizedRequest(url: string, method: string, options?: {headers?: any, body?: any}): Promise<Response> {
    const { headers, body } = options || {headers: undefined, body: undefined, token: undefined};
    const response = await fetch(url, getRequestInit(method, headers, body));

    return response;
}

function getRequestInit(method: string, headers?: any, body?: any): RequestInit {
    const request: RequestInit = {method: method};

    request.headers = headers;

    if (body) {
        request.body = body;
    }

    return request;
}