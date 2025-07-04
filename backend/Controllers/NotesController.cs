using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NotesController : ControllerBase
{
    private readonly INoteService _service;
    public NotesController(INoteService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetActive() =>
        Ok(await _service.GetNotesAsync(archived: false));

    [HttpGet("archived")]
    public async Task<IActionResult> GetArchived() =>
        Ok(await _service.GetNotesAsync(archived: true));

    [HttpPost]
    public async Task<IActionResult> Create(Note note)
    {
        await _service.CreateNoteAsync(note);
        return CreatedAtAction(nameof(GetActive), new { id = note.Id }, note);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Note updatedNote)
    {
        if (id != updatedNote.Id) return BadRequest();
        await _service.UpdateNoteAsync(updatedNote);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _service.DeleteNoteAsync(id);
        return NoContent();
    }

    [HttpPatch("{id}/archive")]
    public async Task<IActionResult> ToggleArchive(int id)
    {
        var note = await _service.GetNoteAsync(id);
        if (note is null) return NotFound();
        note.IsArchived = !note.IsArchived;
        await _service.UpdateNoteAsync(note);
        return NoContent();
    }
}
