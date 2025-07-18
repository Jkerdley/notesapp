import { Link } from "react-router-dom";
import styles from "./ListItem.module.css";
import { AddNoteButton } from "../../../features/addNote/AddNoteButton";
import type { Note } from "../model/note.types";

interface ListItemProps {
    note?: Note;
    link: string;
    isAddButton?: boolean;
}

export const ListItem = ({ note, link, isAddButton }: ListItemProps) => {
    return (
        <Link to={link} className={styles.linkWrapper}>
            {isAddButton ? (
                <AddNoteButton />
            ) : (
                <article className={styles.noteCard}>
                    <div className={styles.infoContainer}>
                        <p>{note?.title}</p>
                        <div className={styles.noteInfo}>
                            <p className={styles.noteDescription}>{note?.content}</p>
                        </div>
                    </div>
                </article>
            )}
        </Link>
    );
};
