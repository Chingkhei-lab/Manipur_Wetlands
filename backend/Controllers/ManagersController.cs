using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ManagersController : ControllerBase
    {
        private readonly ManipurWetlandsContext _context;
        private readonly IConfiguration _configuration;

        // In-memory store for registration codes: Code -> (ExpiresAt, Used)
        private static readonly ConcurrentDictionary<string, (DateTime ExpiresAt, bool Used)> _registrationCodes = new();

        public ManagersController(ManipurWetlandsContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        private static string HashPassword(string password)
        {
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToHexString(bytes).ToLower();
        }

        // POST: api/managers/login
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<object>> Login([FromBody] LoginRequest request)
        {
            var adminEmail = _configuration["AdminAuth:Email"];
            var adminPassword = _configuration["AdminAuth:Password"];

            if (!string.IsNullOrWhiteSpace(adminEmail)
                && !string.IsNullOrWhiteSpace(adminPassword)
                && string.Equals(request.Email, adminEmail, StringComparison.OrdinalIgnoreCase)
                && request.Password == adminPassword)
            {
                var token = GenerateJwtToken(0, "Admin User", request.Email, "admin");

                return Ok(new
                {
                    token,
                    user = new
                    {
                        id = 0,
                        name = "Admin User",
                        email = request.Email,
                        role = "admin"
                    }
                });
            }

            var manager = await _context.Managers
                .FirstOrDefaultAsync(m => m.Email == request.Email);

            if (manager == null)
                return Unauthorized(new { message = "Invalid email or password." });

            var hash = HashPassword(request.Password);
            if (manager.PasswordHash != hash)
                return Unauthorized(new { message = "Invalid email or password." });

            if (!manager.IsActive)
                return Unauthorized(new { message = "Your account has been deactivated. Contact the admin." });

            var jwt = GenerateJwtToken(manager.Id, manager.FullName, manager.Email, "manager");

            return Ok(new
            {
                token = jwt,
                user = new
                {
                    id = manager.Id,
                    name = manager.FullName,
                    email = manager.Email,
                    role = "manager"
                }
            });
        }

        // POST: api/managers/register
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<object>> Register([FromBody] RegisterRequest request)
        {
            // Validate registration code
            CleanExpiredCodes();

            if (!_registrationCodes.TryGetValue(request.Code, out var codeInfo))
                return BadRequest(new { message = "Invalid registration code." });

            if (codeInfo.Used)
                return BadRequest(new { message = "This registration code has already been used." });

            if (DateTime.UtcNow > codeInfo.ExpiresAt)
            {
                _registrationCodes.TryRemove(request.Code, out _);
                return BadRequest(new { message = "This registration code has expired." });
            }

            // Check if email already exists
            var existingManager = await _context.Managers.FirstOrDefaultAsync(m => m.Email == request.Email);
            if (existingManager != null)
                return BadRequest(new { message = "An account with this email already exists." });

            // Mark code as used
            _registrationCodes[request.Code] = (codeInfo.ExpiresAt, true);

            // Create manager
            var manager = new Manager
            {
                FullName = request.FullName,
                Email = request.Email,
                PasswordHash = HashPassword(request.Password),
                IsActive = true,
                RegistrationCode = request.Code,
                CreatedAt = DateTime.UtcNow
            };

            _context.Managers.Add(manager);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration successful!" });
        }

        // GET: api/managers/list
        [Authorize(Roles = "admin")]
        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<object>>> GetManagers()
        {
            var managers = await _context.Managers
                .OrderByDescending(m => m.CreatedAt)
                .Select(m => new
                {
                    id = m.Id,
                    fullName = m.FullName,
                    email = m.Email,
                    isActive = m.IsActive,
                    registrationCode = m.RegistrationCode,
                    createdAt = m.CreatedAt
                })
                .ToListAsync();

            return Ok(managers);
        }

        // POST: api/managers/generate-code
        [Authorize(Roles = "admin")]
        [HttpPost("generate-code")]
        public ActionResult<object> GenerateCode()
        {
            CleanExpiredCodes();

            // Generate a random 6-character alphanumeric code prefixed with "MGR-"
            var random = new Random();
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var code = "MGR-" + new string(Enumerable.Range(0, 6).Select(_ => chars[random.Next(chars.Length)]).ToArray());

            var expiresAt = DateTime.UtcNow.AddMinutes(5);
            _registrationCodes[code] = (expiresAt, false);

            return Ok(new
            {
                code = code,
                expiresInSeconds = 300
            });
        }

        // PUT: api/managers/{id}/toggle-status
        [Authorize(Roles = "admin")]
        [HttpPut("{id}/toggle-status")]
        public async Task<ActionResult> ToggleStatus(int id)
        {
            var manager = await _context.Managers.FindAsync(id);
            if (manager == null) return NotFound();

            manager.IsActive = !manager.IsActive;
            await _context.SaveChangesAsync();

            return Ok(new { message = $"Manager {(manager.IsActive ? "activated" : "deactivated")} successfully." });
        }

        // DELETE: api/managers/{id}
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteManager(int id)
        {
            var manager = await _context.Managers.FindAsync(id);
            if (manager == null) return NotFound();

            _context.Managers.Remove(manager);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Manager removed successfully." });
        }

        private static void CleanExpiredCodes()
        {
            var expiredKeys = _registrationCodes.Where(kv => DateTime.UtcNow > kv.Value.ExpiresAt && !kv.Value.Used)
                .Select(kv => kv.Key).ToList();
            foreach (var key in expiredKeys)
                _registrationCodes.TryRemove(key, out _);
        }

        private string GenerateJwtToken(int userId, string name, string email, string role)
        {
            var jwtKey = _configuration["Jwt:Key"]
                ?? throw new InvalidOperationException("Jwt:Key is not configured.");
            var jwtIssuer = _configuration["Jwt:Issuer"] ?? "manipur-wetlands";
            var jwtAudience = _configuration["Jwt:Audience"] ?? "manipur-wetlands-client";
            var expiryMinutes = int.TryParse(_configuration["Jwt:ExpiryMinutes"], out var minutes) ? minutes : 120;

            var claims = new List<Claim>
            {
                new(JwtRegisteredClaimNames.Sub, userId.ToString()),
                new(JwtRegisteredClaimNames.Email, email),
                new(ClaimTypes.Name, name),
                new(ClaimTypes.Role, role),
                new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(expiryMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Request DTOs
        public class LoginRequest
        {
            public string Email { get; set; } = "";
            public string Password { get; set; } = "";
        }

        public class RegisterRequest
        {
            public string FullName { get; set; } = "";
            public string Email { get; set; } = "";
            public string Password { get; set; } = "";
            public string Code { get; set; } = "";
        }
    }
}
