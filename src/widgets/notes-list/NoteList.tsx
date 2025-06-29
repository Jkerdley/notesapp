import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./noteList.module.css";
import { useFetchData } from "../../shared/hooks";
import type { Note } from "../../entities/note/model/note.types";
import { DataErrorBoundary } from "../../shared/components";
import { BasicTextFields, Loader } from "../../shared/ui";
import { NoteCard } from "../../entities/note/ui";

export const NoteList = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const observer = useRef<IntersectionObserver | null>(null);

    const [notes, error, isLoading, hasMore, setPage] = useFetchData<Note>(
        "https://rickandmortyapi.com/api/character"
    );

    const filteredNotes = notes.filter((note) => note.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const lastNodeRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) {
                observer.current.observe(node);
            }
        },
        [isLoading, hasMore]
    );

    const handleSearchInput = (value: string) => {
        setSearchQuery(value);
    };

    return (
        <DataErrorBoundary error={error} message="Не удалось загрузить данные о героях">
            <BasicTextFields onInputChange={handleSearchInput} />

            {isLoading ? (
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
            ) : (
                <div className={styles.notesListContent}>
                    {filteredNotes.map((hero, index) => (
                        <NoteCard
                            key={hero.id}
                            hero={hero}
                            onClick={() => navigate(`/notes/${hero.id}`)}
                            ref={notes.length === index + 1 ? lastNodeRef : null}
                        />
                    ))}
                </div>
            )}
        </DataErrorBoundary>
    );
};
