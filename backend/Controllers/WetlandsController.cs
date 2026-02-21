using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WetlandsController : ControllerBase
    {
        private readonly ManipurWetlandsContext _context;

        public WetlandsController(ManipurWetlandsContext context)
        {
            _context = context;
        }

        // GET: api/Wetlands
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Wetland>>> GetWetlands()
        {
            return await _context.Wetlands.ToListAsync();
        }

        // GET: api/Wetlands/WL-001 or 5
        [HttpGet("{id}")]
        public async Task<ActionResult<Wetland>> GetWetland(string id)
        {
            if (int.TryParse(id, out int wetlandId))
            {
                 var wetland = await _context.Wetlands
                    .Include(w => w.Animals)
                    .Include(w => w.Birds)
                    .Include(w => w.Fis)
                    .Include(w => w.Flors)
                    .Include(w => w.Insects)
                    .FirstOrDefaultAsync(w => w.Id == wetlandId);

                if (wetland == null) return NotFound();
                return wetland;
            }
            else
            {
                var wetland = await _context.Wetlands
                    .Include(w => w.Animals)
                    .Include(w => w.Birds)
                    .Include(w => w.Fis)
                    .Include(w => w.Flors)
                    .Include(w => w.Insects)
                    .FirstOrDefaultAsync(w => w.CommonId == id);

                if (wetland == null) return NotFound();
                return wetland;
            }
        }
    }
}
