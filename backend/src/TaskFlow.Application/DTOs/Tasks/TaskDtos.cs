namespace TaskFlow.Application.DTOs.Tasks;

public record TaskDto(Guid Id, string Title, string Description, string Status, int Order, DateTime CreatedAt);
public record CreateTaskDto(string Title, string Description);
public record UpdateTaskDto(string Title, string Description, string Status, int Order);
