import { Link } from "react-router-dom";
import styles from "./AddNoteButton.module.css";

interface AddNoteButtonProps {
    onClick?: () => void;
    link?: string;
}

export const AddNoteButton = ({ onClick, link }: AddNoteButtonProps) => {
    const content = (
        <div className={styles.addNoteCard}>
            <div className={styles.addButton}>+</div>
            <div className={styles.addText}>Добавить заметку</div>
        </div>
    );

    return link ? (
        <Link to={link} className={styles.linkWrapper}>
            {content}
        </Link>
    ) : (
        <div onClick={onClick} className={styles.linkWrapper}>
            {content}
        </div>
    );
};
