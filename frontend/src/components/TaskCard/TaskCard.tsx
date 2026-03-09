import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../../types";
import { useTaskStore } from "../../store/useTaskStore";
import Button from "../UI/Button";
import CardTitle from "./CardTitle";
import CardDescription from "./CardDescription";
import CardTimestamp from "./CardTimestamp";

interface Props {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: Props) {
  const deleteTask = useTaskStore((s) => s.deleteTask);

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`bg-white rounded-lg px-3.5 py-3 mb-2 cursor-grab transition-shadow duration-150 ${
            snapshot.isDragging
              ? "shadow-lg shadow-indigo-500/25 border-2 border-indigo-600"
              : "shadow-sm border-2 border-transparent hover:shadow-md"
          }`}
          style={provided.draggableProps.style}
        >
          <div className="flex justify-between items-start">
            <CardTitle>{task.title}</CardTitle>
            <Button onClick={() => deleteTask(task.id)} variant="icon">&times;</Button>
          </div>
          <CardDescription text={task.description} />
          <CardTimestamp date={task.createdAt} />
        </div>
      )}
    </Draggable>
  );
}
