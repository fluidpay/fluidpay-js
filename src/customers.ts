import { request } from './utils'
import { Address } from './transactions'

/**
 * request to create a new customer token
 */
export interface CreateCustomerRequest {
  description: string
  payment_method: {
    card: CustomerPaymentRequest
  }
  billing_address: Address
  shipping_address: Address
}

/**
 * response for a customer token
 */
export interface CustomerResponse {
  status: string
  msg: string
  data?: {
    id: string
    description: string
    payment_method: CustomerPaymentMethodResponse
    payment_method_type: string
    billing_address: Address
    shipping_address: Address
    created_at: string
    updated_at: string
  }
}

interface CustomerPaymentMethodResponse {
  card: {
    id: string
    card_type: string
    first_six: string
    last_four: string
    masked_card: string
    expiration_date: string
    created_at: string
    updated_at: string
  }
  ach: string
}

/**
 * request to update a customer token
 */
export interface UpdateCustomerRequest {
  description: string
  payment_method: string
  payment_method_id: string
  billing_address_id: string
  shipping_address_id: string
}

/**
 * request to create or update a customer Address token
 */
export interface CustomerAddressRequest {
  first_name: string
  last_name: string
  company: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
  phone: string
  fax: string
  email: string
}

/**
 * response from a customer Address token
 */
export interface CustomerAddressResponse {
  status: string
  msg: string
  data?: CustomerAddressResponseData
}

/**
 * response from getting all of the customer's Address tokens
 */
export interface CustomerAddressesResponse {
  status: string
  msg: string
  data?: CustomerAddressResponseData[]
  total_count: number
}

interface CustomerAddressResponseData {
  id: string
  customer_id: string
  first_name: string
  last_name: string
  company: string
  address_line_1: string
  address_line_2?: string
  city: string
  state: string
  postal_code: string
  country: string
  phone: string
  fax: string
  email: string
  created_at: string
  updated_at: string
}

/**
 * request to create or update a customer payment token
 */
export interface CustomerPaymentRequest {
  card_number: string
  expiration_date: string
}

/**
 * response from a customer payment token
 */
export interface CustomerPaymentResponse {
  status: string
  msg: string
  data?: CustomerPaymentMethodResponse
}

/**
 * response from getting all of the customer's payment tokens
 */
export interface CustomerPaymentsResponse {
  status: string
  msg: string
  data?: CustomerPaymentMethodResponse[]
  total_count: number
}

export let createCustomer = (reqBody: CreateCustomerRequest, key: string, environment: string): Promise<Response> => {
  const param = ['customer']
  return request('POST', param, reqBody, key, environment)
}

export let getCustomer = (customerID: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID]
  return request('GET', param, {}, key, environment)
}

export let updateCustomer = (reqBody: UpdateCustomerRequest, customerID: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID]
  return request('POST', param, reqBody, key, environment)
}

export let deleteCustomer = (customerID: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID]
  return request('DELETE', param, {}, key, environment)
}

// --------------------- Customer Address section. --------------------------

export let createCustomerAddress = (reqBody: CustomerAddressRequest,
                                    customerID: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID, 'address']
  return request('POST', param, reqBody, key, environment)
}

export let getCustomerAddresses = (customerID: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID, 'addresses']
  return request('GET', param, {}, key, environment)
}

export let getCustomerAddress = (customerID: string, addressTokenID: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID, 'address', addressTokenID]
  return request('GET', param, {}, key, environment)
}

export let updateCustomerAddress = (reqBody: CustomerAddressRequest,
                                    customerID: string, addressTokenID: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID, 'address', addressTokenID]
  return request('POST', param, reqBody, key, environment)
}

export let deleteCustomerAddress = (customerID: string, addressTokenID: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID, 'address', addressTokenID]
  return request('DELETE', param, {}, key, environment)
}

// --------------------- Customer payment section. --------------------------

export let createCustomerPayment = (reqBody: CustomerPaymentRequest,
                                    customerID: string, paymentType: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID, 'paymentmethod', paymentType]
  return request('POST', param, reqBody, key, environment)
}

export let getCustomerPayments = (customerID: string, paymentType: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID, 'paymentmethod', paymentType]
  return request('GET', param, {}, key, environment)
}

export let getCustomerPayment = (customerID: string, paymentType: string, paymentTokenID: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID, 'paymentmethod', paymentType, paymentTokenID]
  return request('GET', param, {}, key, environment)
}

export let updateCustomerPayment = (
  reqBody: CustomerPaymentRequest,
  customerID: string, paymentType: string, paymentTokenID: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID, 'paymentmethod', paymentType, paymentTokenID]
  return request('POST', param, reqBody, key, environment)
}

export let deleteCustomerPayment = (customerID: string, paymentType: string, paymentTokenID: string, key: string, environment: string): Promise<Response> => {
  const param = ['customer', customerID, 'paymentmethod', paymentType, paymentTokenID]
  return request('DELETE', param, {}, key, environment)
}
