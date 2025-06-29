import styles from "./ListItem.module.css";
import type { Note } from "../../../shared/lib/api/notes-db";

interface ListItemProps {
    note: Note;
    onClick?: () => void;
}

export const ListItem = ({ note, onClick }: ListItemProps) => {
    return (
        <article onClick={onClick} className={styles.noteCard}>
            <div className={styles.infoContainer}>
                <p>{note.title}</p>
                <div className={styles.noteInfo}>
                    <p className={styles.noteDescription}>{note.content}</p>
                    {/* <p>{note.createdAt}</p> */}
                </div>
            </div>
        </article>
    );
};
