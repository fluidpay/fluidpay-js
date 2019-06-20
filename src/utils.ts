const urlProduction: string = 'https://app.fluidpay.com/api'
const urlSandbox: string = 'https://sandbox.fluidpay.com/api'
const urlLocalDev: string = 'http://localhost:8001/api'

export function urlBuilder(params: string[]): string {
  let path = ''
  for (const p of params) {
    path += '/' + p
  }
  return path
}

/**
 * doRequest returns the response.data from the API
 * @param method is to set the request method
 * @param params are the building blocks for the url path
 * @param data is the request body sent
 * @param apiKey is the authentication key
 * @param enviroment is the enviroment
 */
export function request(method: any, params: string[], body: any, apiKey: string, enviroment: string): Promise<Response> {
  let url = urlBuilder(params)
  if (enviroment === 'production') {
    url = urlProduction + url
  } else if (enviroment === 'sandbox') {
    url = urlSandbox + url
  } else if (enviroment === 'development') {
    url = urlLocalDev + url
  }

  const options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': apiKey
    },
    body
  }

  return fetch(url, options)
}
