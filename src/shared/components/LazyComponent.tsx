import { Suspense, type ReactNode } from "react";
import { Loader } from "../ui/loaders/Loader";
import { ErrorBoundary } from "./ErrorBoundary";

interface LazyComponentProps {
  children: ReactNode;
  errorFallback?: ReactNode;
}

export const LazyComponent = ({
  children,
  errorFallback,
}: LazyComponentProps) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  );
};
