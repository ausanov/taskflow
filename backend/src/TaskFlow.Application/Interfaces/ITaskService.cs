using TaskFlow.Application.DTOs.Tasks;

namespace TaskFlow.Application.Interfaces;

public interface ITaskService
{
    Task<IEnumerable<TaskDto>> GetUserTasksAsync(Guid userId);
    Task<TaskDto> CreateTaskAsync(Guid userId, CreateTaskDto dto);
    Task<TaskDto> UpdateTaskAsync(Guid userId, Guid taskId, UpdateTaskDto dto);
    Task DeleteTaskAsync(Guid userId, Guid taskId);
}
