export interface TransferRequest {
    recipient: {
        name: string;
        phoneNumber: string;
        avatarUrl?: string;
    };
    amount: number;
    note?: string;
}

export interface ApiResponse<T> extends Response {
    json(): Promise<T>;
}

export interface TransferSuccessResponse {
    status: 'success';
    message: string;
    code: 'success';
    data: {
        transaction: Transaction;
    }
}

export interface TransferErrorResponse {
    status: 'error';
    message: string;
    code: 'invalid_recipient' | 'insufficient_balance' | 'server';
}

export type TransferResponse = TransferSuccessResponse | TransferErrorResponse;

export interface Transaction {
    id: string;
    sender: {
        name: string;
        phoneNumber: string;
        avatarUrl?: string;
    };
    recipient: {
        name: string;
        phoneNumber: string;
        avatarUrl?: string;
    };
    amount: number;
    note?: string;
    status: 'completed' | 'pending';
    createdAt: string;
    updatedAt: string;
}

export interface TransferHistoryResponse {
    status: 'success' | 'error';
    message: string;
    data: {
        transactions: Transaction[];
    }
}

export interface AcccountBalanceResponse {
    status: 'success' | 'error';
    message: string;
    data: {
        amount: number;
    }
}
