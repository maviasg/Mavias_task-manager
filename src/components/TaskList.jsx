import Task from "./Task";

// Renders the list of Task components. Conditional rendering handles the
// empty-list case instead of showing an empty <ul>.
function TaskList({ tasks, onToggleComplete, onDelete }) {
  if (tasks.length === 0) {
    return <p className="task-list__empty">No tasks yet. Add one above.</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
