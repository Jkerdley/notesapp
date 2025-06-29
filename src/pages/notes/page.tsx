import { Outlet, useParams } from "react-router-dom";
import styles from "./notes.module.css";
import { NoteList } from "../../widgets";

export const NotesPage = () => {
    const { id } = useParams();
    return (
        <div className={styles.notesPage}>
            <div className={styles.notesGrid}>
                <div className={styles.notesListContainer}>
                    <NoteList />
                </div>
                <div className={styles.noteDetailContainer}>
                    {id ? (
                        <Outlet />
                    ) : (
                        <div className={styles.emptySelection}>
                            <h2>Выберите заметку</h2>
                            <p>Слева выберите заметку для просмотра деталей</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
