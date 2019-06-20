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
  apiKey: string
  environment?: Environment
}

type Environment = 'production' | 'sandbox' | 'development'

/**
 * The Fluidpay sdk.
 * @param apiKey is the authentication key
 * @param enviroment is the environment this is being run on
 */
export default class Fluidpay {
  private apiKey: string
  private environment: Environment = 'production' // 'production', 'sandbox', 'development'

  constructor(info: Constructor) {
    this.apiKey = info.apiKey
    if (info.environment) {
      if (!['production', 'sandbox', 'development'].includes(info.environment)) {
        throw new Error(`Environment must be either. 'production', 'sandbox' or 'development'`)
      } else {
        this.environment = info.environment
      }
    }
  }

  // API key section
  /**
   * creates a new API key
   */
  public createKey(reqBody: KeyRequest) {
    return createKey(reqBody, this.apiKey, this.environment)
  }

  /**
   * get all the API keys to a user
   */
  public getKeys() {
    return getKeys(this.apiKey, this.environment)
  }

  /**
   * deletes the API key identified by the ID
   */
  public deleteKey(apiKey: string) {
    return deleteKey(apiKey, this.apiKey, this.environment)
  }

  // authentication section
  /**
   * obtains a new JWT token
   */
  public obtainJWT(reqBody: JwtTokenRequest) {
    return obtainJWT(reqBody, this.apiKey, this.environment)
  }

  /**
   * requests a reminder e-mail for the username
   */
  public forgottenUsername(reqBody: ForgottenUsernameRequest) {
    return forgottenUsername(reqBody, this.apiKey, this.environment)
  }

  /**
   * requests a reminder e-mail containing a reset code for the password
   */
  public forgottenPassword(reqBody: ForgottenPasswordRequest) {
    return forgottenPassword(reqBody, this.apiKey, this.environment)
  }

  /**
   * resets your password to the one given in the request body
   */
  public passwordReset(reqBody: PasswordResetRequest) {
    return passwordReset(reqBody, this.apiKey, this.environment)
  }

  /**
   * terminates a valid authentication token
   */
  public tokenLogout() {
    return tokenLogout(this.apiKey, this.environment)
  }

  // customers section
  /**
   * creates a new customer token
   */
  public createCustomer(reqBody: CreateCustomerRequest) {
    return createCustomer(reqBody, this.apiKey, this.environment)
  }

  /**
   * returns a specific customer token identified by ID
   */
  public getCustomer(customerId: string) {
    return getCustomer(customerId, this.apiKey, this.environment)
  }

  /**
   * updates a specific customer token identified by ID
   */
  public updateCustomer(reqBody: UpdateCustomerRequest, customerId: string) {
    return updateCustomer(reqBody, customerId, this.apiKey, this.environment)
  }

  /**
   * deletes a specific customer token identified by the ID
   */
  public deleteCustomer(customerId: string) {
    return deleteCustomer(customerId, this.apiKey, this.environment)
  }

  /**
   * creates a new customer Address token
   */
  public createCustomerAddress(reqBody: CustomerAddressRequest, customerId: string) {
    return createCustomerAddress(reqBody, customerId, this.apiKey, this.environment)
  }

  /**
   * returns an Address token of a customer both identified by ID
   */
  public getCustomerAddress(customerId: string, addressTokenId: string) {
    return getCustomerAddress(customerId, addressTokenId, this.apiKey, this.environment)
  }

  /**
   * returns all the Address tokens of a customer identified by ID
   */
  public getCustomerAddresses(customerId: string) {
    return getCustomerAddresses(customerId, this.apiKey, this.environment)
  }

  /**
   * updates an Address token of a customer both identified by ID
   */
  public updateCustomerAddress(reqBody: CustomerAddressRequest, customerId: string, addressTokenId: string) {
    return updateCustomerAddress(reqBody, customerId, addressTokenId, this.apiKey, this.environment)
  }

  /**
   * deletes an Address token of a customer both identified by the ID
   */
  public deleteCustomerAddress(customerId: string, addressTokenId: string) {
    return deleteCustomerAddress(customerId, addressTokenId, this.apiKey, this.environment)
  }

  /**
   * creates a new customer payment token
   */
  public createCustomerPayment(reqBody: CustomerPaymentRequest, customerId: string, paymentType: string) {
    return createCustomerPayment(reqBody, customerId, paymentType, this.apiKey, this.environment)
  }

  /**
   * returns a payment token of a customer both identified by ID
   */
  public getCustomerPayment(customerId: string, paymentType: string, paymentTokenId: string) {
    return getCustomerPayment(customerId, paymentType, paymentTokenId, this.apiKey, this.environment)
  }

  /**
   * returns all the payment tokens of a customer identified by ID
   */
  public getCustomerPayments(customerId: string, paymentType: string) {
    return getCustomerPayments(customerId, paymentType, this.apiKey, this.environment)
  }

  /**
   * updates a payment token of a customer both identified by ID
   */
  public updateCustomerPayment(reqBody: CustomerPaymentRequest, customerId: string, paymentType: string, paymentTokenId: string) {
    return updateCustomerPayment(reqBody, customerId, paymentType, paymentTokenId, this.apiKey, this.environment)
  }

  /**
   * deletes a payment token of a customer both identified by the ID
   */
  public deleteCustomerPayment(customerId: string, paymentType: string, paymentTokenId: string) {
    return deleteCustomerPayment(customerId, paymentType, paymentTokenId, this.apiKey, this.environment)
  }

  // recurring section
  /**
   * creates a new add on
   */
  public createAddOn(reqBody: RecurrenceRequest) {
    return createAddOn(reqBody, this.apiKey, this.environment)
  }

