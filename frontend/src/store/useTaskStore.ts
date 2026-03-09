import { create } from "zustand";
import type { Task, TaskStatus } from "../types";
import { tasksApi } from "../api/taskService";

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (title: string, description: string) => Promise<void>;
  moveTask: (taskId: string, newStatus: TaskStatus, newOrder: number) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  clearError: () => void;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  clearError: () => set({ error: null }),

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await tasksApi.getAll();
      set({ tasks: data, loading: false });
    } catch {
      set({ error: "Failed to load tasks", loading: false });
    }
  },

  addTask: async (title, description) => {
    const tempId = `temp-${Date.now()}`;
    const tempTask: Task = {
      id: tempId,
      title,
      description,
      status: "Todo",
      order: get().tasks.filter((t) => t.status === "Todo").length,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ tasks: [...s.tasks, tempTask] }));

    try {
      const { data } = await tasksApi.create(title, description);
      set((s) => ({ tasks: s.tasks.map((t) => (t.id === tempId ? data : t)) }));
    } catch {
      set((s) => ({
        tasks: s.tasks.filter((t) => t.id !== tempId),
        error: "Failed to create task",
      }));
    }
  },

  moveTask: async (taskId, newStatus, newOrder) => {
    const prevTasks = get().tasks;
    set((s) => ({
      tasks: s.tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus, order: newOrder } : t
      ),
    }));

    try {
      const task = get().tasks.find((t) => t.id === taskId)!;
      await tasksApi.update(taskId, { ...task, status: newStatus, order: newOrder });
    } catch {
      set({ tasks: prevTasks, error: "Failed to move task" });
    }
  },

  deleteTask: async (taskId) => {
    const prevTasks = get().tasks;
    set((s) => ({ tasks: s.tasks.filter((t) => t.id !== taskId) }));

    try {
      await tasksApi.delete(taskId);
    } catch {
      set({ tasks: prevTasks, error: "Failed to delete task" });
    }
  },
}));
