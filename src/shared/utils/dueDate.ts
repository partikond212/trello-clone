
export type DueDateStatus = "urgent" | "soon" | "later" | "none";

export function getDueDateStatus(dueDate?: string): DueDateStatus {
  if (!dueDate) return "none";
  const diffDays = (new Date(dueDate).getTime() - Date.now()) / 86400000;
  if (diffDays <= 7) return "urgent";  
  if (diffDays <= 30) return "soon";    
  return 'later'
}
