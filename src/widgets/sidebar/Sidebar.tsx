import { useState } from "react";
import styles from "./noteList.module.css";
import { DataErrorBoundary } from "../../shared/components";
import { SearchBox } from "../../shared/ui";
import { ListItem } from "../../entities/note/ui";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../../shared/lib/api/notes-db";

export const Sidebar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const notes = useLiveQuery(() => db.notes.orderBy("createdAt").reverse().toArray(), []);

    const filteredNotes =
        notes?.filter(
            (note) =>
                note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                note.content.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

    const handleSearchInput = (value: string) => {
        setSearchQuery(value);
    };

    return (
        <DataErrorBoundary error={"Ошибка"} message="Не удалось загрузить данные о заметках">
            <SearchBox onInputChange={handleSearchInput} />
            <div className={styles.notesListContent}>
                {filteredNotes.map((note) => (
                    <ListItem key={note.id} note={note} link={`/notes/${note.id}`} />
                ))}
            </div>
            <ListItem isAddButton link="/notes/new" />
        </DataErrorBoundary>
    );
};
