import { Link } from "react-router-dom";

// Stateless landing page — a second route so there's somewhere for
// React Router to navigate between.
function Home() {
  return (
    <div className="home">
      <p>
        A small React task manager built for the Week 1–3 upskilling
        assignments: components, props, state, hooks, refs, and now routing.
      </p>
      <Link className="home__cta" to="/tasks">
        Go to Task Manager →
      </Link>
    </div>
  );
}

export default Home;
