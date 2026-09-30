import { useState } from "react";
import TaskList from "./TaskList";

let nextId = 1;

// Owns the task list state. Add/complete/delete all flow through this one
// component and are passed down to TaskList/Task as callbacks (state lifted
// to the closest common ancestor of everything that needs it).
function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleAddTask(event) {
    event.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newTask = {
      id: nextId++,
      name: trimmedName,
      description: description.trim(),
      status: "pending",
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setName("");
    setDescription("");
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
