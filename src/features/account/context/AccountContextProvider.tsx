import { createContext, useEffect, useState } from "react";
import useAccountBalance from "src/api/useAccountBalance";

interface AccountContextValue {
    accountBalance: number;
    setAccountBalance: (balance: number) => void;
}

export const AccountContext = createContext<AccountContextValue | undefined>(undefined);

const AccountContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const { children } = props;

    const [accountBalance, setAccountBalance] = useState<number>(0);

    const { data } = useAccountBalance();

    useEffect(() => {
        if (data) {
            setAccountBalance(data.amount);
        }
    }, [data]);

    return (
        <AccountContext.Provider
            value={{
                accountBalance,
                setAccountBalance,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountContextProvider;
