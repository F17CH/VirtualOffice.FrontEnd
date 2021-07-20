export async function getDataResponseBody<T>(response: Response): Promise<T> {
    const text: string = await response.text();

    let data: T = null;

    if (text) {
        data = JSON.parse(text).data;
    }

    return data;
}

export async function getErrorResponseBody<T>(response: Response): Promise<T> {
    const text: string = await response.text();

    let data: T = null;

    if (text) {
        data = JSON.parse(text).error;
    }

    return data;
}