import { type ReactNode } from "react";
import { ErrorFallback } from "./ErrorFallback";

interface DataErrorBoundaryProps {
    children: ReactNode;
    error: string | null;
    fallback?: ReactNode;
    message?: string;
}

export const DataErrorBoundary = ({
    children,
    error,
    fallback,
    message = "Произошла ошибка при загрузке данных",
}: DataErrorBoundaryProps) => {
    if (!error) {
        return children;
    }

    if (fallback) {
        return fallback;
    }

    return <ErrorFallback error={new Error(error)} message={message} />;
};
