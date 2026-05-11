export const generateTxnId = () => {

    return (
        Date.now().toString() +
        Math.floor(
            1000 + Math.random() * 9000
        )
    ).slice(0, 14)
}