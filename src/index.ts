import { AxiosRequestConfig } from 'axios'
import { Agent } from 'https'

import { createKey, getKeys, deleteKey, KeyRequest } from './apikey'
import {
  obtainJWT, forgottenUsername, forgottenPassword, passwordReset, tokenLogout,
  JwtTokenRequest, ForgottenUsernameRequest, ForgottenPasswordRequest, PasswordResetRequest
} from './authentication'
import {
  createCustomer, getCustomer, updateCustomer, deleteCustomer,
  CreateCustomerRequest, UpdateCustomerRequest,
  createCustomerAddress, getCustomerAddress, getCustomerAddresses, updateCustomerAddress, deleteCustomerAddress,
  CustomerAddressRequest,
  createCustomerPayment, getCustomerPayment, getCustomerPayments, updateCustomerPayment, deleteCustomerPayment,
  CustomerPaymentRequest
} from './customers'
import {
  createAddOn, getAddOn, getAddOns, updateAddon, deleteAddon,
  createDiscount, getDiscount, getDiscounts, updateDiscount, deleteDiscount,
  RecurrenceRequest,
  createPlan, getPlan, getPlans, updatePlan, deletePlan,
  PlanRequest,
  createSubscription, getSubscription, updateSubscription, deleteSubscription,
  SubscriptionRequest
} from './recurring'
import { getTerminals } from './terminals'
import {
  doTransaction, getTransactionStatus, queryTransaction, captureTransaction, voidTransaction, refundTransaction,
  TransactionRequest, TransactionQueryRequest, TransactionCaptureRequest, TransactionRefundRequest
} from './transactions'
import {
  changePassword, createUser, getCurrentUser, getUser, getUsers, updateUser, deleteUser,
  ChangePasswordRequest, CreateUserRequest, UpdateUserRequest
} from './users'

export interface Constructor {
  config?: AxiosRequestConfig
  client?: Agent
  apiKey: string
  sandbox?: boolean
  localDev?: boolean
}
/**
 * The Fluidpay sdk.
 * @param config is for additional config for axios (optional)
 * @param client is the httpsAgent you want to use (optional)
 * @param apiKey is the authentication key
 * @param sandbox true for test enviroment (default: false)
 */
export default class Fluidpay {
  private config: AxiosRequestConfig = {}
  private client: Agent
  private apiKey: string
  private sandbox: boolean = false
  private localdev: boolean = false

  constructor(info: Constructor) {
    if (info.config) { this.config = info.config }
    if (info.client) { this.client = info.client } else { this.client = new Agent() }
    this.apiKey = info.apiKey
    if (info.sandbox) { this.sandbox = info.sandbox }
    if (info.localDev) { this.localdev = info.localDev }
  }

