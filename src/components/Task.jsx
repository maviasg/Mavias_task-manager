import { memo } from "react";
import styled from "styled-components";

const TaskItem = styled.li`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
`;

const TaskName = styled.h3`
  margin: 0;
  font-size: 18px;
  color: var(--text-h);
  text-decoration: ${(props) => (props.$completed ? "line-through" : "none")};
`;

const TaskDescription = styled.p`
  margin: 0;
  font-size: 15px;
`;

const TaskStatus = styled.span`
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--accent);
`;

const TaskActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex-shrink: 0;
`;

const ActionButton = styled.button`
  font: inherit;
  font-size: 13px;
  padding: 6px 10px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text-h);
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    border-color: var(--accent-border);
  }
`;

const DeleteButton = styled(ActionButton)`
  color: #d33;
`;

// React.memo skips re-rendering a Task when its own props haven't changed,
// so editing one task doesn't re-render every other item in the list.
const Task = memo(function Task({ task, onToggleComplete, onDelete }) {
  const isCompleted = task.status === "completed";

  return (
    <TaskItem>
      <div>
        <TaskName $completed={isCompleted}>{task.name}</TaskName>
        {task.description && (
          <TaskDescription>{task.description}</TaskDescription>
        )}
        <TaskStatus>{task.status}</TaskStatus>
      </div>
      <TaskActions>
        <ActionButton type="button" onClick={() => onToggleComplete(task.id)}>
          {isCompleted ? "Mark Pending" : "Mark Complete"}
        </ActionButton>
        <DeleteButton type="button" onClick={() => onDelete(task.id)}>
          Delete
        </DeleteButton>
      </TaskActions>
    </TaskItem>
  );
});

export default Task;
