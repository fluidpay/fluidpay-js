export interface TransactionRequest {
    type: string;
    amount: number;
    tax_exempt?: boolean;
    tax_amount: number;
    shipping_amount: number;
    currency: string;
    description: string;
    order_id: string;
    po_number: string;
    ip_address: string;
    email_reciept: boolean;
    email_address: string;
    payment_method?: {
        card?: {
            entry_type: string;
            number: string;
            expiration_date: string;
            cvc: string;
            cardholder_authentication: {
                condition: string;
                eci: string;
                cavv: string;
                xid: string;
            };
        };
        token?: string;
        customer?: {
            id: string;
            payment_method_type: string;
            payment_method_id: string;
            billing_address_id: string;
            shipping_address_id: string;
        };
        terminal?: {
            id: string;
            expiration_date: string;
            cvc: string;
            print_receipt: string;
            signature_required: boolean;
        };
        ach?: {
            routing_number: string;
            account_number: string;
            sec_code: string;
            account_type: string;
            check_number: string;
            accountholder_authentication: {
                dl_state: string;
                dl_number: string;
            };
        };
    };
    billing_address?: Address;
    shipping_address?: Address;
}
export interface Address {
    first_name: string;
    last_name: string;
    company: string;
    address_line_1: string;
    address_line_2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone: string;
    fax: string;
    email: string;
}
export interface TransactionResponse {
    status: string;
    msg: string;
    data?: TransactionResponseData;
}
interface TransactionResponseData {
    id: string;
    type: string;
    amount: number;
    tip_amount?: number;
    tax_amount: number;
    tax_exempt: boolean;
    shipping_amount: number;
    currency: string;
    description: string;
    order_id: string;
    po_number: string;
    ip_address: string;
    email_receipt: boolean;
    email_address: string;
    payment_method: string;
    response: {
        card?: CardResponseBody;
    };
    status: string;
    billing_address?: Address;
    shipping_address?: Address;
    created_at: string;
    updated_at: string;
}
interface ProcessorSpecific {
    BatchNum: string;
    CashBack: string;
    ClerkID: string;
    DISC: string;
    EBTCashAvailBalance: string;
    EBTCashBeginBalance: string;
    EBTCashLedgerBalance: string;
    EBTFSAvailBalance: string;
    EBTFSBeginBalance: string;
    EBTFSLedgerBalance: string;
    Fee: string;
    InvNum: string;
    Language: string;
    ProcessData: string;
    RefNo: string;
    RewardCode: string;
    RewardQR: string;
    RwdBalance: string;
    RwdIssued: string;
    RwdPoints: string;
    SHFee: string;
    SVC: string;
    TableNum: string;
    TaxCity: string;
    TaxState: string;
    TicketNum: string;
    Tip: string;
    TotalAmt: string;
}
export interface TerminalResponse {
    status: string;
    msg: string;
    data?: {
        id: string;
        user_id: string;
        user_name: string;
        idempotency_key: string;
        idempotency_time: number;
        type: string;
        amount: number;
        amount_authorized: number;
        amount_captured: number;
        amount_settled: number;
        tip_amount?: number;
        payment_adjustment: number;
        payment_adjustment_add: boolean;
        processor_id: string;
        processor_type: string;
        payment_method: string;
        payment_type: string;
        processor_name: string;
        tax_amount: number;
        tax_exempt: boolean;
        shipping_amount: number;
        currency: string;
        description: string;
        order_id: string;
        po_number: string;
        ip_address: string;
        transaction_source: string;
        email_receipt: boolean;
        email_address: string;
        customer_id: string;
        referenced_transaction_id: string;
        response_body: {
            card?: CardResponseBody;
            terminal?: TerminalResponseBody;
            ach?: AchResponseBody;
        };
        status: string;
        response: string;
        response_code: number;
        billing_address: Address;
        shipping_address: Address;
        created_at: string;
        updated_at: string;
        captured_at: string;
        settled_at?: string;
    };
}
interface TerminalResponseBody {
    id: string;
    terminal_is: string;
    terminal_description: string;
    card_type: string;
    payment_type: string;
    entry_type: string;
    first_four: string;
    last_four: string;
    masked_card: string;
    cardholder_name: string;
    auth_code: string;
    response_code: string;
    processor_response_text: string;
    processor_specific?: ProcessorSpecific;
    emv_aid: string;
    emv_app_name: string;
    emv_tvr: string;
    emv_tsi: string;
    signature_data: string;
    created_at: string;
    updated_at: string;
}
interface CardResponseBody {
    id: string;
    card_type: string;
    first_six: string;
    last_four: string;
    masked_card: string;
    expiration_date: string;
    response: string;
    response_code: string;
    auth_code: string;
    processor_response_code: string;
    processor_response_text: string;
    processor_type: string;
    processor_id: string;
    avs_response_code: string;
    cvv_response_code: string;
    processor_specific?: ProcessorSpecific;
    created_at: string;
    updated_at: string;
}
interface AchResponseBody {
    id: string;
    sec_code: string;
    account_type: string;
    masked_account_number: string;
    routing_number: string;
    auth_code: string;
    response: string;
    response_code: number;
    processor_response_code: string;
    processor_response_text: string;
    processor_type: string;
    processor_id: string;
    processor_specific: {
        result_codes: string[];
        type_codes: string[];
    };
    created_at: string;
    updated_at: string;
}
export interface TransactionSearchResponse {
    status: string;
    msg: string;
    total_count: number;
    data?: TransactionResponseData;
}
export interface TransactionQueryRequest {
    transaction_id?: StringQuery;
    user_id?: StringQuery;
    type?: StringQuery;
    ip_address?: StringQuery;
    amount?: IntQuery;
    amount_authorized?: IntQuery;
    amount_captured?: IntQuery;
    amount_settled?: IntQuery;
    tax_amount?: IntQuery;
    po_number?: StringQuery;
    order_id?: StringQuery;
    payment_method?: StringQuery;
    payment_type?: StringQuery;
    status?: StringQuery;
    processor_id?: StringQuery;
    customer_id?: StringQuery;
    created_at?: DateQuery;
    captured_at?: DateQuery;
    settled_at?: DateQuery;
    billing_address?: AddressQuery;
    shipping_address?: AddressQuery;
    limit?: number;
    offset?: number;
}
interface AddressQuery {
    address_id?: StringQuery;
    first_name?: StringQuery;
    last_name?: StringQuery;
    company?: StringQuery;
    address_line_1?: StringQuery;
    address_line_2?: StringQuery;
    city?: StringQuery;
    state?: StringQuery;
    postal_code?: StringQuery;
    country?: StringQuery;
    email?: StringQuery;
    phone?: StringQuery;
    fax?: StringQuery;
}
interface StringQuery {
    operator: string;
    value: string;
}
interface IntQuery {
    operator: string;
    value: number;
}
interface DateQuery {
    start_date: string;
    end_date: string;
}
export interface TransactionCaptureRequest {
    amount: number;
    tax_amount: number;
    tax_exempt: boolean;
    shipping_amount: number;
    order_id: string;
    po_number: string;
    ip_address: string;
}
export interface TransactionRefundRequest {
    amount: number;
}
export declare let doTransaction: (reqBody: TransactionRequest, key: string, environment: string) => Promise<Response>;
export declare let getTransactionStatus: (transactionID: string, key: string, environment: string) => Promise<Response>;
export declare let queryTransaction: (reqBody: TransactionQueryRequest, key: string, environment: string) => Promise<Response>;
export declare let captureTransaction: (reqBody: TransactionCaptureRequest, transactionID: string, key: string, environment: string) => Promise<Response>;
export declare let voidTransaction: (transactionID: string, key: string, environment: string) => Promise<Response>;
export declare let refundTransaction: (reqBody: TransactionRefundRequest, transactionID: string, key: string, environment: string) => Promise<Response>;
export {};
