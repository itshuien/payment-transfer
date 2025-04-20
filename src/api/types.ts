export interface TransferRequest {
    recipient: {
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
        transaction: {
            id: string;
            sender: {
                phoneNumber: string;
            };
            recipient: {
                phoneNumber: string;
            };
            amount: number;
            note?: string;
            status: 'completed' | 'pending';
            createdAt: string;
            updatedAt: string;
        }
    }
}

export interface AcccountBalanceResponse {
    status: 'success' | 'error';
    message: string;
    data: {
        amount: number;
    }
}
