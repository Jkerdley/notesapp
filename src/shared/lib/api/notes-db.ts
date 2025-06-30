import Dexie, { type Table } from "dexie";
export interface Note {
    id?: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    tags?: string[];
}

export class NotesDB extends Dexie {
    notes!: Table<Note>;
    constructor() {
        super("NotesDatabase");
        this.version(1).stores({
            notes: "++id, title, content, createdAt, updatedAt, tags",
        });
    }
}

export const db = new NotesDB();

export const dbService = {
    async getAllNotes(): Promise<Note[]> {
        try {
            return await db.notes.orderBy("createdAt").reverse().toArray();
        } catch (err) {
            console.error("Ошибка получения заметок:", err);
            throw new Error("Не удалось загрузить заметки");
        }
    },
    async getNote(id: number): Promise<Note | undefined> {
        return await db.notes.get(id);
    },

    async addNote(note: Omit<Note, "id">): Promise<number> {
        const now = new Date();
        return await db.notes.add({
            ...note,
            createdAt: now,
            updatedAt: now,
        });
    },

    async updateNote(id: number, changes: Partial<Note>): Promise<number> {
        return await db.notes.update(id, {
            ...changes,
            updatedAt: new Date(),
        });
    },
    async deleteNote(id: number): Promise<void> {
        await db.notes.delete(id);
    },
    async searchNotes(query: string): Promise<Note[]> {
        return await db.notes
            .filter(
                (note) =>
                    note.title.toLowerCase().includes(query.toLowerCase()) ||
                    note.content.toLowerCase().includes(query.toLowerCase())
            )
            .toArray();
    },

    async exportData(): Promise<string> {
        const notes = await this.getAllNotes();
        return JSON.stringify(notes);
    },

    async importData(json: string): Promise<void> {
        const notes = JSON.parse(json) as Note[];
        await db.notes.clear();
        await db.notes.bulkAdd(notes);
    },
};
