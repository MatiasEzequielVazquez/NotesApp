using backend.Models;

namespace backend.Repositories;

public interface INoteRepository
{
    Task<List<Note>> GetAllAsync(bool archived);
    Task<Note?> GetByIdAsync(int id);
    Task AddAsync(Note note);
    Task UpdateAsync(Note note);
    Task DeleteAsync(int id);
}