  // API key section
  /**
   * creates a new API key
   */
  public createKey(reqBody: KeyRequest) {
    return createKey(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * get all the API keys to a user
   */
  public getKeys() {
    return getKeys(this.config, this.client, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * deletes the API key identified by the ID
   */
  public deleteKey(apiKey: string) {
    return deleteKey(this.config, this.client, apiKey, this.apiKey, this.sandbox, this.localdev)
  }

  // authentication section
  /**
   * obtains a new JWT token
   */
  public obtainJWT(reqBody: JwtTokenRequest) {
    return obtainJWT(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * requests a reminder e-mail for the username
   */
  public forgottenUsername(reqBody: ForgottenUsernameRequest) {
    return forgottenUsername(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * requests a reminder e-mail containing a reset code for the password
   */
  public forgottenPassword(reqBody: ForgottenPasswordRequest) {
    return forgottenPassword(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * resets your password to the one given in the request body
   */
  public passwordReset(reqBody: PasswordResetRequest) {
    return passwordReset(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * terminates a valid authentication token
   */
  public tokenLogout() {
    return tokenLogout(this.config, this.client, this.apiKey, this.sandbox, this.localdev)
  }

  // customers section
  /**
   * creates a new customer token
   */
  public createCustomer(reqBody: CreateCustomerRequest) {
    return createCustomer(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * returns a specific customer token identified by ID
   */
  public getCustomer(customerId: string) {
    return getCustomer(this.config, this.client, customerId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * updates a specific customer token identified by ID
   */
  public updateCustomer(reqBody: UpdateCustomerRequest, customerId: string) {
    return updateCustomer(this.config, this.client, reqBody, customerId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * deletes a specific customer token identified by the ID
   */
  public deleteCustomer(customerId: string) {
    return deleteCustomer(this.config, this.client, customerId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * creates a new customer Address token
   */
  public createCustomerAddress(reqBody: CustomerAddressRequest, customerId: string) {
    return createCustomerAddress(this.config, this.client, reqBody, customerId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * returns an Address token of a customer both identified by ID
   */
  public getCustomerAddress(customerId: string, addressTokenId: string) {
    return getCustomerAddress(this.config, this.client, customerId, addressTokenId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * returns all the Address tokens of a customer identified by ID
   */
  public getCustomerAddresses(customerId: string) {
    return getCustomerAddresses(this.config, this.client, customerId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * updates an Address token of a customer both identified by ID
   */
  public updateCustomerAddress(reqBody: CustomerAddressRequest, customerId: string, addressTokenId: string) {
    return updateCustomerAddress(this.config, this.client, reqBody, customerId, addressTokenId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * deletes an Address token of a customer both identified by the ID
   */
  public deleteCustomerAddress(customerId: string, addressTokenId: string) {
    return deleteCustomerAddress(this.config, this.client, customerId, addressTokenId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * creates a new customer payment token
   */
  public createCustomerPayment(reqBody: CustomerPaymentRequest, customerId: string, paymentType: string) {
    return createCustomerPayment(this.config, this.client, reqBody, customerId, paymentType, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * returns a payment token of a customer both identified by ID
   */
  public getCustomerPayment(customerId: string, paymentType: string, paymentTokenId: string) {
    return getCustomerPayment(this.config, this.client, customerId, paymentType, paymentTokenId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * returns all the payment tokens of a customer identified by ID
   */
  public getCustomerPayments(customerId: string, paymentType: string) {
    return getCustomerPayments(this.config, this.client, customerId, paymentType, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * updates a payment token of a customer both identified by ID
   */
  public updateCustomerPayment(reqBody: CustomerPaymentRequest, customerId: string, paymentType: string, paymentTokenId: string) {
    return updateCustomerPayment(this.config, this.client, reqBody, customerId, paymentType, paymentTokenId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * deletes a payment token of a customer both identified by the ID
   */
  public deleteCustomerPayment(customerId: string, paymentType: string, paymentTokenId: string) {
    return deleteCustomerPayment(this.config, this.client, customerId, paymentType, paymentTokenId, this.apiKey, this.sandbox, this.localdev)
  }

  // recurring section
  /**
   * creates a new add on
   */
  public createAddOn(reqBody: RecurrenceRequest) {
    return createAddOn(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * gets the add on identified by the ID
   */
  public getAddOn(addOnId: string) {
    return getAddOn(this.config, this.client, addOnId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * gets all add ons
   */
  public getAddOns() {
    return getAddOns(this.config, this.client, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * updates the add on identified by the ID
   */
  public updateAddOn(reqBody: RecurrenceRequest, addOnId: string) {
    return updateAddon(this.config, this.client, reqBody, addOnId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * deletes the add on identified by the ID
   */
  public deleteAddOn(addOnId: string) {
    return deleteAddon(this.config, this.client, addOnId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * creates a new discount
   */
  public createDiscount(reqBody: RecurrenceRequest) {
    return createDiscount(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * gets the discount identified by the ID
   */
  public getDiscount(discountId: string) {
    return getDiscount(this.config, this.client, discountId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * gets all discounts
   */
  public getDiscounts() {
    return getDiscounts(this.config, this.client, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * updates the discount identified by the ID
   */
  public updateDiscount(reqBody: RecurrenceRequest, discountId: string) {
    return updateDiscount(this.config, this.client, reqBody, discountId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * deletes the discount identified by the ID
   */
  public deleteDiscount(discountId: string) {
    return deleteDiscount(this.config, this.client, discountId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * creates a new plan
   */
  public createPlan(reqBody: PlanRequest) {
    return createPlan(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * gets the plan identified by the ID
   */
  public getPlan(planId: string) {
    return getPlan(this.config, this.client, planId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * gets all plans
   */
  public getPlans() {
    return getPlans(this.config, this.client, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * updates the plan identified by the ID
   */
  public updatePlan(reqBody: PlanRequest, planId: string) {
    return updatePlan(this.config, this.client, reqBody, planId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * deletes the plan identified by the ID
   */
  public deletePlan(planId: string) {
    return deletePlan(this.config, this.client, planId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * creates a new subscription
   */
  public createSubscription(reqBody: SubscriptionRequest) {
    return createSubscription(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * gets the subscription identified by the ID
   */
  public getSubscription(subscriptionId: string) {
    return getSubscription(this.config, this.client, subscriptionId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * updates the subscription identified by the ID
   */
  public updateSubscription(reqBody: SubscriptionRequest, subscriptionId: string) {
    return updateSubscription(this.config, this.client, reqBody, subscriptionId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * deletes the subscription identified by the ID
   */
  public deleteSubscription(subscriptionId: string) {
    return deleteSubscription(this.config, this.client, subscriptionId, this.apiKey, this.sandbox, this.localdev)
  }

  // terminals section
  /**
   * gets all the terminals
   */
  public getTerminals() {
    return getTerminals(this.config, this.client, this.apiKey, this.sandbox, this.localdev)
  }

  // transaction section
  /**
   * initiates a transaction
   */
  public doTransaction(reqBody: TransactionRequest) {
    return doTransaction(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * gets the status of a transaction identified by ID
   */
  public getTransactionStatus(transactionId: string) {
    return getTransactionStatus(this.config, this.client, transactionId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * gets transactions identified by the values in the request body
   */
  public queryTransaction(reqBody: TransactionQueryRequest) {
    return queryTransaction(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * captures an already authorized transaction identified by ID
   */
  public captureTransaction(reqBody: TransactionCaptureRequest, transactionId: string) {
    return captureTransaction(this.config, this.client, reqBody, transactionId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * voids a transaction with pending settlement identified by ID
   */
  public voidTransaction(transactionId: string) {
    return voidTransaction(this.config, this.client, transactionId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * refunds a previously settled amount
   */
  public refundTransacttion(reqBody: TransactionRefundRequest, transactionId: string) {
    return refundTransaction(this.config, this.client, reqBody, transactionId, this.apiKey, this.sandbox, this.localdev)
  }

  // users section
  /**
   * changes your password to the one given in the request body
   */
  public changePassword(reqBody: ChangePasswordRequest) {
    return changePassword(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * creates a new user
   */
  public createUser(reqBody: CreateUserRequest) {
    return createUser(this.config, this.client, reqBody, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * gets the current user
   */
  public getCurrentUser() {
    return getCurrentUser(this.config, this.client, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * gets the user identified by the ID
   */
  public getUser(userId: string) {
    return getUser(this.config, this.client, userId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * gets all users
   */
  public getUsers() {
    return getUsers(this.config, this.client, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * updates the user identified by the ID
   */
  public updateUser(reqBody: UpdateUserRequest, userId: string) {
    return updateUser(this.config, this.client, reqBody, userId, this.apiKey, this.sandbox, this.localdev)
  }

  /**
   * deletes the user identified by the ID
   */
  public deleteUser(userId: string) {
    return deleteUser(this.config, this.client, userId, this.apiKey, this.sandbox, this.localdev)
  }
}
