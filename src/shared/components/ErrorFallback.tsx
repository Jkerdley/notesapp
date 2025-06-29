import { type ReactNode } from "react";
import styles from "./errorBoundary.module.css";

interface ErrorFallbackProps {
  error?: Error | null;
  message?: string;
  children?: ReactNode;
}

export const ErrorFallback = ({
  error,
  message = "Произошла ошибка при загрузке данных",
  children,
}: ErrorFallbackProps) => {
  return (
    <div className={styles.errorContainer}>
      <h2>Что-то пошло не так</h2>
      <p>{message}</p>
      {error && (
        <details>
          <summary>Подробности ошибки</summary>
          <p>{error.message}</p>
        </details>
      )}
      {children}
    </div>
  );
};
