import { useEffect, useState } from "react";

export default function NoteList({
  refreshTrigger,
  showArchived,
  onEdit,
  onNotesChanged,
}) {
  const [notes, setNotes] = useState([]);

  const BASE_URL = "http://localhost:5211/api/notes";

  const fetchNotes = async () => {
    const url = showArchived ? `${BASE_URL}/archived` : BASE_URL;
    const res = await fetch(url);
    const data = await res.json();
    setNotes(data);
  };

  const handleArchive = async (id) => {
    await fetch(`${BASE_URL}/${id}/archive`, { method: "PATCH" });
    onNotesChanged();
  };

  const handleDelete = async (id) => {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    onNotesChanged();
  };

  useEffect(() => {
    fetchNotes();
  }, [refreshTrigger, showArchived]);

  if (notes.length === 0) {
    return <p className="text-center text-gray-500">No notes found.</p>;
  }

  return (
    <div className="space-y-4">
      {notes.map((note) => (
        <div key={note.id} className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold">{note.title}</h3>
          <p className="text-gray-700 mb-2">{note.content}</p>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(note)}
              className="bg-blue-600 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() => handleArchive(note.id)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              {note.isArchived ? "Unarchive" : "Archive"}
            </button>

            <button
              onClick={() => handleDelete(note.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
