/// <reference types="node" />
import { AxiosRequestConfig, AxiosPromise } from 'axios';
import { Agent } from 'https';
/**
 * response form getting all the terminals
 */
export interface TerminalsResponse {
    status: string;
    msg: string;
    total_count: number;
    data: TerminalsResponseData[];
}
interface TerminalsResponseData {
    id: string;
    merchant_id: string;
    manufacturer: string;
    model: string;
    serial_number: string;
    tpn: string;
    description: string;
    status: string;
    auth_key: string;
    register_id: string;
    auto_settle: boolean;
    settle_at: string;
    created_at: string;
    updated_at: string;
}
export declare let getTerminals: (config: AxiosRequestConfig, client: Agent, key: string, sandbox: boolean, localDev: boolean) => AxiosPromise<any>;
export {};
