import { useState } from "react";
import type { Note } from "../../../entities/note/model/note.types";

export const useNoteEditor = (initialData: Pick<Note, "title" | "content">) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return { formData, setFormData, handleChange };
};
