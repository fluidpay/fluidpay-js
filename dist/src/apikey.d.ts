/// <reference types="node" />
import { AxiosRequestConfig } from 'axios';
import { Agent } from 'https';
/**
 * request for creating a new API key for a user
 */
export interface KeyRequest {
    type: string;
    name: string;
}
/**
 * response for creating a new API key for a user
 */
export interface KeyResponse {
    status: string;
    msg: string;
    data?: KeyResponseData;
}
interface KeyResponseData {
    id: string;
    user_id: string;
    type: string;
    name: string;
    api_key: string;
    created_at: string;
    updated_at: string;
}
/**
 * response for getting all the keys for a user
 */
export interface KeysResponse {
    status: string;
    msg: string;
    total_count: number;
    data?: KeyResponseData[];
}
export declare let createKey: (config: AxiosRequestConfig, client: Agent, reqBody: KeyRequest, key: string, sandbox: boolean, localDev: boolean) => import("axios").AxiosPromise<any>;
export declare let getKeys: (config: AxiosRequestConfig, client: Agent, key: string, sandbox: boolean, localDev: boolean) => import("axios").AxiosPromise<any>;
export declare let deleteKey: (config: AxiosRequestConfig, client: Agent, apiKey: string, key: string, sandbox: boolean, localDev: boolean) => import("axios").AxiosPromise<any>;
export {};
