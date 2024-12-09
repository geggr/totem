const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
})

export const brl = (amount: number) => currencyFormatter.format(amount)