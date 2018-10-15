import { AxiosRequestConfig } from 'axios'
import { Agent } from 'https'
import { doRequest } from './utils'

/**
 * response for a user
 */
export interface UserResponse {
  status: string
  msg: string
  data?: UserResponseData
}

interface UserResponseData {
  id: string
  username: string
  name: string
  phone: string
  email: string
  timezone: string
  status: string
  role: string
  account_type: string
  account_type_id: string
  permissions: UserPermissions
  two_factor_enabled: boolean
  created_at: string
  updated_at: string
}

interface UserPermissions {
  manage_users: boolean
  manage_api_keys: boolean
  view_billing_reports: boolean
  manage_terminals: boolean
  manage_rule_engine: boolean
  view_settlement_batches: boolean
  process_authorization: boolean
  process_capture: boolean
  process_sale: boolean
  process_void: boolean
  process_credit: boolean
  process_refund: boolean
  process_verification: boolean
}

/**
 * request body for changing a password
 */
export interface ChangePasswordRequest {
  username: string
  current_password: string
  new_password: string
}

/**
 * request body for creating a new user
 * @param status can be active or disabled
 * @param role can be admin or standard
 */
export interface CreateUserRequest {
  username: string
  name: string
  phone: string
  email: string
  timezone: string
  password: string
  status: string
  role: string
}

/**
 * request body for updating a user
 */
export interface UpdateUserRequest {
  name: string
  phone: string
  email: string
  timezone: string
  status: string
  role: string
}

/**
 * response for all the users
 */
export interface UsersResponse {
  status: string
  msg: string
  total_count: number
  data?: UserResponseData[]
}

export let changePassword = (config: AxiosRequestConfig, client: Agent, reqBody: ChangePasswordRequest, key: string, sandbox: boolean, localDev: boolean) => {
  const params = ['user', 'change-password']
  return doRequest(config, client, 'POST', params, reqBody, key, sandbox, localDev)
}

export let createUser = (config: AxiosRequestConfig, client: Agent, reqBody: CreateUserRequest, key: string, sandbox: boolean, localDev: boolean) => {
  const params = ['user']
  return doRequest(config, client, 'POST', params, reqBody, key, sandbox, localDev)
}

export let updateUser = (config: AxiosRequestConfig, client: Agent, reqBody: UpdateUserRequest, userID: string, key: string, sandbox: boolean, localDev: boolean) => {
  const params = ['user', userID]
  return doRequest(config, client, 'POST', params, reqBody, key, sandbox, localDev)
}

export let getUser = (config: AxiosRequestConfig, client: Agent, userID: string, key: string, sandbox: boolean, localDev: boolean) => {
  const params = ['user', userID]
  return doRequest(config, client, 'GET', params, {}, key, sandbox, localDev)
}

export let getCurrentUser = (config: AxiosRequestConfig, client: Agent, key: string, sandbox: boolean, localDev: boolean) => {
  const params = ['user']
  return doRequest(config, client, 'GET', params, {}, key, sandbox, localDev)
}

export let getUsers = (config: AxiosRequestConfig, client: Agent, key: string, sandbox: boolean, localDev: boolean) => {
  const params = ['users']
  return doRequest(config, client, 'GET', params, {}, key, sandbox, localDev)
}

export let deleteUser = (config: AxiosRequestConfig, client: Agent, userID: string, key: string, sandbox: boolean, localDev: boolean) => {
  const params = ['user', userID]
  return doRequest(config, client, 'DELETE', params, {}, key, sandbox, localDev)
}
