using TaskFlow.Domain.Entities;

namespace TaskFlow.Infrastructure.Repositories;

public interface ITaskRepository
{
    Task<IEnumerable<TaskItem>> GetByUserIdAsync(Guid userId);
    Task<TaskItem?> GetByIdAsync(Guid id);
    Task AddAsync(TaskItem task);
    Task UpdateAsync(TaskItem task);
    Task DeleteAsync(TaskItem task);
}
