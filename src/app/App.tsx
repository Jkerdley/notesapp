import { ErrorBoundary } from "../shared/components";
import { AuthProvider } from "./providers";
import { Router } from "./routing/router/Router";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
