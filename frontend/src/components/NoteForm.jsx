import { useState, useEffect } from "react";

export default function NoteForm({ noteToEdit, onNoteCreated, onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [noteToEdit]);

  const BASE_URL = "http://localhost:5211/api/notes";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    const noteData = {
      title,
      content,
      isArchived: noteToEdit ? noteToEdit.isArchived : false,
      id: noteToEdit ? noteToEdit.id : undefined,
    };

    try {
      const res = await fetch(
        noteToEdit ? `${BASE_URL}/${noteToEdit.id}` : BASE_URL,
        {
          method: noteToEdit ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(noteData),
        }
      );

      if (!res.ok) throw new Error("Error saving note");

      setTitle("");
      setContent("");
      onNoteCreated();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 p-4 bg-white rounded shadow space-y-3"
    >
      <h2 className="text-lg font-bold">
        {noteToEdit ? "Edit Note" : "New Note"}
      </h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border px-3 py-2 rounded"
        required
      />
      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {noteToEdit ? "Save Changes" : "Create Note"}
        </button>
        {noteToEdit && (
          <button
            type="button"
            onClick={() => {
              setTitle("");
              setContent("");
              onCancel();
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
