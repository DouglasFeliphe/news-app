export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}
