/// <reference types="node" />
import { AxiosRequestConfig } from 'axios';
import { Agent } from 'https';
export declare const testApiKey: string;
export declare function urlBuilder(params: string[]): string;
/**
 * doRequest returns the response.data from the API
 * @param config is for additional config for axios
 * @param client is the httpsAgent you want to use
 * @param method is to set the request method
 * @param params are the building blocks for the url path
 * @param body is the request body sent
 * @param apiKey is the authentication key
 * @param sandbox true for test enviroment
 * @param localDev true for development
 */
export declare function doRequest(config: AxiosRequestConfig, client: Agent, method: string, params: string[], body: object, apiKey: string, sandbox: boolean, localDev: boolean): import("axios").AxiosPromise<any>;
