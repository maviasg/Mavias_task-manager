# Task Manager

A simple task manager built with React, as the Week 1 and Week 2 upskilling assignments. It demonstrates components, props, state, event handling, hooks, refs, memoization, and styled-components.

## What is React, and how does it work?

React is a JavaScript library for building user interfaces out of small, reusable pieces called **components**. Each component is a function that returns a description of what should appear on screen, written in JSX (HTML-like syntax inside JavaScript).

React keeps an in-memory representation of the UI (the "virtual DOM"). When a component's **state** changes (e.g. a task is added or completed), React re-runs that component's function, compares the new output to the previous one, and updates only the parts of the real browser DOM that actually changed. This is why you write UI declaratively ("here's what the screen should look like given this data") instead of manually creating/updating/removing DOM elements yourself.

Data flows one way in this app:

- `TaskManager` holds the list of tasks in state.
- It passes tasks down to `TaskList` as **props**.
- `TaskList` renders one `Task` component per task, again via props.
- User actions (adding, completing, deleting a task) are handled by functions defined in `TaskManager` and passed down as props, so a click inside `Task` can update state that lives higher up in the tree.

## Project structure

```
src/
  components/
    Task.jsx         # renders a single task, receives task + action callbacks via props
    TaskList.jsx      # renders the list of Task components (or an empty state)
    TaskManager.jsx    # owns task state; add/complete/delete logic lives here
  App.jsx              # root component, renders TaskManager
  App.css              # styling
```

## Setup and running locally

Requires [Node.js](https://nodejs.org/) (includes npm).

```bash
npm install
npm run dev
```

Then open the URL printed in the terminal (typically `http://localhost:5173`).

To build a production bundle:

```bash
npm run build
```

The output goes to `dist/`, which is what gets deployed (e.g. to Netlify).

## Features

- Add a task (name + description) via a form.
- Mark a task complete / pending.
- Delete a task.
- Empty state message when there are no tasks.
- Task list persists across page reloads (saved to `localStorage`).
- Task name input auto-focuses on load and after adding a task.

## Week 2 additions

- **Styled Component**: `Task.jsx` is styled with `styled-components` instead of plain CSS classes (the rest of the app still uses `App.css`, for comparison).
- **Hooks (`useEffect`)**: `TaskManager` uses one effect to log on mount and focus the input, and another to persist `tasks` to `localStorage` whenever it changes.
- **Refs (`useRef`)**: a ref holds the task name `<input>` DOM node (for `.focus()`) and another holds a running task-ID counter that doesn't need to trigger a re-render when it changes.
- **`React.memo`**: `Task` is memoized so completing/deleting one task doesn't re-render every other task in the list.
- **Fragment**: `TaskList` groups a task-count summary and the `<ul>` with `<>...</>`, no extra wrapper element.
- **Keys**: each `Task` in the list is keyed by `task.id` (stable, not array index).
