import { createContext, PropsWithChildren, useState } from 'react';
import { TransferResponse } from 'src/api/types';

interface TransferContextValue {
    recipient: string;
    setRecipient: (recipient: string) => void;
    amount: number;
    setAmount: (amount: number) => void;
    note: string;
    setNote: (note: string) => void;
    response?: TransferResponse;
    setResponse: (response: TransferResponse) => void;
}

export const TransferContext = createContext<TransferContextValue | undefined>(undefined);

const TransferContextProvider: React.FC<PropsWithChildren> = (props) => {
    const { children } = props;

    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState(0);
    const [note, setNote] = useState('');
    const [response, setResponse] = useState<TransferResponse>();

    return (
        <TransferContext.Provider
            value={{
                recipient,
                setRecipient,
                amount,
                setAmount,
                note,
                setNote,
                response,
                setResponse,
            }}
        >
            {children}
        </TransferContext.Provider>
    );
};

export default TransferContextProvider;
