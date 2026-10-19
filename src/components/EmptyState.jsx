// A stateless component: no state, no lifecycle, just props in, markup out.
function EmptyState({ message }) {
  return <p className="task-list__empty">{message}</p>;
}

export default EmptyState;
