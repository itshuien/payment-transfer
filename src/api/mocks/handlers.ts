import getAccountBalanceHandlers from "./getAccountBalanceHandlers";
import getTransferHistoryHandlers from "./getTransferHistoryHandlers";

export const handlers = [
    getAccountBalanceHandlers.success(),
    getTransferHistoryHandlers.success(),
];
