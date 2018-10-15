/// <reference types="node" />
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { Agent } from 'https';
/**
 * general response containing the status, message and data
 */
export interface GeneralResponse {
    status: string;
    msg: string;
    data?: object;
}
/**
 * request body for requesting a new JWT token.
 */
export interface JwtTokenRequest {
    username: string;
    password: string;
}
/**
 * response from requesting a new JWT token.
 */
export interface JwtTokenResponse {
    status: string;
    msg: string;
    token: string;
    sid: string;
}
/**
 * request body for requesting a username reminder e-mail
 */
export interface ForgottenUsernameRequest {
    email: string;
}
/**
 * request body for requesting a password reminder a-mail
 */
export interface ForgottenPasswordRequest {
    username: string;
}
/**
 * request body for reseting the password
 */
export interface PasswordResetRequest {
    username: string;
    reset_code: string;
    password: string;
}
/**
 * Auth stores your authentication
 * authType can be 1 for API key and 2 for JWT token
 */
export declare class Auth {
    authType: number;
    authorization: string;
    constructor(authType: number, auth: string);
    setAuth(authType: number, auth: string): void;
}
export declare let obtainJWT: (config: AxiosRequestConfig, client: Agent, reqBody: JwtTokenRequest, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let forgottenUsername: (config: AxiosRequestConfig, client: Agent, reqBody: ForgottenUsernameRequest, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let forgottenPassword: (config: AxiosRequestConfig, client: Agent, reqBody: ForgottenPasswordRequest, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let passwordReset: (config: AxiosRequestConfig, client: Agent, reqBody: PasswordResetRequest, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let tokenLogout: (config: AxiosRequestConfig, client: Agent, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
