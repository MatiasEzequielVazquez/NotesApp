import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5211/api"
});

export const getNotes = (archived = false) =>
  API.get(archived ? "/notes/archived" : "/notes");

export const createNote = (note) => API.post("/notes", note);

export const updateNote = (note) => API.put(`/notes/${note.id}`, note);

export const deleteNote = (id) => API.delete(`/notes/${id}`);

export const toggleArchive = (id) => API.patch(`/notes/${id}/archive`);
