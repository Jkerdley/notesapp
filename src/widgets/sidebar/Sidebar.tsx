import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./noteList.module.css";
import { DataErrorBoundary } from "../../shared/components";
import { SearchBox } from "../../shared/ui";
import { ListItem } from "../../entities/note/ui";
import { useLiveQuery } from "dexie-react-hooks";
import { dbService } from "../../shared/lib/api/notes-db";

export const Sidebar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const notes = useLiveQuery(() => dbService.getAllNotes());
    const filteredNotes = notes!.filter((note) =>
        note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearchInput = (value: string) => {
        setSearchQuery(value);
    };

    return (
        <DataErrorBoundary error={"Ошибка"} message="Не удалось загрузить данные о героях">
            <SearchBox onInputChange={handleSearchInput} />
            <div className={styles.notesListContent}>
                {filteredNotes.map((note) => (
                    <ListItem key={note.id} note={note} onClick={() => navigate(`/notes/${note.id}`)} />
                ))}
            </div>
        </DataErrorBoundary>
    );
};
