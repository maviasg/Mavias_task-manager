import Task from "./Task";

// Renders the list of Task components. Conditional rendering handles the
// empty-list case instead of showing an empty <ul>.
function TaskList({ tasks, onToggleComplete, onDelete }) {
  if (tasks.length === 0) {
    return <p className="task-list__empty">No tasks yet. Add one above.</p>;
  }

  const completedCount = tasks.filter((task) => task.status === "completed").length;

  return (
    // Fragment groups the summary line and the list without adding an
    // extra wrapper element to the DOM.
    <>
      <p className="task-list__summary">
        {completedCount} of {tasks.length} tasks completed
      </p>
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
    </>
  );
}

export default TaskList;
