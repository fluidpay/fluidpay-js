/// <reference types="node" />
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { Agent } from 'https';
import { Address } from './transactions';
/**
 * request to create a new customer token
 */
export interface CreateCustomerRequest {
    description: string;
    payment_method: {
        card: CustomerPaymentRequest;
    };
    billing_address: Address;
    shipping_address: Address;
}
/**
 * response for a customer token
 */
export interface CustomerResponse {
    status: string;
    msg: string;
    data?: {
        id: string;
        description: string;
        payment_method: CustomerPaymentMethodResponse;
        payment_method_type: string;
        billing_address: Address;
        shipping_address: Address;
        created_at: string;
        updated_at: string;
    };
}
interface CustomerPaymentMethodResponse {
    card: {
        id: string;
        card_type: string;
        first_six: string;
        last_four: string;
        masked_card: string;
        expiration_date: string;
        created_at: string;
        updated_at: string;
    };
    ach: string;
}
/**
 * request to update a customer token
 */
export interface UpdateCustomerRequest {
    description: string;
    payment_method: string;
    payment_method_id: string;
    billing_address_id: string;
    shipping_address_id: string;
}
/**
 * request to create or update a customer Address token
 */
export interface CustomerAddressRequest {
    first_name: string;
    last_name: string;
    company: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
    fax: string;
    email: string;
}
/**
 * response from a customer Address token
 */
export interface CustomerAddressResponse {
    status: string;
    msg: string;
    data?: CustomerAddressResponseData;
}
/**
 * response from getting all of the customer's Address tokens
 */
export interface CustomerAddressesResponse {
    status: string;
    msg: string;
    data?: CustomerAddressResponseData[];
    total_count: number;
}
interface CustomerAddressResponseData {
    id: string;
    customer_id: string;
    first_name: string;
    last_name: string;
    company: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
    fax: string;
    email: string;
    created_at: string;
    updated_at: string;
}
/**
 * request to create or update a customer payment token
 */
export interface CustomerPaymentRequest {
    card_number: string;
    expiration_date: string;
}
/**
 * response from a customer payment token
 */
export interface CustomerPaymentResponse {
    status: string;
    msg: string;
    data?: CustomerPaymentMethodResponse;
}
/**
 * response from getting all of the customer's payment tokens
 */
export interface CustomerPaymentsResponse {
    status: string;
    msg: string;
    data?: CustomerPaymentMethodResponse[];
    total_count: number;
}
export declare let createCustomer: (config: AxiosRequestConfig, client: Agent, reqBody: CreateCustomerRequest, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let getCustomer: (config: AxiosRequestConfig, client: Agent, customerID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let updateCustomer: (config: AxiosRequestConfig, client: Agent, reqBody: UpdateCustomerRequest, customerID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let deleteCustomer: (config: AxiosRequestConfig, client: Agent, customerID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let createCustomerAddress: (config: AxiosRequestConfig, client: Agent, reqBody: CustomerAddressRequest, customerID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let getCustomerAddresses: (config: AxiosRequestConfig, client: Agent, customerID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let getCustomerAddress: (config: AxiosRequestConfig, client: Agent, customerID: string, addressTokenID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let updateCustomerAddress: (config: AxiosRequestConfig, client: Agent, reqBody: CustomerAddressRequest, customerID: string, addressTokenID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let deleteCustomerAddress: (config: AxiosRequestConfig, client: Agent, customerID: string, addressTokenID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let createCustomerPayment: (config: AxiosRequestConfig, client: Agent, reqBody: CustomerPaymentRequest, customerID: string, paymentType: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let getCustomerPayments: (config: AxiosRequestConfig, client: Agent, customerID: string, paymentType: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let getCustomerPayment: (config: AxiosRequestConfig, client: Agent, customerID: string, paymentType: string, paymentTokenID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let updateCustomerPayment: (config: AxiosRequestConfig, client: Agent, reqBody: CustomerPaymentRequest, customerID: string, paymentType: string, paymentTokenID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let deleteCustomerPayment: (config: AxiosRequestConfig, client: Agent, customerID: string, paymentType: string, paymentTokenID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export {};
