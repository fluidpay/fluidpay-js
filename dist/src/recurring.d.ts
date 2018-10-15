/// <reference types="node" />
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { Agent } from 'https';
/**
 * request to create or update an add on or discount
 */
export interface RecurrenceRequest {
    name: string;
    description: string;
    amount?: number;
    percentage?: number;
    duration: number;
}
/**
 * response from an add on or discount
 */
export interface RecurrenceResponse {
    status: string;
    msg: string;
    data?: RecurrenceResponseData;
}
interface RecurrenceResponseData {
    id: string;
    name: string;
    description: string;
    amount?: number;
    percentage?: number;
    duration: number;
    created_at: string;
    updated_at: string;
}
/**
 * response from getting all the add ons or discounts
 */
export interface RecurrencesResponse {
    status: string;
    msg: string;
    data?: RecurrenceResponseData[];
    total_count: number;
}
/**
 * request to create or update a plan
 */
export interface PlanRequest {
    name: string;
    description: string;
    amount: number;
    billing_cycle_interval: number;
    billing_frequency: string;
    billing_days: string;
    duration?: number;
    add_ons?: OptionalRecurringRequest[];
    discounts?: OptionalRecurringRequest[];
}
interface OptionalRecurringRequest {
    id?: string;
    name?: string;
    description?: string;
    amount?: number;
    percentage?: number;
    duration?: number;
}
/**
 * response from a plan
 */
export interface PlanResponse {
    status: string;
    msg: string;
    data?: PlanResponseData;
}
interface PlanResponseData {
    id: string;
    name: string;
    description: string;
    amount: number;
    percentage: number;
    billing_cycle_interval: number;
    billing_frequency: string;
    billing_days: string;
    total_add_ons: number;
    total_discounts: number;
    duration: number;
    add_ons: RecurrenceResponseData[];
    discounts: RecurrenceResponseData[];
    created_at: string;
    updated_at: string;
}
/**
 * response from getting all the plans
 */
export interface PlansResponse {
    status: string;
    msg: string;
    data?: PlanResponseData[];
    total_count: number;
}
/**
 * request for creating or updating a subscription
 */
export interface SubscriptionRequest {
    plan_id: string;
    description: string;
    customer: IdData;
    amount: number;
    billing_cycle_interval: number;
    billing_frequency: string;
    billing_days: string;
    duration?: number;
    next_bill_date?: string;
    add_ons?: OptionalRecurringRequest[];
    discounts?: OptionalRecurringRequest[];
}
interface IdData {
    id: string;
}
/**
 * response from a subscription
 */
export interface SubscriptionResponse {
    status: string;
    msg: string;
    data: SubscriptionResponseData;
}
export interface SubscriptionsResponse {
    status: string;
    msg: string;
    data: SubscriptionResponseData[];
    total_count: number;
}
interface SubscriptionResponseData {
    id: string;
    plan_id: string;
    status: string;
    description: string;
    customer: IdData;
    amount: number;
    total_adds: number;
    total_discounts: number;
    billing_cycle_interval: number;
    billing_frequency: string;
    billing_days: string;
    duration: number;
    next_bill_date: string;
    add_ons: RecurrenceResponseData[];
    discounts: RecurrenceResponseData[];
    created_at: string;
    updated_at: string;
}
export declare let createAddOn: (config: AxiosRequestConfig, client: Agent, reqBody: RecurrenceRequest, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let getAddOn: (config: AxiosRequestConfig, client: Agent, addOnID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let getAddOns: (config: AxiosRequestConfig, client: Agent, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let updateAddon: (config: AxiosRequestConfig, client: Agent, reqBody: RecurrenceRequest, addOnID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let deleteAddon: (config: AxiosRequestConfig, client: Agent, addOnID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let createDiscount: (config: AxiosRequestConfig, client: Agent, reqBody: RecurrenceRequest, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let getDiscount: (config: AxiosRequestConfig, client: Agent, discountID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let getDiscounts: (config: AxiosRequestConfig, client: Agent, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let updateDiscount: (config: AxiosRequestConfig, client: Agent, reqBody: RecurrenceRequest, discountID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let deleteDiscount: (config: AxiosRequestConfig, client: Agent, discountID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let createPlan: (config: AxiosRequestConfig, client: Agent, reqBody: PlanRequest, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let updatePlan: (config: AxiosRequestConfig, client: Agent, reqBody: PlanRequest, planID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let getPlan: (config: AxiosRequestConfig, client: Agent, planID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let getPlans: (config: AxiosRequestConfig, client: Agent, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let deletePlan: (config: AxiosRequestConfig, client: Agent, planID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let createSubscription: (config: AxiosRequestConfig, client: Agent, reqBody: SubscriptionRequest, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let updateSubscription: (config: AxiosRequestConfig, client: Agent, reqBody: SubscriptionRequest, subID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let getSubscription: (config: AxiosRequestConfig, client: Agent, subID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export declare let deleteSubscription: (config: AxiosRequestConfig, client: Agent, subID: string, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export {};
