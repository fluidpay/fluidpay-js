export interface KeyRequest {
    type: string;
    name: string;
}
export interface KeyResponse {
    status: string;
    msg: string;
    data: KeyResponseData;
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
export interface KeysResponse {
    status: string;
    msg: string;
    total_count: number;
    data?: KeyResponseData[];
}
export declare let createKey: (reqBody: KeyRequest, key: string, environment: string) => Promise<Response>;
export declare let getKeys: (key: string, environment: string) => Promise<Response>;
export declare let deleteKey: (apiKey: string, key: string, environment: string) => Promise<Response>;
export {};
