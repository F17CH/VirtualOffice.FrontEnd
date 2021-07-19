export interface ErrorResponse {
    error: InnerResponse
}

interface InnerResponse {
    code: number;
    details: string;
}