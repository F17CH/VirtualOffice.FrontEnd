export type RegisterCredentials = {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirmation: string;
}

export function getBlankCredentials(): RegisterCredentials {
    let registerCredentials: RegisterCredentials = { email: "", first_name: "", last_name: "", password: "", password_confirmation: "" }

    return registerCredentials;
}