import { useLiveQuery } from "dexie-react-hooks";
import { dbService } from "../lib/api/notes-db";

export const useNotes = (searchQuery = "") => {
    const allNotes = useLiveQuery(() => dbService.getAllNotes(), []);

    const filteredNotes = useLiveQuery(async () => {
        if (!allNotes) return [];
        return searchQuery ? await dbService.searchNotes(searchQuery) : allNotes;
    }, [searchQuery, allNotes]);

    return {
        notes: filteredNotes || [],
        isLoading: !filteredNotes,
    };
};
