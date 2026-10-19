import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";

// React.lazy + Suspense: TaskList's code isn't downloaded until it's
// actually needed, splitting it into a separate chunk instead of bundling
// it into the initial page load.
const TaskList = lazy(() => import("./TaskList"));

const STORAGE_KEY = "task-manager:tasks";

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const EMPTY_FORM = { name: "", description: "", dueDate: "" };

// Owns the task list state. Add/complete/delete all flow through this one
// component and are passed down to TaskList/Task as callbacks (state lifted
// to the closest common ancestor of everything that needs it).
function TaskManager() {
  // Lazy initializer: loadTasks() only runs on the very first render, not
  // on every re-render.
  const [tasks, setTasks] = useState(loadTasks);

  // One controlled form object instead of one useState per field — a single
  // handler keyed by each input's `name` attribute handles any number of
  // fields without adding a new handler each time one is added.
  const [form, setForm] = useState(EMPTY_FORM);

  // Uncontrolled input: the DOM owns this field's value, not React state.
  // There's no `value` prop below, so typing doesn't go through React at
  // all — we only read the current value (via the ref) when we need it,
  // here on every keystroke, just to drive the filtered list.
  const filterInputRef = useRef(null);
  const [filterText, setFilterText] = useState("");

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

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  function handleAddTask(event) {
    event.preventDefault();

    const trimmedName = form.name.trim();
    if (!trimmedName) return;

    const newTask = {
      id: nextIdRef.current++,
      name: trimmedName,
      description: form.description.trim(),
      dueDate: form.dueDate,
      status: "pending",
    };

    setTasks((prevTasks) => [...prevTasks, newTask]);
    setForm(EMPTY_FORM);
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

  const visibleTasks = useMemo(() => {
    const query = filterText.trim().toLowerCase();
    if (!query) return tasks;
    return tasks.filter((task) => task.name.toLowerCase().includes(query));
  }, [tasks, filterText]);

  return (
    <section className="task-manager">
      <form className="task-form" onSubmit={handleAddTask}>
        <input
          ref={nameInputRef}
          type="text"
          name="name"
          placeholder="Task name"
          value={form.name}
          onChange={handleFormChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleFormChange}
        />
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleFormChange}
        />
        <button type="submit">Add Task</button>
      </form>

      <input
        ref={filterInputRef}
        type="text"
        className="task-filter"
        placeholder="Filter tasks by name…"
        defaultValue=""
        onChange={() => setFilterText(filterInputRef.current.value)}
      />

      <Suspense fallback={<p className="task-list__empty">Loading tasks…</p>}>
        <TaskList
          tasks={visibleTasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </Suspense>
    </section>
  );
}

export default TaskManager;
