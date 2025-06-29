import { Component, type ErrorInfo, type ReactNode } from "react";
import styles from "./errorBoundary.module.css";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Ошибка в компоненте:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorContainer}>
          <h2>Что-то пошло не так</h2>
          <p>Произошла ошибка при загрузке этого раздела.</p>
          <details>
            <summary>Подробности ошибки</summary>
            <p>{this.state.error?.message}</p>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
