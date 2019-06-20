export interface GeneralResponse {
    status: string;
    msg: string;
    data?: object;
}
export interface JwtTokenRequest {
    username: string;
    password: string;
}
export interface JwtTokenResponse {
    status: string;
    msg: string;
    token: string;
    sid: string;
}
export interface ForgottenUsernameRequest {
    email: string;
}
export interface ForgottenPasswordRequest {
    username: string;
}
export interface PasswordResetRequest {
    username: string;
    reset_code: string;
    password: string;
}
export declare class Auth {
    authType: number;
    authorization: string;
    constructor(authType: number, auth: string);
    setAuth(authType: number, auth: string): void;
}
export declare let obtainJWT: (reqBody: JwtTokenRequest, key: string, environment: string) => Promise<Response>;
export declare let forgottenUsername: (reqBody: ForgottenUsernameRequest, key: string, environment: string) => Promise<Response>;
export declare let forgottenPassword: (reqBody: ForgottenPasswordRequest, key: string, environment: string) => Promise<Response>;
export declare let passwordReset: (reqBody: PasswordResetRequest, key: string, environment: string) => Promise<Response>;
export declare let tokenLogout: (key: string, environment: string) => Promise<Response>;
