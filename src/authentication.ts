import { request } from './utils'

/**
 * general response containing the status, message and data
 */
export interface GeneralResponse {
  status: string
  msg: string
  data?: object
}

/**
 * request body for requesting a new JWT token.
 */
export interface JwtTokenRequest {
  username: string
  password: string
}

/**
 * response from requesting a new JWT token.
 */
export interface JwtTokenResponse {
  status: string
  msg: string
  token: string
  sid: string
}

/**
 * request body for requesting a username reminder e-mail
 */
export interface ForgottenUsernameRequest {
  email: string
}

/**
 * request body for requesting a password reminder a-mail
 */
export interface ForgottenPasswordRequest {
  username: string
}

/**
 * request body for reseting the password
 */
export interface PasswordResetRequest {
  username: string
  reset_code: string
  password: string
}

/**
 * Auth stores your authentication
 * authType can be 1 for API key and 2 for JWT token
 */
export class Auth {
    public authType: number
    public authorization: string = ''

    constructor(authType: number, auth: string) {
        this.authType = authType
        switch (authType) {
            case 1:
                this.authorization = auth
                break
            case 2:
                this.authorization = 'Bearer ' + auth
                break
            default:
                new Error('invalid authType, please give 1 or 2 as a value')
                break
        }
    }

    public setAuth(authType: number, auth: string) {
        this.authType = authType
        switch (authType) {
            case 1:
                this.authorization = auth
            case 2:
                this.authorization = 'Bearer ' + auth
            default:
                new Error('invalid authType, please give 1 or 2 as a value')
        }
    }
}

export let obtainJWT = (reqBody: JwtTokenRequest, key: string, environment: string): Promise<Response> => {
  const param = ['token-auth']
  return request('POST', param, reqBody, key, environment)
}

export let forgottenUsername = (reqBody: ForgottenUsernameRequest, key: string, environment: string): Promise<Response> => {
    const param = ['user', 'forgot-username']
    return request('POST', param, reqBody, key, environment)
}

export let forgottenPassword = (reqBody: ForgottenPasswordRequest, key: string, environment: string): Promise<Response> => {
    const param = ['user', 'forgot-password']
    return request('POST', param, reqBody, key, environment)
}

export let passwordReset = (reqBody: PasswordResetRequest, key: string, environment: string): Promise<Response> => {
    const param = ['user', 'forgotten-password', 'reset']
    return request('POST', param, reqBody, key, environment)
}

export let tokenLogout = (key: string, environment: string): Promise<Response> => {
    const param = ['logout']
    return request('GET', param, {}, key, environment)
}
