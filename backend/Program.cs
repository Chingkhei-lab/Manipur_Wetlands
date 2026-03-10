using backend.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure EF Core Context
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ManipurWetlandsContext>(options =>
    options.UseNpgsql(connectionString));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactFrontend",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactFrontend");

// Temporary DB update
using (var scope = app.Services.CreateScope())
{
    var _context = scope.ServiceProvider.GetRequiredService<ManipurWetlandsContext>();
    try
    {
        _context.Database.ExecuteSqlRaw("ALTER TABLE animals ADD COLUMN IF NOT EXISTS image_url_2 VARCHAR(255);");
        _context.Database.ExecuteSqlRaw("ALTER TABLE birds ADD COLUMN IF NOT EXISTS image_url_2 VARCHAR(255);");
        _context.Database.ExecuteSqlRaw("ALTER TABLE birds ADD COLUMN IF NOT EXISTS iucn_status VARCHAR(50);");
        _context.Database.ExecuteSqlRaw("ALTER TABLE fish ADD COLUMN IF NOT EXISTS image_url_2 VARCHAR(255);");
        _context.Database.ExecuteSqlRaw("ALTER TABLE fish ADD COLUMN IF NOT EXISTS iucn_status VARCHAR(50);");
        _context.Database.ExecuteSqlRaw("ALTER TABLE floras ADD COLUMN IF NOT EXISTS image_url_2 VARCHAR(255);");
        _context.Database.ExecuteSqlRaw("ALTER TABLE floras ADD COLUMN IF NOT EXISTS iucn_status VARCHAR(50);");
        _context.Database.ExecuteSqlRaw("ALTER TABLE insects ADD COLUMN IF NOT EXISTS image_url_2 VARCHAR(255);");
        _context.Database.ExecuteSqlRaw("ALTER TABLE insects ADD COLUMN IF NOT EXISTS iucn_status VARCHAR(50);");
        _context.Database.ExecuteSqlRaw("ALTER TABLE wetlands ADD COLUMN IF NOT EXISTS image_url_2 VARCHAR(255);");
        _context.Database.ExecuteSqlRaw("ALTER TABLE wetlands ADD COLUMN IF NOT EXISTS image_url_3 VARCHAR(255);");
    }
    catch (Exception ex)
    {
        Console.WriteLine("DB ALTER error (may already exist): " + ex.Message);
    }
}

app.UseAuthorization();

app.MapControllers();

app.Run();
