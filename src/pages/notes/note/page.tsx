import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import { dbService } from "../../../shared/lib/api/notes-db";
import { marked } from "marked";
import { useDebouncedCallback } from "use-debounce";
import styles from "./notePage.module.css";
import { useLiveQuery } from "dexie-react-hooks";

export const NotePage = () => {
  const { id } = useParams();
  const noteId = Number(id);
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const isNew = id === "new";
  const note = useLiveQuery(() => dbService.getNote(noteId), [noteId]);

  useEffect(() => {
    if (note) {
      setFormData({ title: note.title, content: note.content });
    }
  }, [note]);

  useEffect(() => {
    if (isNew && !note) {
      dbService
        .addNote({
          title: "Новая заметка",
          content: "",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then((newId) => {
          navigate(`/notes/${newId}`);
        })
        .catch((error) => console.error("Error creating note:", error));
    }
  }, [isNew, note]);

  const debouncedSave = useDebouncedCallback(async () => {
    if (!noteId || !isEditing) return;

    setIsSaving(true);
    try {
      await dbService.updateNote(noteId, formData);
    } catch (error) {
      console.error("Ошибка автосохранения:", error);
    } finally {
      setIsSaving(false);
    }
  }, 500);

  useEffect(() => {
    if (isEditing) {
      debouncedSave();
    }
  }, [formData, isEditing, debouncedSave]);

  const handleDelete = async () => {
    if (window.confirm("Удалить заметку?")) {
      await dbService.deleteNote(noteId);
      navigate("/notes");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  if (!note && !isNew) return <p>Заметка не найдена</p>;

  return (
    <section className={styles.notePageContainer}>
      <div className={styles.notePageButtons}>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Удалить
        </Button>

        <Button variant="contained" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Сохранить" : "Редактировать"}
        </Button>
        {isEditing || isSaving ? (
          <span className={styles.savingIndicator}>Сохранение...</span>
        ) : (
          <span className={styles.savedIndicator}>✓ Сохранено</span>
        )}
      </div>

      {isEditing ? (
        <>
          <TextField
            fullWidth
            name="title"
            value={formData.title}
            onChange={handleChange}
            label="Заголовок"
            margin="normal"
          />
          <TextField
            fullWidth
            multiline
            name="content"
            value={formData.content}
            onChange={handleChange}
            label="Содержание (Markdown)"
            margin="normal"
            rows={12}
          />
        </>
      ) : (
        <>
          <h2>{formData.title}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: marked(formData.content || "") }}
          />
          <div className={styles.infoContainer}>
            <span>Создано: {new Date(note!.createdAt).toLocaleString()}</span>
            <span>Обновлено: {new Date(note!.updatedAt).toLocaleString()}</span>
          </div>
        </>
      )}
    </section>
  );
};
