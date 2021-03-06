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
export declare let getTerminals: (key: string, environment: string) => Promise<Response>;
export {};
