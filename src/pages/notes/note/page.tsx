// import { useNavigate, useParams } from "react-router-dom";
// import styles from "./notePage.module.css";
// import { Button } from "@mui/material";
// import { dbService, type Note } from "../../../shared/lib/api/notes-db";
// import { useEffect, useState } from "react";
// import { DataErrorBoundary } from "../../../shared/components";
// import { Loader } from "../../../shared/ui";

// export const NotePage = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [note, setNote] = useState<Note | null>(null);
//     const [isUpdating, setIsUpdating] = useState(false);
//     const [inputData, setInputData] = useState({
//         title: note?.title || "",
//         content: note?.content || "",
//     });

//     useEffect(() => {
//         if (!id) return;

//         const loadNote = async () => {
//             const noteId = Number(id);
//             const loadedNote = await dbService.getNote(noteId);
//             setNote(loadedNote || null);
//         };

//         loadNote();
//     }, [id]);

//     const handleDelete = async () => {
//         if (!id) return;
//         await dbService.deleteNote(Number(id));
//         navigate("/notes");
//     };

//     const handleUpdate = async (id, dataset) => {
//         if (!id) return;
//         await dbService.updateNote(id, dataset);
//         navigate(`/notes/${id}`);
//     };

//     const handleSetUpdateMode = () => {
//         setIsUpdating((prev) => !prev);
//     };

//     if (!note) return <div>Заметка не найдена...</div>;

//     return (
//         <DataErrorBoundary error={error} message="Не удалось загрузить данные о заметке">
//             {isLoading && <Loader />}
//             {note ? (
//                 <article className={styles.notePageContainer}>
//                     <div className={styles.noteActions}>
//                         <Button variant="contained" color="error" onClick={handleDelete}>
//                             Удалить
//                         </Button>
//                         <Button variant="contained" color="primary" onClick={handleSetUpdateMode}>
//                             Редактировать
//                         </Button>
//                     </div>
//                     <div className={styles.infoContainer}>
//                         <h2>{note.title}</h2>
//                         <div className={styles.noteContent}>{note.content}</div>
//                         <div className={styles.noteMeta}>
//                             <span>Создано: {new Date(note.createdAt).toLocaleString()}</span>
//                             <span>Обновлено: {new Date(note.updatedAt).toLocaleString()}</span>
//                         </div>
//                     </div>
//                 </article>
//             ) : (
//                 !isLoading && <h1>"Заметка не найдена"</h1>
//             )}
//         </DataErrorBoundary>
//     );
// };

import { useNavigate, useParams } from "react-router-dom";
import styles from "./notePage.module.css";
import { Button, TextField } from "@mui/material";
import { dbService } from "../../../shared/lib/api/notes-db";
import { useEffect, useState } from "react";
import { Loader } from "../../../shared/ui";
import { useDebouncedCallback } from "use-debounce";
import { DataErrorBoundary } from "../../../shared/components";

export const NotePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: "", content: "" });
    const [metaData, setMetaData] = useState({ createdAt: new Date(), updatedAt: new Date() });
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (!id) return;

        const loadNote = async () => {
            try {
                const note = await dbService.getNote(Number(id));
                if (note) {
                    setFormData({ title: note.title, content: note.content });
                    setMetaData({ createdAt: note.createdAt, updatedAt: note.updatedAt });
                } else {
                    setError("Заметка не найдена");
                }
            } catch (err) {
                setError("Ошибка загрузки заметки");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        loadNote();
    }, [id]);

    // Автосохранение при редактировании
    const saveNote = useDebouncedCallback(async () => {
        if (!id || !isUpdating) return;
        await dbService.updateNote(Number(id), formData);
        setMetaData((prev) => ({ ...prev, updatedAt: new Date() }));
    }, 500);

    useEffect(() => {
        if (isUpdating) saveNote();
    }, [formData, isUpdating, saveNote]);

    // Обработчики действий
    const handleDelete = async () => {
        if (window.confirm("Удалить заметку?")) {
            await dbService.deleteNote(Number(id!));
            navigate("/notes");
        }
    };

    const toggleEditMode = () => setIsUpdating(!isUpdating);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    if (isLoading) return <Loader />;

    return (
        <DataErrorBoundary error={error} message="Не удалось загрузить данные о заметке">
            <article className={styles.notePageContainer}>
                <div className={styles.noteActions}>
                    <Button variant="contained" color="error" onClick={handleDelete}>
                        Удалить
                    </Button>
                    <Button variant="contained" color="primary" onClick={toggleEditMode}>
                        {isUpdating ? "Готово" : "Редактировать"}
                    </Button>
                </div>

                <div className={styles.infoContainer}>
                    {isUpdating ? (
                        <>
                            <TextField
                                fullWidth
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                label="Заголовок"
                                variant="outlined"
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={10}
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                label="Содержание"
                                variant="outlined"
                                margin="normal"
                            />
                        </>
                    ) : (
                        <>
                            <h2>{formData.title}</h2>
                            <div className={styles.noteContent}>{formData.content}</div>
                            <div className={styles.noteMeta}>
                                <span>Создано: {new Date(metaData.createdAt).toLocaleString()}</span>
                                <span>Обновлено: {new Date(metaData.updatedAt).toLocaleString()}</span>
                            </div>
                        </>
                    )}
                </div>
            </article>
        </DataErrorBoundary>
    );
};
