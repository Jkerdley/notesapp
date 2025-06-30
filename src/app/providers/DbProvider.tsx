import { useEffect, type ReactNode } from "react";
import { db } from "../../shared/lib/api/notes-db";

interface DbProviderProps {
    children: ReactNode;
}

export const DbProvider = ({ children }: DbProviderProps) => {
    useEffect(() => {
        db.open().catch((error) => {
            console.error("Ошибку открытия базы данных:", error);
        });

        return () => db.close();
    }, []);

    return <>{children}</>;
};
