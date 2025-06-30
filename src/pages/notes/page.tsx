import styles from "./notes.module.css";
import { useState } from "react";
import { AddNoteButton } from "../../features/addNote/AddNoteButton";
import { useNotes } from "../../shared/hooks/useNotes";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { dbService } from "../../shared/lib/api/notes-db";
import { SearchBox } from "../../shared/ui";
import { ListItem } from "../../entities/note";

export const NotesPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const { notes: filteredNotes } = useNotes(searchQuery);

  const handleAddNewNote = async () => {
    const newId = await dbService.addNote({
      title: "Заголовок заметки",
      content: "Текст заметки",
      tags: ["Тэг заметки"],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    navigate(`/notes/${newId}`);
  };

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
          <AddNoteButton onClick={handleAddNewNote} />
        </div>
        <div className={styles.noteDetailContainer}>
          {id ? (
            <Outlet />
          ) : (
            <div className={styles.emptySelection}>
              <h2>Выберите заметку</h2>
              <p>Слева выберите заметку для просмотра деталей</p>
              <AddNoteButton onClick={handleAddNewNote} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
