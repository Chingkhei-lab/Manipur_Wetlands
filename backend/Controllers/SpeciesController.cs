using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpeciesController : ControllerBase
    {
        private readonly ManipurWetlandsContext _context;

        public SpeciesController(ManipurWetlandsContext context)
        {
            _context = context;
        }

        // GET: api/species/wetland/{common_id}
        [HttpGet("wetland/{commonId}")]
        public async Task<ActionResult<object>> GetSpeciesByWetland(string commonId)
        {
            var wetland = await _context.Wetlands
                .Include(w => w.Animals)
                .Include(w => w.Birds)
                .Include(w => w.Fis)
                .Include(w => w.Flors)
                .Include(w => w.Insects)
                .FirstOrDefaultAsync(w => w.CommonId == commonId);

            if (wetland == null)
            {
                return NotFound($"Wetland with CommonId {commonId} not found.");
            }

            // Aggregate all species into a structured response
            var result = new
            {
                WetlandId = wetland.Id,
                WetlandName = wetland.Name,
                WetlandDescription = wetland.Description,
                WetlandType = wetland.Type,
                WetlandDistrict = wetland.District,
                WetlandImageUrl = wetland.ImageUrl,
                WetlandAreaSqKm = wetland.AreaSqKm,
                Species = new
                {
                    Animals = wetland.Animals,
                    Birds = wetland.Birds,
                    Fish = wetland.Fis,
                    Flora = wetland.Flors,
                    Insects = wetland.Insects
                }
            };

            return Ok(result);
        }

        // GET: api/species/{common_id}
        [HttpGet("{commonId}")]
        public async Task<ActionResult<object>> GetSingleSpecies(string commonId)
        {
            var animal = await _context.Animals.Include(a => a.Wetlands).FirstOrDefaultAsync(a => a.CommonId == commonId);
            if (animal != null) return Ok(new { Type = "Animal", Data = animal, Habitats = animal.Wetlands.Select(w => new { id = w.CommonId, name = w.Name }) });

            var bird = await _context.Birds.Include(b => b.Wetlands).FirstOrDefaultAsync(b => b.CommonId == commonId);
            if (bird != null) return Ok(new { Type = "Bird", Data = bird, Habitats = bird.Wetlands.Select(w => new { id = w.CommonId, name = w.Name }) });

            var fish = await _context.Fish.Include(f => f.Wetlands).FirstOrDefaultAsync(f => f.CommonId == commonId);
            if (fish != null) return Ok(new { Type = "Fish", Data = fish, Habitats = fish.Wetlands.Select(w => new { id = w.CommonId, name = w.Name }) });

            var flora = await _context.Floras.Include(f => f.Wetlands).FirstOrDefaultAsync(f => f.CommonId == commonId);
            if (flora != null) return Ok(new { Type = "Flora", Data = flora, Habitats = flora.Wetlands.Select(w => new { id = w.CommonId, name = w.Name }) });

            var insect = await _context.Insects.Include(i => i.Wetlands).FirstOrDefaultAsync(i => i.CommonId == commonId);
            if (insect != null) return Ok(new { Type = "Insect", Data = insect, Habitats = insect.Wetlands.Select(w => new { id = w.CommonId, name = w.Name }) });

            return NotFound($"Species with CommonId {commonId} not found.");
        }

        // Helper endpoints for full lists (optional but good for debugging)
        [HttpGet("animals")]
        public async Task<ActionResult<IEnumerable<object>>> GetAnimals() => await _context.Animals.ToListAsync();

        [HttpGet("birds")]
        public async Task<ActionResult<IEnumerable<object>>> GetBirds() => await _context.Birds.ToListAsync();

        [HttpGet("fish")]
        public async Task<ActionResult<IEnumerable<object>>> GetFish() => await _context.Fish.ToListAsync();
        
        [HttpGet("flora")]
        public async Task<ActionResult<IEnumerable<object>>> GetFlora() => await _context.Floras.ToListAsync();
        
        [HttpGet("insects")]
        public async Task<ActionResult<IEnumerable<object>>> GetInsects() => await _context.Insects.ToListAsync();
    }
}
