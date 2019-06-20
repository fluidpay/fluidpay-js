import { Address } from './transactions';
export interface CreateCustomerRequest {
    description: string;
    payment_method: {
        card: CustomerPaymentRequest;
    };
    billing_address: Address;
    shipping_address: Address;
}
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
export interface UpdateCustomerRequest {
    description: string;
    payment_method: string;
    payment_method_id: string;
    billing_address_id: string;
    shipping_address_id: string;
}
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
export interface CustomerAddressResponse {
    status: string;
    msg: string;
    data?: CustomerAddressResponseData;
}
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
export interface CustomerPaymentRequest {
    card_number: string;
    expiration_date: string;
}
export interface CustomerPaymentResponse {
    status: string;
    msg: string;
    data?: CustomerPaymentMethodResponse;
}
export interface CustomerPaymentsResponse {
    status: string;
    msg: string;
    data?: CustomerPaymentMethodResponse[];
    total_count: number;
}
export declare let createCustomer: (reqBody: CreateCustomerRequest, key: string, environment: string) => Promise<Response>;
export declare let getCustomer: (customerID: string, key: string, environment: string) => Promise<Response>;
export declare let updateCustomer: (reqBody: UpdateCustomerRequest, customerID: string, key: string, environment: string) => Promise<Response>;
export declare let deleteCustomer: (customerID: string, key: string, environment: string) => Promise<Response>;
export declare let createCustomerAddress: (reqBody: CustomerAddressRequest, customerID: string, key: string, environment: string) => Promise<Response>;
export declare let getCustomerAddresses: (customerID: string, key: string, environment: string) => Promise<Response>;
export declare let getCustomerAddress: (customerID: string, addressTokenID: string, key: string, environment: string) => Promise<Response>;
export declare let updateCustomerAddress: (reqBody: CustomerAddressRequest, customerID: string, addressTokenID: string, key: string, environment: string) => Promise<Response>;
export declare let deleteCustomerAddress: (customerID: string, addressTokenID: string, key: string, environment: string) => Promise<Response>;
export declare let createCustomerPayment: (reqBody: CustomerPaymentRequest, customerID: string, paymentType: string, key: string, environment: string) => Promise<Response>;
export declare let getCustomerPayments: (customerID: string, paymentType: string, key: string, environment: string) => Promise<Response>;
export declare let getCustomerPayment: (customerID: string, paymentType: string, paymentTokenID: string, key: string, environment: string) => Promise<Response>;
export declare let updateCustomerPayment: (reqBody: CustomerPaymentRequest, customerID: string, paymentType: string, paymentTokenID: string, key: string, environment: string) => Promise<Response>;
export declare let deleteCustomerPayment: (customerID: string, paymentType: string, paymentTokenID: string, key: string, environment: string) => Promise<Response>;
export {};