  /**
   * gets the add on identified by the ID
   */
  public getAddOn(addOnId: string) {
    return getAddOn(addOnId, this.apiKey, this.environment)
  }

  /**
   * gets all add ons
   */
  public getAddOns() {
    return getAddOns(this.apiKey, this.environment)
  }

  /**
   * updates the add on identified by the ID
   */
  public updateAddOn(reqBody: RecurrenceRequest, addOnId: string) {
    return updateAddon(reqBody, addOnId, this.apiKey, this.environment)
  }

  /**
   * deletes the add on identified by the ID
   */
  public deleteAddOn(addOnId: string) {
    return deleteAddon(addOnId, this.apiKey, this.environment)
  }

  /**
   * creates a new discount
   */
  public createDiscount(reqBody: RecurrenceRequest) {
    return createDiscount(reqBody, this.apiKey, this.environment)
  }

  /**
   * gets the discount identified by the ID
   */
  public getDiscount(discountId: string) {
    return getDiscount(discountId, this.apiKey, this.environment)
  }

  /**
   * gets all discounts
   */
  public getDiscounts() {
    return getDiscounts(this.apiKey, this.environment)
  }

  /**
   * updates the discount identified by the ID
   */
  public updateDiscount(reqBody: RecurrenceRequest, discountId: string) {
    return updateDiscount(reqBody, discountId, this.apiKey, this.environment)
  }

  /**
   * deletes the discount identified by the ID
   */
  public deleteDiscount(discountId: string) {
    return deleteDiscount(discountId, this.apiKey, this.environment)
  }

  /**
   * creates a new plan
   */
  public createPlan(reqBody: PlanRequest) {
    return createPlan(reqBody, this.apiKey, this.environment)
  }

  /**
   * gets the plan identified by the ID
   */
  public getPlan(planId: string) {
    return getPlan(planId, this.apiKey, this.environment)
  }

  /**
   * gets all plans
   */
  public getPlans() {
    return getPlans(this.apiKey, this.environment)
  }

  /**
   * updates the plan identified by the ID
   */
  public updatePlan(reqBody: PlanRequest, planId: string) {
    return updatePlan(reqBody, planId, this.apiKey, this.environment)
  }

  /**
   * deletes the plan identified by the ID
   */
  public deletePlan(planId: string) {
    return deletePlan(planId, this.apiKey, this.environment)
  }

  /**
   * creates a new subscription
   */
  public createSubscription(reqBody: SubscriptionRequest) {
    return createSubscription(reqBody, this.apiKey, this.environment)
  }

  /**
   * gets the subscription identified by the ID
   */
  public getSubscription(subscriptionId: string) {
    return getSubscription(subscriptionId, this.apiKey, this.environment)
  }

  /**
   * updates the subscription identified by the ID
   */
  public updateSubscription(reqBody: SubscriptionRequest, subscriptionId: string) {
    return updateSubscription(reqBody, subscriptionId, this.apiKey, this.environment)
  }

  /**
   * deletes the subscription identified by the ID
   */
  public deleteSubscription(subscriptionId: string) {
    return deleteSubscription(subscriptionId, this.apiKey, this.environment)
  }

  // terminals section
  /**
   * gets all the terminals
   */
  public getTerminals() {
    return getTerminals(this.apiKey, this.environment)
  }

  // transaction section
  /**
   * initiates a transaction
   */
  public doTransaction(reqBody: TransactionRequest) {
    return doTransaction(reqBody, this.apiKey, this.environment)
  }

  /**
   * gets the status of a transaction identified by ID
   */
  public getTransactionStatus(transactionId: string) {
    return getTransactionStatus(transactionId, this.apiKey, this.environment)
  }

  /**
   * gets transactions identified by the values in the request body
   */
  public queryTransaction(reqBody: TransactionQueryRequest) {
    return queryTransaction(reqBody, this.apiKey, this.environment)
  }

  /**
   * captures an already authorized transaction identified by ID
   */
  public captureTransaction(reqBody: TransactionCaptureRequest, transactionId: string) {
    return captureTransaction(reqBody, transactionId, this.apiKey, this.environment)
  }

  /**
   * voids a transaction with pending settlement identified by ID
   */
  public voidTransaction(transactionId: string) {
    return voidTransaction(transactionId, this.apiKey, this.environment)
  }

  /**
   * refunds a previously settled amount
   */
  public refundTransacttion(reqBody: TransactionRefundRequest, transactionId: string) {
    return refundTransaction(reqBody, transactionId, this.apiKey, this.environment)
  }

  // users section
  /**
   * changes your password to the one given in the request body
   */
  public changePassword(reqBody: ChangePasswordRequest) {
    return changePassword(reqBody, this.apiKey, this.environment)
  }

  /**
   * creates a new user
   */
  public createUser(reqBody: CreateUserRequest) {
    return createUser(reqBody, this.apiKey, this.environment)
  }

  /**
   * gets the current user
   */
  public getCurrentUser() {
    return getCurrentUser(this.apiKey, this.environment)
  }

  /**
   * gets the user identified by the ID
   */
  public getUser(userId: string) {
    return getUser(userId, this.apiKey, this.environment)
  }

  /**
   * gets all users
   */
  public getUsers() {
    return getUsers(this.apiKey, this.environment)
  }

  /**
   * updates the user identified by the ID
   */
  public updateUser(reqBody: UpdateUserRequest, userId: string) {
    return updateUser(reqBody, userId, this.apiKey, this.environment)
  }

  /**
   * deletes the user identified by the ID
   */
  public deleteUser(userId: string) {
    return deleteUser(userId, this.apiKey, this.environment)
  }
}
