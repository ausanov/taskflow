import { useCallback, useState } from "react";
import FormField from "../UI/FormField";
import Button from "../UI/Button";

interface Props {
  onAdd: (title: string, description: string) => void;
  onCancel: () => void;
}

export default function NewTaskForm({ onAdd, onCancel }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = useCallback(() => {
    if (!title.trim()) return;
    onAdd(title, description);
    setTitle("");
    setDescription("");
  }, [title, description, onAdd]);

  return (
    <div className="bg-white rounded-xl p-5 mb-5 shadow-md flex gap-2.5 items-end">
      <FormField
        label="Title"
        value={title}
        onChange={setTitle}
        onSubmit={handleSubmit}
        placeholder="What needs to be done?"
        autoFocus
        className="flex-2"
        required
      />
      <FormField
        label="Description"
        value={description}
        onChange={setDescription}
        onSubmit={handleSubmit}
        placeholder="Optional description..."
        className="flex-3"
      />
      <Button onClick={handleSubmit}>Add Task</Button>
      <Button onClick={onCancel} variant="secondary">
        Cancel
      </Button>
    </div>
  );
}
