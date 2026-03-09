using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskFlow.Application.DTOs.Tasks;
using TaskFlow.Application.Interfaces;

namespace TaskFlow.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TasksController(ITaskService taskService) : ControllerBase
{
    private Guid UserId => Guid.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<IActionResult> GetAll() =>
        Ok(await taskService.GetUserTasksAsync(UserId));

    [HttpPost]
    public async Task<IActionResult> Create(CreateTaskDto dto)
    {
        var task = await taskService.CreateTaskAsync(UserId, dto);
        return CreatedAtAction(nameof(GetAll), task);
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateTaskDto dto) =>
        Ok(await taskService.UpdateTaskAsync(UserId, id, dto));

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await taskService.DeleteTaskAsync(UserId, id);
        return NoContent();
    }
}
