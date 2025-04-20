export interface TransferRequest {
    recipient: {
        name: string;
        phoneNumber: string;
    };
    amount: number;
    note?: string;
}

export interface ApiResponse<T> extends Response {
    json(): Promise<T>;
}

export interface TransferResponse {
    status: 'success' | 'error';
    message: string;
    data: {
        transaction: Transaction;
    }
}

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
