import { createContext, PropsWithChildren, useState } from 'react';

interface TransferContextValue {
    recipient: string;
    setRecipient: (recipient: string) => void;
    amount: number;
    setAmount: (amount: number) => void;
    note: string;
    setNote: (note: string) => void;
}

export const TransferContext = createContext<TransferContextValue | undefined>(undefined);

const TransferContextProvider: React.FC<PropsWithChildren> = (props) => {
    const { children } = props;

    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState(0);
    const [note, setNote] = useState('');

    return (
        <TransferContext.Provider
            value={{
                recipient,
                setRecipient,
                amount,
                setAmount,
                note,
                setNote,
            }}
        >
            {children}
        </TransferContext.Provider>
    );
};

export default TransferContextProvider;
