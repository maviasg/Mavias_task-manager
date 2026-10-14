import { useEffect, useRef, useState } from "react";
import TaskList from "./TaskList";

const STORAGE_KEY = "task-manager:tasks";

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Owns the task list state. Add/complete/delete all flow through this one
// component and are passed down to TaskList/Task as callbacks (state lifted
// to the closest common ancestor of everything that needs it).
function TaskManager() {
  // Lazy initializer: loadTasks() only runs on the very first render, not
  // on every re-render.
  const [tasks, setTasks] = useState(loadTasks);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Refs hold values that survive re-renders without themselves causing
  // one when they change (unlike state). nextIdRef is a running counter;
  // nameInputRef is a handle to the actual <input> DOM node.
  const nextIdRef = useRef(null);
  const nameInputRef = useRef(null);
  if (nextIdRef.current === null) {
    nextIdRef.current =
      tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
  }

  // Runs once after the initial render (empty dependency array) — the
  // mount lifecycle. Used here to focus the input so you can start typing
  // immediately.
  useEffect(() => {
    console.log("TaskManager mounted");
    nameInputRef.current?.focus();
  }, []);

  // Runs after every render where `tasks` changed — the update lifecycle.
  // Used here to persist the list, so it survives a page refresh.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    console.log(`Tasks updated: ${tasks.length} task(s)`);
  }, [tasks]);

  function handleAddTask(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newTask = {
      id: nextIdRef.current++,
      name: trimmedName,
      description: description.trim(),
      status: "pending",
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setName("");
    setDescription("");
    nameInputRef.current?.focus();
  }

  function handleToggleComplete(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "completed" ? "pending" : "completed",
            }
          : task
      )
    );
  }

  function handleDeleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  return (
    <section className="task-manager">
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          ref={nameInputRef}
          type="text"
          placeholder="Task name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>

      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
      />
    </section>
  );
}

export default TaskManager;
