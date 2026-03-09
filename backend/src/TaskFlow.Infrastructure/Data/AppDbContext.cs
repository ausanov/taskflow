using Microsoft.EntityFrameworkCore;
using TaskFlow.Domain.Entities;

namespace TaskFlow.Infrastructure.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<TaskItem> Tasks => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(e =>
        {
            e.HasKey(u => u.Id);
            e.HasIndex(u => u.Email).IsUnique();
            e.Property(u => u.Email).HasMaxLength(255);
            e.Property(u => u.DisplayName).HasMaxLength(100);
        });

        modelBuilder.Entity<TaskItem>(e =>
        {
            e.HasKey(t => t.Id);
            e.Property(t => t.Title).HasMaxLength(500);
            e.Property(t => t.Description).HasMaxLength(2000);
            e.HasOne(t => t.User)
             .WithMany(u => u.Tasks)
             .HasForeignKey(t => t.UserId)
             .OnDelete(DeleteBehavior.Cascade);
        });
    }
}
