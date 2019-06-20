import { request } from './utils'

/**
 * request for creating a new API key for a user
 */
export interface KeyRequest {
  type: string
  name: string
}

/**
 * response for creating a new API key for a user
 */
export interface KeyResponse {
  status: string
  msg: string
  data: KeyResponseData
}

interface KeyResponseData {
  id: string
  user_id: string
  type: string
  name: string
  api_key: string
  created_at: string
  updated_at: string
}

/**
 * response for getting all the keys for a user
 */
export interface KeysResponse {
  status: string
  msg: string
  total_count: number
  data?: KeyResponseData[]
}

export let createKey = (reqBody: KeyRequest, key: string, environment: string) => {
  const params = ['user', 'apikey']
  return request('POST', params, reqBody, key, environment)
}

export let getKeys = (key: string, environment: string) => {
  const params = ['user', 'apikeys']
  return request('GET', params, {}, key, environment)
}

export let deleteKey = (apiKey: string, key: string, environment: string) => {
  const params = ['user', 'apikey', apiKey]
  return request('DELETE', params, {}, key, environment)
}
