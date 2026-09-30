// Practice from Week 1 basics: components, props, state, event handling.
// Not imported anywhere — kept for reference only.

import { useState } from "react";

function Header(props) {
  return (
    <header>
      <h1>{props.title}</h1>
    </header>
  );
}

function TaskSummary(props) {
  return (
    <div>
      <p>
        {props.description}: {props.count}
      </p>
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  function handleAddTask() {
    setCount(count + 1);
  }
  return (
    <>
      <p>Tasks: {count}</p>
      <button onClick={handleAddTask}>Add Task</button>
    </>
  );
}

function Counter1() {
  const [count, setCount] = useState(0);
  function handleAddTask() {
    setCount(count + 1);
  }
  function handleRemoveTask() {
    if (count > 0) setCount(count - 1);
  }
  return (
    <>
      <p>Tasks: {count}</p>
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={handleRemoveTask}>Remove Task</button>
    </>
  );
}

function Basics() {
  const title = "MY TASK MANAGER";
  const count = 3;
  const description = "Total Tasks";
  return (
    <>
      <Header title={title} />
      <TaskSummary description={description} count={count} />
      <TaskSummary description={"Completed Tasks"} count={1} />
      <Counter />
      <Counter1 />
    </>
  );
}

export default Basics;
