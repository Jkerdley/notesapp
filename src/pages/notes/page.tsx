// import { Outlet, useParams } from "react-router-dom";
// import styles from "./notes.module.css";
// import { Sidebar } from "../../widgets";
// import { useEffect, useState } from "react";
// import { db, dbService, type Note } from "../../shared/lib/api/notes-db";
// import ListItem from "@mui/material/ListItem";

// export const NotesPage = () => {
//     const { id } = useParams();
//     return (
//         <div className={styles.notesPage}>
//             <div className={styles.notesGrid}>
//                 <div className={styles.notesListContainer}>
//                     <Sidebar />
//                 </div>
//                 <div className={styles.noteDetailContainer}>
//                     {id ? (
//                         <Outlet />
//                     ) : (
//                         <div className={styles.emptySelection}>
//                             <h2>Выберите заметку</h2>
//                             <p>Слева выберите заметку для просмотра деталей</p>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "./notes.module.css";
import { dbService, type Note } from "../../shared/lib/api/notes-db";
import { SearchBox } from "../../shared/ui";
import { ListItem } from "../../entities/note/ui";

export const NotesPage = () => {
    const { id } = useParams();
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Загрузка заметок при монтировании
    useEffect(() => {
        const loadNotes = async () => {
            const loadedNotes = searchQuery
                ? await dbService.searchNotes(searchQuery)
                : await dbService.getAllNotes();
            setNotes(loadedNotes);
        };

        loadNotes();
    }, [searchQuery]);

    // Создание первой заметки при первом запуске
    useEffect(() => {
        const createFirstNote = async () => {
            const existingNotes = await dbService.getAllNotes();
            if (existingNotes.length === 0) {
                await dbService.addNote({
                    title: "Первая заметка",
                    content: "Это ваша первая заметка. Можете ее отредактировать или удалить.",
                    tags: ["пример"],
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            }
        };

        createFirstNote();
    }, []);

    return (
        <div className={styles.notesPage}>
            <div className={styles.notesGrid}>
                <div className={styles.notesListContainer}>
                    <SearchBox onInputChange={setSearchQuery} />
                    <div className={styles.notesListContent}>
                        {notes.map((note) => (
                            <ListItem
                                key={note.id}
                                note={note}
                                onClick={() => navigate(`/notes/${note.id}`)}
                            />
                        ))}
                    </div>
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
