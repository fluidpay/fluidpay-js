/// <reference types="node" />
import { AxiosRequestConfig } from 'axios';
import { Agent } from 'https';
import { KeyRequest } from './apikey';
import { JwtTokenRequest, ForgottenUsernameRequest, ForgottenPasswordRequest, PasswordResetRequest } from './authentication';
import { CreateCustomerRequest, UpdateCustomerRequest, CustomerAddressRequest, CustomerPaymentRequest } from './customers';
import { RecurrenceRequest, PlanRequest, SubscriptionRequest } from './recurring';
import { TransactionRequest, TransactionQueryRequest, TransactionCaptureRequest, TransactionRefundRequest } from './transactions';
import { ChangePasswordRequest, CreateUserRequest, UpdateUserRequest } from './users';
export interface Constructor {
    config?: AxiosRequestConfig;
    client?: Agent;
    apiKey: string;
    sandbox?: boolean;
    localDev?: boolean;
}
/**
 * The Fluidpay sdk.
 * @param config is for additional config for axios (optional)
 * @param client is the httpsAgent you want to use (optional)
 * @param apiKey is the authentication key
 * @param sandbox true for test enviroment (default: false)
 */
export default class Fluidpay {
    private config;
    private client;
    private apiKey;
    private sandbox;
    private localdev;
    constructor(info: Constructor);
    /**
     * creates a new API key
     */
    createKey(reqBody: KeyRequest): import("axios").AxiosPromise<any>;
    /**
     * get all the API keys to a user
     */
    getKeys(): import("axios").AxiosPromise<any>;
    /**
     * deletes the API key identified by the ID
     */
    deleteKey(apiKey: string): import("axios").AxiosPromise<any>;
    /**
     * obtains a new JWT token
     */
    obtainJWT(reqBody: JwtTokenRequest): import("axios").AxiosPromise<any>;
    /**
     * requests a reminder e-mail for the username
     */
    forgottenUsername(reqBody: ForgottenUsernameRequest): import("axios").AxiosPromise<any>;
    /**
     * requests a reminder e-mail containing a reset code for the password
     */
    forgottenPassword(reqBody: ForgottenPasswordRequest): import("axios").AxiosPromise<any>;
    /**
     * resets your password to the one given in the request body
     */
    passwordReset(reqBody: PasswordResetRequest): import("axios").AxiosPromise<any>;
    /**
     * terminates a valid authentication token
     */
    tokenLogout(): import("axios").AxiosPromise<any>;
    /**
     * creates a new customer token
     */
    createCustomer(reqBody: CreateCustomerRequest): import("axios").AxiosPromise<any>;
    /**
     * returns a specific customer token identified by ID
     */
    getCustomer(customerId: string): import("axios").AxiosPromise<any>;
    /**
     * updates a specific customer token identified by ID
     */
    updateCustomer(reqBody: UpdateCustomerRequest, customerId: string): import("axios").AxiosPromise<any>;
    /**
     * deletes a specific customer token identified by the ID
     */
    deleteCustomer(customerId: string): import("axios").AxiosPromise<any>;
    /**
     * creates a new customer Address token
     */
    createCustomerAddress(reqBody: CustomerAddressRequest, customerId: string): import("axios").AxiosPromise<any>;
    /**
     * returns an Address token of a customer both identified by ID
     */
    getCustomerAddress(customerId: string, addressTokenId: string): import("axios").AxiosPromise<any>;
    /**
     * returns all the Address tokens of a customer identified by ID
     */
    getCustomerAddresses(customerId: string): import("axios").AxiosPromise<any>;
    /**
     * updates an Address token of a customer both identified by ID
     */
    updateCustomerAddress(reqBody: CustomerAddressRequest, customerId: string, addressTokenId: string): import("axios").AxiosPromise<any>;
    /**
     * deletes an Address token of a customer both identified by the ID
     */
    deleteCustomerAddress(customerId: string, addressTokenId: string): import("axios").AxiosPromise<any>;
    /**
     * creates a new customer payment token
     */
    createCustomerPayment(reqBody: CustomerPaymentRequest, customerId: string, paymentType: string): import("axios").AxiosPromise<any>;
    /**
     * returns a payment token of a customer both identified by ID
     */
    getCustomerPayment(customerId: string, paymentType: string, paymentTokenId: string): import("axios").AxiosPromise<any>;
    /**
     * returns all the payment tokens of a customer identified by ID
     */
    getCustomerPayments(customerId: string, paymentType: string): import("axios").AxiosPromise<any>;
    /**
     * updates a payment token of a customer both identified by ID
     */
    updateCustomerPayment(reqBody: CustomerPaymentRequest, customerId: string, paymentType: string, paymentTokenId: string): import("axios").AxiosPromise<any>;
    /**
     * deletes a payment token of a customer both identified by the ID
     */
    deleteCustomerPayment(customerId: string, paymentType: string, paymentTokenId: string): import("axios").AxiosPromise<any>;
    /**
     * creates a new add on
     */
    createAddOn(reqBody: RecurrenceRequest): import("axios").AxiosPromise<any>;
    /**
     * gets the add on identified by the ID
     */
    getAddOn(addOnId: string): import("axios").AxiosPromise<any>;
    /**
     * gets all add ons
     */
    getAddOns(): import("axios").AxiosPromise<any>;
    /**
     * updates the add on identified by the ID
     */
    updateAddOn(reqBody: RecurrenceRequest, addOnId: string): import("axios").AxiosPromise<any>;
    /**
     * deletes the add on identified by the ID
     */
    deleteAddOn(addOnId: string): import("axios").AxiosPromise<any>;
    /**
     * creates a new discount
     */
    createDiscount(reqBody: RecurrenceRequest): import("axios").AxiosPromise<any>;
    /**
     * gets the discount identified by the ID
     */
    getDiscount(discountId: string): import("axios").AxiosPromise<any>;
    /**
     * gets all discounts
     */
    getDiscounts(): import("axios").AxiosPromise<any>;
    /**
     * updates the discount identified by the ID
     */
    updateDiscount(reqBody: RecurrenceRequest, discountId: string): import("axios").AxiosPromise<any>;
    /**
     * deletes the discount identified by the ID
     */
    deleteDiscount(discountId: string): import("axios").AxiosPromise<any>;
    /**
     * creates a new plan
     */
    createPlan(reqBody: PlanRequest): import("axios").AxiosPromise<any>;
    /**
     * gets the plan identified by the ID
     */
    getPlan(planId: string): import("axios").AxiosPromise<any>;
    /**
     * gets all plans
     */
    getPlans(): import("axios").AxiosPromise<any>;
    /**
     * updates the plan identified by the ID
     */
    updatePlan(reqBody: PlanRequest, planId: string): import("axios").AxiosPromise<any>;
    /**
     * deletes the plan identified by the ID
     */
    deletePlan(planId: string): import("axios").AxiosPromise<any>;
    /**
     * creates a new subscription
     */
    createSubscription(reqBody: SubscriptionRequest): import("axios").AxiosPromise<any>;
    /**
     * gets the subscription identified by the ID
     */
    getSubscription(subscriptionId: string): import("axios").AxiosPromise<any>;
    /**
     * updates the subscription identified by the ID
     */
    updateSubscription(reqBody: SubscriptionRequest, subscriptionId: string): import("axios").AxiosPromise<any>;
    /**
     * deletes the subscription identified by the ID
     */
    deleteSubscription(subscriptionId: string): import("axios").AxiosPromise<any>;
    /**
     * gets all the terminals
     */
    getTerminals(): import("axios").AxiosPromise<any>;
    /**
     * initiates a transaction
     */
    doTransaction(reqBody: TransactionRequest): import("axios").AxiosPromise<any>;
    /**
     * gets the status of a transaction identified by ID
     */
    getTransactionStatus(transactionId: string): import("axios").AxiosPromise<any>;
    /**
     * gets transactions identified by the values in the request body
     */
    queryTransaction(reqBody: TransactionQueryRequest): import("axios").AxiosPromise<any>;
    /**
     * captures an already authorized transaction identified by ID
     */
    captureTransaction(reqBody: TransactionCaptureRequest, transactionId: string): import("axios").AxiosPromise<any>;
    /**
     * voids a transaction with pending settlement identified by ID
     */
    voidTransaction(transactionId: string): import("axios").AxiosPromise<any>;
    /**
     * refunds a previously settled amount
     */
    refundTransacttion(reqBody: TransactionRefundRequest, transactionId: string): import("axios").AxiosPromise<any>;
    /**
     * changes your password to the one given in the request body
     */
    changePassword(reqBody: ChangePasswordRequest): import("axios").AxiosPromise<any>;
    /**
     * creates a new user
     */
    createUser(reqBody: CreateUserRequest): import("axios").AxiosPromise<any>;
    /**
     * gets the current user
     */
    getCurrentUser(): import("axios").AxiosPromise<any>;
    /**
     * gets the user identified by the ID
     */
    getUser(userId: string): import("axios").AxiosPromise<any>;
    /**
     * gets all users
     */
    getUsers(): import("axios").AxiosPromise<any>;
    /**
     * updates the user identified by the ID
     */
    updateUser(reqBody: UpdateUserRequest, userId: string): import("axios").AxiosPromise<any>;
    /**
     * deletes the user identified by the ID
     */
    deleteUser(userId: string): import("axios").AxiosPromise<any>;
}
