import { ErrorBoundary } from "../shared/components";
import { AuthProvider, DbProvider } from "./providers";
import { Router } from "./routing/router/Router";

function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <DbProvider>
                    <Router />
                </DbProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;
