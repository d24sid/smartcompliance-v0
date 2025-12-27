export function formatDate(date: string | Date) {
  if (!date) return "N/A"
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export function formatDateTime(date: string | Date) {
  if (!date) return "N/A"
  const d = typeof date === "string" ? new Date(date) : date
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}
