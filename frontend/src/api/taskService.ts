import type { Task } from "../types";
import client from "./client";

export const tasksApi = {
  getAll: () => client.get<Task[]>("/tasks"),
  create: (title: string, description: string) =>
    client.post<Task>("/tasks", { title, description }),
  update: (id: string, data: Partial<Task>) =>
    client.put<Task>(`/tasks/${id}`, data),
  delete: (id: string) => client.delete(`/tasks/${id}`),
};
