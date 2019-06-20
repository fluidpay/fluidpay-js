export interface UserResponse {
    status: string;
    msg: string;
    data?: UserResponseData;
}
interface UserResponseData {
    id: string;
    username: string;
    name: string;
    phone: string;
    email: string;
    timezone: string;
    status: string;
    role: string;
    account_type: string;
    account_type_id: string;
    permissions: UserPermissions;
    two_factor_enabled: boolean;
    created_at: string;
    updated_at: string;
}
interface UserPermissions {
    manage_users: boolean;
    manage_api_keys: boolean;
    view_billing_reports: boolean;
    manage_terminals: boolean;
    manage_rule_engine: boolean;
    view_settlement_batches: boolean;
    process_authorization: boolean;
    process_capture: boolean;
    process_sale: boolean;
    process_void: boolean;
    process_credit: boolean;
    process_refund: boolean;
    process_verification: boolean;
}
export interface ChangePasswordRequest {
    username: string;
    current_password: string;
    new_password: string;
}
export interface CreateUserRequest {
    username: string;
    name: string;
    phone: string;
    email: string;
    timezone: string;
    password: string;
    status: string;
    role: string;
}
export interface UpdateUserRequest {
    name: string;
    phone: string;
    email: string;
    timezone: string;
    status: string;
    role: string;
}
export interface UsersResponse {
    status: string;
    msg: string;
    total_count: number;
    data?: UserResponseData[];
}
export declare let changePassword: (reqBody: ChangePasswordRequest, key: string, environment: string) => Promise<Response>;
export declare let createUser: (reqBody: CreateUserRequest, key: string, environment: string) => Promise<Response>;
export declare let updateUser: (reqBody: UpdateUserRequest, userID: string, key: string, environment: string) => Promise<Response>;
export declare let getUser: (userID: string, key: string, environment: string) => Promise<Response>;
export declare let getCurrentUser: (key: string, environment: string) => Promise<Response>;
export declare let getUsers: (key: string, environment: string) => Promise<Response>;
export declare let deleteUser: (userID: string, key: string, environment: string) => Promise<Response>;
export {};
