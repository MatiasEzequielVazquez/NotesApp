import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import { useState } from "react";

export default function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [showArchived, setShowArchived] = useState(false);
  const [noteToEdit, setNoteToEdit] = useState(null);

  const refreshNotes = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleEdit = (note) => {
    setNoteToEdit(note);
  };

  const handleFormClose = () => {
    setNoteToEdit(null);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6">
      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setShowArchived((prev) => !prev)}
      >
        {showArchived ? "Display Active Notes" : "Display Archived Notes"}
      </button>

      <NoteForm
        noteToEdit={noteToEdit}
        onNoteCreated={() => {
          refreshNotes();
          handleFormClose();
        }}
        onCancel={handleFormClose}
      />

      <NoteList
        refreshTrigger={refreshTrigger}
        showArchived={showArchived}
        onEdit={handleEdit}
        onNotesChanged={refreshNotes}
      />
    </div>
  );
}
