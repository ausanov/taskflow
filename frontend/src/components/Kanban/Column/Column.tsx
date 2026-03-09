import { Droppable } from "@hello-pangea/dnd";
import { Task, TaskStatus } from "../../../types";
import TaskCard from "../../TaskCard/TaskCard";

const COLUMN_STYLES: Record<
  TaskStatus,
  { bg: string; accent: string; badge: string }
> = {
  Todo: { bg: "bg-blue-50", accent: "border-t-blue-500", badge: "bg-blue-500" },
  InProgress: {
    bg: "bg-amber-50",
    accent: "border-t-amber-500",
    badge: "bg-amber-500",
  },
  Done: {
    bg: "bg-green-50",
    accent: "border-t-green-500",
    badge: "bg-green-500",
  },
};

interface Props {
  columnId: TaskStatus;
  title: string;
  tasks: Task[];
}

export default function Column({ columnId, title, tasks }: Props) {
  const styles = COLUMN_STYLES[columnId];

  return (
    <div
      className={`${styles.bg} rounded-xl p-4 border-t-4 ${styles.accent} flex flex-col`}
    >
      <div className="flex items-center mb-3.5 gap-2">
        <h3 className="m-0 text-sm font-bold text-gray-700 flex-1">{title}</h3>
        <span
          className={`${styles.badge} text-white rounded-full px-2.5 py-0.5 text-xs font-semibold`}
        >
          {tasks.length}
        </span>
      </div>

      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 min-h-[80px] rounded-lg transition-all duration-200 ${
              snapshot.isDraggingOver ? "bg-black/5 p-1" : "p-0"
            }`}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
