using TaskFlow.Application.DTOs.Tasks;
using TaskFlow.Application.Interfaces;
using TaskFlow.Domain.Entities;
using TaskFlow.Infrastructure.Repositories;

namespace TaskFlow.Application.Services;

public class TaskService(ITaskRepository repo) : ITaskService
{
    public async Task<IEnumerable<TaskDto>> GetUserTasksAsync(Guid userId)
    {
        var tasks = await repo.GetByUserIdAsync(userId);
        return tasks.Select(ToDto);
    }

    public async Task<TaskDto> CreateTaskAsync(Guid userId, CreateTaskDto dto)
    {
        var task = new TaskItem
        {
            Title = dto.Title,
            Description = dto.Description,
            UserId = userId
        };
        await repo.AddAsync(task);
        return ToDto(task);
    }

    public async Task<TaskDto> UpdateTaskAsync(Guid userId, Guid taskId, UpdateTaskDto dto)
    {
        var task = await repo.GetByIdAsync(taskId)
            ?? throw new KeyNotFoundException("Task not found");

        if (task.UserId != userId)
            throw new UnauthorizedAccessException("Not your task");

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.Status = Enum.Parse<TaskFlow.Domain.Entities.TaskStatus>(dto.Status);
        task.Order = dto.Order;

        await repo.UpdateAsync(task);
        return ToDto(task);
    }

    public async Task DeleteTaskAsync(Guid userId, Guid taskId)
    {
        var task = await repo.GetByIdAsync(taskId)
            ?? throw new KeyNotFoundException("Task not found");

        if (task.UserId != userId)
            throw new UnauthorizedAccessException("Not your task");

        await repo.DeleteAsync(task);
    }

    private static TaskDto ToDto(TaskItem t) =>
        new(t.Id, t.Title, t.Description, t.Status.ToString(), t.Order, t.CreatedAt);
}
