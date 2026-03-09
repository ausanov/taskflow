namespace TaskFlow.Domain.Entities;

public enum TaskStatus { Todo, InProgress, Done }

public class TaskItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public TaskStatus Status { get; set; } = TaskStatus.Todo;
    public int Order { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
}
