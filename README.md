# Task Manager

A simple task manager built with React, as the Week 1 upskilling assignment. It demonstrates components, props, state, and event handling.

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
