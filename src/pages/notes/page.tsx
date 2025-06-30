import { Outlet, useParams } from "react-router-dom";
import styles from "./notes.module.css";
import { SearchBox } from "../../shared/ui";
import { ListItem } from "../../entities/note/ui";
import { useLiveQuery } from "dexie-react-hooks";
import { dbService } from "../../shared/lib/api/notes-db";
import { useEffect, useState } from "react";
import { AddNoteButton } from "../../features/addNote/AddNoteButton";

export const NotesPage = () => {
    const { id } = useParams();
    const [searchQuery, setSearchQuery] = useState("");

    const allNotes = useLiveQuery(() => dbService.getAllNotes(), []);
    const filteredNotes = useLiveQuery(
        () => (searchQuery ? dbService.searchNotes(searchQuery) : Promise.resolve(allNotes || [])),
        [searchQuery, allNotes]
    );

    useEffect(() => {
        if (allNotes?.length === 0) {
            dbService.addNote({
                title: "Первая заметка",
                content: "Это ваша первая заметка. Можете ее отредактировать или удалить.",
                tags: ["пример"],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
    }, [allNotes]);

    return (
        <div className={styles.notesPage}>
            <div className={styles.notesGrid}>
                <div className={styles.notesListContainer}>
                    <SearchBox onInputChange={setSearchQuery} />
                    <div className={styles.notesListContent}>
                        {filteredNotes?.map((note) => (
                            <ListItem key={note.id} note={note} link={`/notes/${note.id}`} />
                        ))}
                    </div>
                    <AddNoteButton link="/notes/new" />
                </div>
                <div className={styles.noteDetailContainer}>
                    {id ? (
                        <Outlet />
                    ) : (
                        <div className={styles.emptySelection}>
                            <h2>Выберите заметку</h2>
                            <p>Слева выберите заметку для просмотра деталей</p>
                            <AddNoteButton link="/notes/new" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
