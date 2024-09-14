import React, { ReactNode, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./styles";

const MasonryGrid = lazy(() =>
  import("./components/MasonryGrid").then((module) => ({
    default: module.MasonryGrid,
  }))
);
const PhotoDetails = lazy(() =>
  import("./components/PhotoDetails").then((module) => ({
    default: module.PhotoDetails,
  }))
);

interface ErrorBoundaryState {
  hasError: boolean;
}

type PropsWithChildren<P = {}> = P & { children?: ReactNode | undefined };

class ErrorBoundary extends React.Component<
  PropsWithChildren,
  ErrorBoundaryState
> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <p>Loading failed! Please reload.</p>;
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <GlobalStyle />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" index element={<MasonryGrid />} />
            <Route path="/photo/:id" element={<PhotoDetails />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
