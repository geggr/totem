export const formatTimestamp = (raw: string) => new Date(raw).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
})