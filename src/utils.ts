const urlProduction: string = 'https://app.fluidpay.com/api'
const urlSandbox: string = 'https://sandbox.fluidpay.com/api'
const urlLocalDev: string = 'http://localhost:8001/api'

/**
 * doRequest returns the response.data from the API
 * @param method is to set the request method
 * @param params are the building blocks for the url path
 * @param data is the request body sent
 * @param apiKey is the authentication key
 * @param enviroment is the enviroment
 */
export function request(method: any, params: string[], body: any, apiKey: string, enviroment: string): Promise<Response> {
  let url = ''
  if (enviroment === 'production') {
    url = urlProduction + '/' + params.join('/')
  } else if (enviroment === 'sandbox') {
    url = urlSandbox + '/' + params.join('/')
  } else if (enviroment === 'development') {
    url = urlLocalDev + '/' + params.join('/')
  }

  const options = {
    method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'credentials': 'include',
      'Authorization': apiKey
    },
    body: JSON.stringify(body)
  }

  return fetch(url, options)
  .then((resp: Response) => {
    const json = resp.json()
    if (!resp.ok) { return json.then(Promise.reject.bind(Promise)) }
    return json
  })
}
