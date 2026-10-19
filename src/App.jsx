import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./pages/Home";
import TaskManagerPage from "./pages/TaskManagerPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app__header">
          <h1>Task Manager</h1>
          <nav className="app__nav">
            <Link to="/">Home</Link>
            <Link to="/tasks">Task Manager</Link>
          </nav>
        </header>

        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskManagerPage />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
}

export default App;
