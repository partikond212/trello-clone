export function formatDueDate(dueDate: string): string {
  return new Intl.DateTimeFormat("ru", { day: "numeric", month: "short" }).format(new Date(dueDate));
}
