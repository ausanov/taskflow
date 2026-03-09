import { useCallback, useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useTaskStore } from "../../../store/useTaskStore";
import { TaskStatus } from "../../../types";
import Column from "../Column/Column";
import Header from "../../Header/Header";
import NewTaskForm from "../../NewTaskForm/NewTaskForm";
import ErrorBanner from "../../UI/ErrorBanner";

const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: "Todo", title: "📋 To Do" },
  { id: "InProgress", title: "⚡ In Progress" },
  { id: "Done", title: "✅ Done" },
];

export default function Board() {
  const { tasks, fetchTasks, moveTask, addTask, loading, error, clearError } =
    useTaskStore();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const onDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;
    const newStatus = result.destination.droppableId as TaskStatus;
    moveTask(result.draggableId, newStatus, result.destination.index);
  }, [moveTask]);

  const handleAdd = useCallback((title: string, description: string) => {
    addTask(title, description);
    setShowForm(false);
  }, [addTask]);

  return (
    <div className="h-screen flex flex-col bg-gray-100 font-sans">
      <Header onNewTask={() => setShowForm(!showForm)} />

      <main className="p-6 flex-1 overflow-auto">
        {error && <ErrorBanner message={error} onDismiss={clearError} />}
        {showForm && (
          <NewTaskForm onAdd={handleAdd} onCancel={() => setShowForm(false)} />
        )}
        {loading ? (
          <div className="text-center py-16 text-gray-400">
            Loading tasks...
          </div>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-3 gap-4 h-full">
              {COLUMNS.map((col) => (
                <Column
                  key={col.id}
                  columnId={col.id}
                  title={col.title}
                  tasks={tasks
                    .filter((t) => t.status === col.id)
                    .sort((a, b) => a.order - b.order)}
                />
              ))}
            </div>
          </DragDropContext>
        )}
      </main>
    </div>
  );
}
