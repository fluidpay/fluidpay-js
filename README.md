# fluidpay-JavaScript
This is the official SDK for the Fluid Pay API written in JavaScript programming language using promises.

## Getting started
After installing the SDK with ```npm install fluidpay-js``` you first need to initiate the package.
```js
import Fluidpay from 'fluidpay'

const fp = new Fluidpay({
  apiKey: 'yourApiKey',
  config: // optional config for axios
  client: // optional https configuration
})
```
## General usage
All communication with the API is through axios, so it's promise based. Requests and responses are handled by interfaces.
```js
fp.getCurrentUser()
.then((res: any) => {
    // handle response
})
.catch((err: Error) => {
    // handle error, if returned
})
```
## Function list
```js
fp.createKey(reqBody: KeyRequest) // creates a new api key, response should be handled as KeyResponse

fp.getKeys() // returns all keys for the current user, response should be handled as KeysResponse

fp.deleteKey(apiKey: string) // deletes the key, response should be handled as KeyResponse

fp.obtainJWT(reqBody: JwtTokenRequest) // returns a new JWT token, response should be handled as JwtTokenResponse

fp.forgottenUsername(reqBody: ForgottenUsernameRequest) // sends an email with the username, response should be handled as GeneralResponse

fp.forgottenPassword(reqBody: ForgottenPasswordRequest) // sends an email with the password, response should be handled as GeneralResponse

fp.passwordReset(reqBody: PasswordResetRequest) // resets password, response should be handled as GeneralResponse

fp.tokenLogout() // logs out the JWT token, response should be handled as GeneralResponse

fp.createCustomer(reqBody: CreateCustomerRequest) // creates a new customer token, response should be handled as CustomerResponse

fp.getCustomer(customerId: string) // returns the customer token, response should be handled as CustomerResponse

fp.updateCustomer(reqBody: UpdateCustomerRequest, customerId: string) // updates the customer token, response should be handled as CustomerResponse

fp.deleteCustomer(customerId: string) // deletes the customer token, response should be handled as CustoemrResponse

fp.createCustomerAddress(reqBody: CustomerAddressRequest, customerId: string) // creates a new address token, response should be handled as CustomerAddressResponse

fp.getCustomerAddress(customerId: string, addressId: string) // returns the address token, response should be handled as CustomerAddressResponse

fp.getCustomerAddresses(customerId: string) // returns all address tokens, response should be handled as CustomerAddressesResponse

fp.updateCustomerAddress(reqBody: CustomerAddressRequest, customerId: string, addressId: string) // updates the address token, response should be handled as CustomerAddressResponse

fp.deleteCustomerAddress(customerId: string, address: string) // deletes the address token, response should be handled as CustomerAddressResponse

fp.createCustomerPayment(reqBody: CustomerPaymentRequest, customerId: string) // creates a new payment token, response should be handled as CustomerPaymentResponse

fp.getCustomerPayment(customerId: string, paymentType: string, paymentId: string) // returns the payment token, response should be handled as CustomerPaymentResponse

fp.getCustomerPayments(customerId: string, paymentType: string) // returns all payment tokens, response should be handled as CustomerPaymentsResponse

fp.updateCustomerPayment(reqBody: CustomerPaymentRequest, customerId: string, paymentType: string, paymentTokenId: string) // updates the payment token, response should be handled as CustomerPaymentResponse

fp.deleteCustomerPayment(customerId: string, paymentType: string, paymentId: string) // deletes the payment token, response should be handled as CustomerPaymentResponse

fp.createAddOn(reqBody: RecurrenceRequest) // creates a new add on, response should be handled as RecurrenceResponse

fp.getAddOn(addOnId: string) // returns the add on, response should be handled as RecurrenceResponse

fp.getAddons() // returns all add ons, response should be handled as RecurrencesResponse

fp.updateAddOn(reqBody: RecurrenceRequest, addOnId: string) // updates the add on, response should be handled as RecurrenceResponse

fp.deleteAddOn(addOnId: string) // deletes the add on, response should be handled as RecurrenceResponse

fp.createDiscount(reqBody: RecurrenceRequest) // creates a new discount, response should be handled as RecurrenceResponse

fp.getDiscount(discountId: string) // returns the discount, response should be handled as RecurrenceResponse

fp.getDiscounts() // returns all discounts, response should be handled as RecurrencesResponse

fp.updateDiscount(reqBody: RecurrenceRequest, discountId: string) // updates the discount, response should be handled as RecurrenceResponse

fp.deleteDiscount(discountId: string) deletes the discount, response should be handled as RecurrenceResponse

fp.createPlan(reqBody: PlanRequest) // creates a new plan, response should be handled as PlanResponse

fp.getPlan(planId: string) // returns the plan, response should be handled as PlanResponse

fp.getPlans() // returns all plans, response should be handled as PlansResponse

fp.updatePlan(reqBody: PlanRequest, planId: string) // updates the plan, response should be handled as PlanResponse

fp.deletePlan(planId: string) // deletes the plan, response should be handled as PlanResponse

fp.createSubscription(reqBody: SubscriptionRequest) creates a new subscription, response should be handled as SubscriptionResponse

fp.getSubscription(subscriptionId: string) // returns the subscription, response should be handled as SubscriptionResponse

fp.updateSubscription(reqBody: SubscriptionRequest, subscriptionId: string) // updates the subscription, response should be handled as SubscriptionResponse

fp.deleteSubscription(subscriptionIs: string) // deletes the subscription, response should be handled as SubscriptionResponse

fp.getTerminals() // returns all terminals, response should be handled as TerminalsResponse

fp.doTransaction(reqBody: TransactionRquest) // initiates a transaction, response should be handled as TerminalResponse

fp.getTransactionStatus(transactionId: string) // returns the state of the transaction, response should be handled as TransactionResponse

fp.queryTransaction(reqBody: TransactionQueryRequest) // returns the qualified transactions, response should be handled as a TransactionResponse

fp.captureTransaction(reqBody: TransactionCaptureRequest, transactionId: string) // captures the transaction, response should be handled as a TransactionResponse

fp.voidTransaction(transactionId: string) // voids the transaction, response should be handled as a TransactionResponse

fp.refundTransaction(reqBody: TransactionRefundRequest, transactionId: string) // refunds the transaction, response should be handled as a TransactionResponse

fp.changePassword(reqBody: ChangePasswordRequest) // changes the password, response should be handled as UserResponse

fp.createUser(reqBody: CreateUserRequest) // creates a new user, response should be handled as UserResponse

fp.getCurrentUser() // returns the currently active user, response should be handled as UserResponse

fp.getUser(userId: string) // returns the user, response should be handled as UserResponse

fp.getUsers() // returns all users, response should be handled as UsersResponse

fp.updateUser(reqBody: UpdateUserRequest, userId: string) // updates the user, response should be handled as UserResponse

fp.deleteUser(userId: string) // deletes the user, response should be handled as UserResponse
```
## Documentation
Further information can be found on the [Fluid Pay website](https://sandbox.fluidpay.com/docs/index.html#introduction).