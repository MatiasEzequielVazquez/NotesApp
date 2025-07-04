using backend.Models;
using backend.Repositories;

namespace backend.Services;

public class NoteService : INoteService
{
    private readonly INoteRepository _repo;
    public NoteService(INoteRepository repo) => _repo = repo;

    public Task<List<Note>> GetNotesAsync(bool archived) => _repo.GetAllAsync(archived);
    public Task<Note?> GetNoteAsync(int id) => _repo.GetByIdAsync(id);
    public Task CreateNoteAsync(Note note) => _repo.AddAsync(note);
    public Task UpdateNoteAsync(Note note) => _repo.UpdateAsync(note);
    public Task DeleteNoteAsync(int id) => _repo.DeleteAsync(id);
}
