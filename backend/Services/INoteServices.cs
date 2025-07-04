using backend.Models;

namespace backend.Services;

public interface INoteService
{
    Task<List<Note>> GetNotesAsync(bool archived);
    Task<Note?> GetNoteAsync(int id);
    Task CreateNoteAsync(Note note);
    Task UpdateNoteAsync(Note note);
    Task DeleteNoteAsync(int id);
}
