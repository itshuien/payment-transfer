/**
 * Converts a number to Malaysian Ringgit (RM) currency format
 */
export const formatAmount = (amount: number) => {
    return amount.toLocaleString('en-MY', {
        style: 'currency',
        currency: 'MYR',
    });
};
