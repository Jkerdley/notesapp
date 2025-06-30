import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { Layout } from "../../layout/Layout";
import { PrivateRoute } from "../privateRoute/PrivateRoute";
import { LazyComponent } from "../../../shared/components";
import { NotFoundPage } from "../../../pages/404/page";
import { LoginPage } from "../../../pages/auth/login/page";

const NotesPage = lazy(() =>
    import("../../../pages/notes/page").then((module) => ({
        default: module.NotesPage,
    }))
);
const NotePage = lazy(() =>
    import("../../../pages/notes/note/page").then((module) => ({
        default: module.NotePage,
    }))
);

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <PrivateRoute>
                            <LazyComponent>
                                <NotFoundPage />
                            </LazyComponent>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="notes"
                    element={
                        <PrivateRoute>
                            <LazyComponent>
                                <NotesPage />
                            </LazyComponent>
                        </PrivateRoute>
                    }
                >
                    <Route path="new" element={<NotePage />} />
                    <Route path=":id" element={<NotePage />} />
                </Route>
            </Route>
            <Route
                path="*"
                element={
                    <PrivateRoute>
                        <NotFoundPage />
                    </PrivateRoute>
                }
            />

            <Route path="/">
                <Route
                    path="login"
                    element={
                        <LazyComponent>
                            <LoginPage />
                        </LazyComponent>
                    }
                />
            </Route>
        </Routes>
    );
}
