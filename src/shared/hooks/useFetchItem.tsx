import { useEffect, useState } from "react";
import { request } from "../lib/api";

export function useFetchItem<T>(id: string | undefined, baseUrl: string) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        const responseData = await request<T>(`${baseUrl}/${id}`);
        setData(responseData);
        setIsLoading(false);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Ошибка при получении данных"
        );
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id, baseUrl]);

  return { error, isLoading, data };
}
