import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { request } from "../lib/api";

export const useFetchData = <T>(
  url: string
): [T[], string | null, boolean, boolean, Dispatch<SetStateAction<number>>] => {
  const [data, setData] = useState<T[] | []>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const serverData = await request<T>(url + `?page=${page}`);
        setIsLoading(false);
        setData((prev) => [...prev, ...serverData.results]);
        setHasMore(serverData.info.pages > page);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ошибка при получении данных");
        }
        console.error("Ошибка:", error);
      }
    };

    fetchData();
  }, [url, page]);

  return [data, error, isLoading, hasMore, setPage];
};
