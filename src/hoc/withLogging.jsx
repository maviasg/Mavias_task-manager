import { useEffect } from "react";

// A Higher-Order Component: a function that takes a component and returns a
// new component with extra behaviour, without changing what the original
// component does. Here, it logs the wrapped component's props on every
// render, useful for debugging without littering the component itself with
// console.log calls.
function withLogging(WrappedComponent) {
  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function WithLogging(props) {
    useEffect(() => {
      console.log(`[${componentName}] rendered with props:`, props);
    });

    return <WrappedComponent {...props} />;
  }

  WithLogging.displayName = `withLogging(${componentName})`;
  return WithLogging;
}

export default withLogging;
