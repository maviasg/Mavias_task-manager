// Displays a single task. Receives task data and action callbacks via props;
// it holds no state of its own — TaskManager owns the task list.
function Task({ task, onToggleComplete, onDelete }) {
  const isCompleted = task.status === "completed";

  return (
    <li className={`task ${isCompleted ? "task--completed" : ""}`}>
      <div className="task__info">
        <h3 className="task__name">{task.name}</h3>
        {task.description && (
          <p className="task__description">{task.description}</p>
        )}
        <span className="task__status">{task.status}</span>
      </div>
      <div className="task__actions">
        <button type="button" onClick={() => onToggleComplete(task.id)}>
          {isCompleted ? "Mark Pending" : "Mark Complete"}
        </button>
        <button
          type="button"
          className="task__delete"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default Task;
