import { useContext } from "react";
import { TransferContext } from "./TransferContextProvider";

const useTransferContext = () => {
    const context = useContext(TransferContext);

    if (!context) {
        throw new Error("useTransferContext must be used within a TransferContextProvider");
    }

    return context;
};

export default useTransferContext;
