import { forwardRef } from "react";
import styles from "./noteCard.module.css";
import type { Note } from "../model/note.types";

interface NoteCardProps {
    hero: Note;
    onClick?: () => void;
}

export const NoteCard = forwardRef<HTMLDivElement, NoteCardProps>(({ hero, onClick }, ref) => {
    return (
        <article ref={ref} onClick={onClick} className={styles.noteCard}>
            <div>
                <p>Имя героя: {hero.name}</p>
                <div>
                    <p>Пол: {hero.gender}</p>
                    <p>Особенности: {hero.species}</p>
                </div>
            </div>
        </article>
    );
});
