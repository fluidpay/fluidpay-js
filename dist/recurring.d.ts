export interface RecurrenceRequest {
    name: string;
    description: string;
    amount?: number;
    percentage?: number;
    duration: number;
}
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
export interface RecurrencesResponse {
    status: string;
    msg: string;
    data?: RecurrenceResponseData[];
    total_count: number;
}
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
export interface PlansResponse {
    status: string;
    msg: string;
    data?: PlanResponseData[];
    total_count: number;
}
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
export declare let createAddOn: (reqBody: RecurrenceRequest, key: string, environment: string) => Promise<Response>;
export declare let getAddOn: (addOnID: string, key: string, environment: string) => Promise<Response>;
export declare let getAddOns: (key: string, environment: string) => Promise<Response>;
export declare let updateAddon: (reqBody: RecurrenceRequest, addOnID: string, key: string, environment: string) => Promise<Response>;
export declare let deleteAddon: (addOnID: string, key: string, environment: string) => Promise<Response>;
export declare let createDiscount: (reqBody: RecurrenceRequest, key: string, environment: string) => Promise<Response>;
export declare let getDiscount: (discountID: string, key: string, environment: string) => Promise<Response>;
export declare let getDiscounts: (key: string, environment: string) => Promise<Response>;
export declare let updateDiscount: (reqBody: RecurrenceRequest, discountID: string, key: string, environment: string) => Promise<Response>;
export declare let deleteDiscount: (discountID: string, key: string, environment: string) => Promise<Response>;
export declare let createPlan: (reqBody: PlanRequest, key: string, environment: string) => Promise<Response>;
export declare let updatePlan: (reqBody: PlanRequest, planID: string, key: string, environment: string) => Promise<Response>;
export declare let getPlan: (planID: string, key: string, environment: string) => Promise<Response>;
export declare let getPlans: (key: string, environment: string) => Promise<Response>;
export declare let deletePlan: (planID: string, key: string, environment: string) => Promise<Response>;
export declare let createSubscription: (reqBody: SubscriptionRequest, key: string, environment: string) => Promise<Response>;
export declare let updateSubscription: (reqBody: SubscriptionRequest, subID: string, key: string, environment: string) => Promise<Response>;
export declare let getSubscription: (subID: string, key: string, environment: string) => Promise<Response>;
export declare let deleteSubscription: (subID: string, key: string, environment: string) => Promise<Response>;
export {};
