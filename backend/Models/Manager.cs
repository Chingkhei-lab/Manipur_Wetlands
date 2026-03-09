using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Manager
{
    public int Id { get; set; }
    public string FullName { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string PasswordHash { get; set; } = null!;
    public bool IsActive { get; set; } = true;
    public string? RegistrationCode { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
