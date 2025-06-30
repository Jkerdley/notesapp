import styles from "./AddNoteButton.module.css";

interface AddNoteButtonProps {
  onClick?: () => void;
}

export const AddNoteButton = ({ onClick }: AddNoteButtonProps) => {
  return (
    <div onClick={onClick} className={styles.buttonWrapper}>
      <div className={styles.addNoteCard}>
        <div className={styles.addButton}>+</div>
        <div className={styles.addText}>Добавить заметку</div>
      </div>
    </div>
  );
};
