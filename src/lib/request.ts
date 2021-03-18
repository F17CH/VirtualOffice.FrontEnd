export async function request(url: string, method: string, options?: {headers?: any, body?: any}): Promise<Response> {
    const {headers, body} = options || {headers: undefined, body: undefined};
    const response: Response = await fetch(url, getRequestInit(method, headers, body));

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

async function getResponseBody<T>(response: Response): Promise<T> {
    const text: string = await response.text();

    let data: T = null;

    if (text) {
        data = JSON.parse(text);
    }

    return data;
}