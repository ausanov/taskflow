using Microsoft.EntityFrameworkCore;
using TaskFlow.Domain.Entities;
using TaskFlow.Infrastructure.Data;

namespace TaskFlow.Infrastructure.Repositories;

public class TaskRepository(AppDbContext db) : ITaskRepository
{
    public async Task<IEnumerable<TaskItem>> GetByUserIdAsync(Guid userId)
    {
        return await db.Tasks
            .Where(t => t.UserId == userId)
            .OrderBy(t => t.Order)
            .ToListAsync();
    }

    public Task<TaskItem?> GetByIdAsync(Guid id) =>
        db.Tasks.FirstOrDefaultAsync(t => t.Id == id);

    public async Task AddAsync(TaskItem task)
    {
        db.Tasks.Add(task);
        await db.SaveChangesAsync();
    }

    public async Task UpdateAsync(TaskItem task)
    {
        db.Tasks.Update(task);
        await db.SaveChangesAsync();
    }

    public async Task DeleteAsync(TaskItem task)
    {
        db.Tasks.Remove(task);
        await db.SaveChangesAsync();
    }
}
