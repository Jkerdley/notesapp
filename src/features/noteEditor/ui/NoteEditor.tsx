import { TextField } from "@mui/material";
import type { Note } from "../../../entities/note/model/note.types";

type Props = {
  formData: Pick<Note, "title" | "content">;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const NoteEditor = ({ formData, onChange }: Props) => (
  <>
    <TextField
      fullWidth
      name="title"
      value={formData.title}
      onChange={onChange}
      label="Заголовок"
      margin="normal"
    />
    <TextField
      fullWidth
      multiline
      name="content"
      value={formData.content}
      onChange={onChange}
      label="Содержание (Markdown)"
      margin="normal"
      rows={12}
    />
  </>
);
