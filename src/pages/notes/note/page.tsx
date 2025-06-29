import { useParams } from "react-router-dom";
import styles from "./notePage.module.css";
import { useFetchItem } from "../../../shared/hooks";
import type { Note } from "../../../entities/note/model/note.types";
import { DataErrorBoundary } from "../../../shared/components";
import { Loader } from "../../../shared/ui";

export const NotePage = () => {
    const { id } = useParams();
    const {
        error,
        isLoading,
        data: note,
    } = useFetchItem<Note>(id, "https://rickandmortyapi.com/api/character");

    return (
        <DataErrorBoundary error={error} message="Не удалось загрузить данные о заметке">
            {isLoading && <Loader />}
            {note ? (
                <article className={styles.notePageContainer}>
                    <div className={styles.infoContainer}>
                        <p className={styles.heroName}>Заметка: {note.name}</p>
                        <div className={styles.heroInfo}>
                            <p>Описание: {note.gender}</p>
                        </div>
                    </div>
                </article>
            ) : (
                !isLoading && <h1>"Заметка не найдена"</h1>
            )}
        </DataErrorBoundary>
    );
};
