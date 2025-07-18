import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { dbService } from "../../../shared/lib/api/notes-db";
import { marked } from "marked";
import { useDebouncedCallback } from "use-debounce";
import styles from "./notePage.module.css";
import { useLiveQuery } from "dexie-react-hooks";
import { NoteEditor } from "../../../features";
import { useNoteEditor } from "../../../features/noteEditor/model/useNoteEditor";
import { SaveIndicator } from "../../../shared/ui";

export const NotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const noteId = Number(id);
  const isNew = id === "new";

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { formData, setFormData, handleChange } = useNoteEditor({ title: "", content: "" });

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
        <SaveIndicator isSaving={isSaving} isEditing={isEditing} />
      </div>

      {isEditing ? (
       <NoteEditor formData={formData} onChange={handleChange} />
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
