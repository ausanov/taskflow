export type TaskStatus = "Todo" | "InProgress" | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  order: number;
  createdAt: string;
}

export interface User {
  email: string;
  displayName: string;
  token: string;
}

export interface KanbanColumn {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}
