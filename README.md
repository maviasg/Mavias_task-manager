# Task Manager

A simple task manager built with React, as the Week 1–3 upskilling assignments. It demonstrates components, props, state, event handling, hooks, refs, memoization, styled-components, code-splitting, error boundaries, and routing.

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
    Task.jsx          # renders a single task; wrapped in withLogging (HOC) + memo
    TaskList.jsx       # renders tasks (lazy-loaded); or EmptyState; summary via TaskSummary
    TaskSummary.jsx     # class PureComponent showing the completed/total count
    EmptyState.jsx       # stateless "no tasks yet" message
    TaskManager.jsx       # owns task state; add/complete/delete/filter logic lives here
    ErrorBoundary.jsx      # class component that catches render errors in its children
  hoc/
    withLogging.jsx          # HOC that logs a wrapped component's props on render
  pages/
    Home.jsx                  # landing route ("/")
    TaskManagerPage.jsx         # task manager route ("/tasks")
  App.jsx                        # router + nav + error boundary
  App.css                         # styling
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

## Week 3 additions

- **Lazy Loading + Suspense**: `TaskList` is loaded via `React.lazy()` and wrapped in `<Suspense>` in `TaskManager.jsx`, so its code ships as a separate chunk instead of bloating the initial bundle (confirmed in the build output: `TaskList-*.js` is a distinct file).
- **Controlled vs. uncontrolled components**: the task-add form (name, description, due date) is fully controlled, each input's value comes from React state. The "Filter tasks by name" input is deliberately **uncontrolled**: it has no `value` prop, the DOM owns its value, and we only read it via a ref when filtering.
- **Higher-Order Component**: `hoc/withLogging.jsx` wraps `Task` to log its props on every render, without changing `Task` itself.
- **Pure Component**: `TaskSummary.jsx` is a class component extending `React.PureComponent`, the class-based equivalent of `React.memo`.
- **Stateless component**: `EmptyState.jsx` and `Task.jsx` hold no state of their own, they're pure functions of their props.
- **Error Boundary**: `ErrorBoundary.jsx` wraps the routed pages in `App.jsx` and renders a fallback UI if a child component throws during render.
- **Handling multiple form inputs**: the add-task form now has three fields (name, description, due date) managed by one `form` state object and a single `handleFormChange` that keys off each input's `name` attribute.
- **React Router**: two routes, `/` (`Home`) and `/tasks` (`TaskManagerPage`), with a nav bar in `App.jsx`. A `public/_redirects` file (`/* /index.html 200`) makes direct loads/refreshes of `/tasks` work correctly once deployed on Netlify, which otherwise only knows about `index.html` as a static host.
