import { useContext } from 'react';
import { AccountContext } from './AccountContextProvider';

const useAccountContext = () => {
    const context = useContext(AccountContext);

    if (!context) {
        throw new Error('useAccountContext must be used within an AccountContextProvider');
    }

    return context;
};

export default useAccountContext;
