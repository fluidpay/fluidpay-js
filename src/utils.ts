import axios, { AxiosRequestConfig } from 'axios'
import { Agent } from 'https'


export const testApiKey: string = 'api_0wUsHIlrkK1I6ADno5MfT10UjhR'
const urlSandbox: string = 'https://sandbox.fluidpay.com/api'
const urlProduction: string = 'https://app.fluidpay.com/api'
const urlLocalDev: string = 'http://localhost:8001/api'

export function urlBuilder(params: string[]): string {
  let path = ''
  for (const p of params) {
    path += '/' + p
  }
  return path
}

/**
 * Create an Axios Client with defaults
 */
const clientt = axios.create()

/**
 * Interceptors would go here
 */
clientt.interceptors.response.use(
  (response) => response,
  // Do something with response error
  (error) => Promise.reject(error)
)

/**
 * doRequest returns the response.data from the API
 * @param config is for additional config for axios
 * @param client is the httpsAgent you want to use
 * @param method is to set the request method
 * @param params are the building blocks for the url path
 * @param body is the request body sent
 * @param apiKey is the authentication key
 * @param sandbox true for test enviroment
 * @param localDev true for development
 */
export function doRequest(config: AxiosRequestConfig, client: Agent, method: any, params: string[], body: object, apiKey: string, sandbox: boolean, localDev: boolean) {
  const url = (localDev ? urlLocalDev : (sandbox ? urlSandbox : urlProduction)) + urlBuilder(params)
  const options: AxiosRequestConfig = {
    method,
    baseURL: url,
    headers: { Authorization: apiKey },
    data: body,
    httpsAgent: client
  }
  return clientt(options)
}
