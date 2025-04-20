import { Contact } from '@features/contacts/types';
import { createContext, PropsWithChildren, useState } from 'react';
import { TransferSuccessResponse } from 'src/api/types';

interface TransferContextValue {
    recipient: Contact;
    setRecipient: (recipient: Contact) => void;
    amount: number;
    setAmount: (amount: number) => void;
    note: string;
    setNote: (note: string) => void;
    response?: TransferSuccessResponse;
    setResponse: (response: TransferSuccessResponse) => void;
}

export const TransferContext = createContext<TransferContextValue | undefined>(undefined);

interface Props {
    initialState: Pick<TransferContextValue, 'recipient' | 'amount' | 'note'>;
}

const TransferContextProvider: React.FC<PropsWithChildren<Props>> = (props) => {
    const { children, initialState } = props;

    const [recipient, setRecipient] = useState<Contact>({
        name: initialState.recipient.name,
        phoneNumber: initialState.recipient.phoneNumber,
        avatarUrl: initialState.recipient.avatarUrl,
    });
    const [amount, setAmount] = useState(initialState.amount);
    const [note, setNote] = useState(initialState.note);
    const [response, setResponse] = useState<TransferSuccessResponse>();

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
