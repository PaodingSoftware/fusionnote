import { useAppSelector } from "../hooks";
import NoteItem from "./NoteItem";

function NoteList() {
    const notes = useAppSelector((state) => state.notes.items)

    const noteElements = notes.map(note => {
        return <NoteItem
            key={note.id}
            id={note.id}
            caption={note.caption}
            content={note.content}
            content_type={note.content_type}
            created_at={note.created_at}
        ></NoteItem>
    });

    return (
        <div className="fixed-grid has-1-cols">
            <div className="grid">
                {noteElements}
            </div>
        </div>
    );
}

export default NoteList;