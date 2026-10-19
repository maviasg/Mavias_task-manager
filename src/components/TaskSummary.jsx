import { PureComponent } from "react";

// PureComponent automatically skips re-rendering when its props are
// shallow-equal to the previous render, the class-component equivalent of
// wrapping a function component in React.memo.
class TaskSummary extends PureComponent {
  render() {
    const { completedCount, totalCount } = this.props;
    return (
      <p className="task-list__summary">
        {completedCount} of {totalCount} tasks completed
      </p>
    );
  }
}

export default TaskSummary;
