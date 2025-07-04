using backend.Models;
using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class NoteRepository : INoteRepository
{
    private readonly AppDbContext _context;
    public NoteRepository(AppDbContext context) => _context = context;

    public async Task<List<Note>> GetAllAsync(bool archived) =>
        await _context.Notes.Where(n => n.IsArchived == archived).ToListAsync();

    public async Task<Note?> GetByIdAsync(int id) =>
        await _context.Notes.FindAsync(id);

    public async Task AddAsync(Note note)
    {
        _context.Notes.Add(note);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Note note)
    {
        _context.Notes.Update(note);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var note = await _context.Notes.FindAsync(id);
        if (note is null) return;
        _context.Notes.Remove(note);
        await _context.SaveChangesAsync();
    }
}
