import { request } from './utils'

/**
 * request to create or update an add on or discount
 */
export interface RecurrenceRequest {
  name: string
  description: string
  amount?: number
  percentage?: number
  duration: number
}

/**
 * response from an add on or discount
 */
export interface RecurrenceResponse {
  status: string
  msg: string
  data?: RecurrenceResponseData
}

interface RecurrenceResponseData {
  id: string
  name: string
  description: string
  amount?: number
  percentage?: number
  duration: number
  created_at: string
  updated_at: string
}

/**
 * response from getting all the add ons or discounts
 */
export interface RecurrencesResponse {
  status: string
  msg: string
  data?: RecurrenceResponseData[]
  total_count: number
}

/**
 * request to create or update a plan
 */
export interface PlanRequest {
  name: string
  description: string
  amount: number
  billing_cycle_interval: number
  billing_frequency: string
  billing_days: string
  duration?: number
  add_ons?: OptionalRecurringRequest[]
  discounts?: OptionalRecurringRequest[]
}

interface OptionalRecurringRequest {
  id?: string
  name?: string
  description?: string
  amount?: number
  percentage?: number
  duration?: number
}

/**
 * response from a plan
 */
export interface PlanResponse {
  status: string
  msg: string
  data?: PlanResponseData
}

interface PlanResponseData {
  id: string
  name: string
  description: string
  amount: number
  percentage: number
  billing_cycle_interval: number
  billing_frequency: string
  billing_days: string
  total_add_ons: number
  total_discounts: number
  duration: number
  add_ons: RecurrenceResponseData[]
  discounts: RecurrenceResponseData[]
  created_at: string
  updated_at: string
}

/**
 * response from getting all the plans
 */
export interface PlansResponse {
  status: string
  msg: string
  data?: PlanResponseData[]
  total_count: number
}

/**
 * request for creating or updating a subscription
 */
export interface SubscriptionRequest {
  plan_id: string
  description: string
  customer: IdData
  amount: number
  billing_cycle_interval: number
  billing_frequency: string
  billing_days: string
  duration?: number
  next_bill_date?: string
  add_ons?: OptionalRecurringRequest[]
  discounts?: OptionalRecurringRequest[]
}

interface IdData {
  id: string
}

/**
 * response from a subscription
 */
export interface SubscriptionResponse {
  status: string
  msg: string
  data: SubscriptionResponseData
}

export interface SubscriptionsResponse {
  status: string
  msg: string
  data: SubscriptionResponseData[]
  total_count: number
}

interface SubscriptionResponseData {
  id: string
  plan_id: string
  status: string
  description: string
  customer: IdData
  amount: number
  total_adds: number
  total_discounts: number
  billing_cycle_interval: number
  billing_frequency: string
  billing_days: string
  duration: number
  next_bill_date: string
  add_ons: RecurrenceResponseData[]
  discounts: RecurrenceResponseData[]
  created_at: string
  updated_at: string
}

export let createAddOn = (reqBody: RecurrenceRequest, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'addon']
  return request('POST', param, reqBody, key, environment)
}

export let getAddOn = (addOnID: string, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'addon', addOnID]
  return request('GET', param, {}, key, environment)
}

export let getAddOns = (key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'addons']
  return request('GET', param, {}, key, environment)
}

export let updateAddon = (reqBody: RecurrenceRequest, addOnID: string, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'addon', addOnID]
  return request('POST', param, reqBody, key, environment)
}

export let deleteAddon = (addOnID: string, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'addon', addOnID]
  return request('DELETE', param, {}, key, environment)
}

// --------------------- Discount section. --------------------------

export let createDiscount = (reqBody: RecurrenceRequest, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'discount']
  return request('POST', param, reqBody, key, environment)
}

export let getDiscount = (discountID: string, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'discount', discountID]
  return request('GET', param, {}, key, environment)
}

export let getDiscounts = (key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'discounts']
  return request('GET', param, {}, key, environment)
}

export let updateDiscount = (reqBody: RecurrenceRequest, discountID: string, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'discount', discountID]
  return request('POST', param, reqBody, key, environment)
}


export let deleteDiscount = (discountID: string, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'discount', discountID]
  return request('DELETE', param, {}, key, environment)
}

// --------------------- Plan section. --------------------------

export let createPlan = (reqBody: PlanRequest, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'plan']
  return request('POST', param, reqBody, key, environment)
}

export let updatePlan = (reqBody: PlanRequest, planID: string, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'plan', planID]
  return request('POST', param, reqBody, key, environment)
}

export let getPlan = (planID: string, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'plan', planID]
  return request('GET', param, {}, key, environment)
}

export let getPlans = (key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'plans']
  return request('GET', param, {}, key, environment)
}

export let deletePlan = (planID: string, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'plan', planID]
  return request('DELETE', param, {}, key, environment)
}

// --------------------- Subscription section. --------------------------

export let createSubscription = (reqBody: SubscriptionRequest, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'subscription']
  return request('POST', param, reqBody, key, environment)
}

export let updateSubscription = (reqBody: SubscriptionRequest, subID: string, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'subscription', subID]
  return request('POST', param, reqBody, key, environment)
}

export let getSubscription = (subID: string, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'subscription', subID]
  return request('GET', param, {}, key, environment)
}

export let deleteSubscription = (subID: string, key: string, environment: string): Promise<Response> => {
  const param = ['recurring', 'subscription', subID]
  return request('DELETE', param, {}, key, environment)
}
