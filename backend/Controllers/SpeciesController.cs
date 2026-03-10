using System.Collections.Generic;
using System.Linq;
using backend.Data;
using backend.Models;
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

        // GET: api/species/wetland/{id}
        [HttpGet("wetland/{id}")]
        public async Task<ActionResult<object>> GetSpeciesByWetland(int id)
        {
            var wetland = await _context.Wetlands
                .Include(w => w.Animals)
                .Include(w => w.Birds)
                .Include(w => w.Fish)
                .Include(w => w.Floras)
                .Include(w => w.Insects)
                .FirstOrDefaultAsync(w => w.Id == id);

            if (wetland == null)
            {
                return NotFound($"Wetland with Id {id} not found.");
            }

            // Aggregate all species into a structured response matching frontend expectation
            var result = new
            {
                id = wetland.Id,
                wetlandName = wetland.Name,
                wetlandDescription = wetland.Description,
                wetlandType = wetland.Type,
                wetlandDistrict = wetland.District,
                wetlandImageUrl = wetland.ImageUrl,
                wetlandImageUrl2 = wetland.ImageUrl2,
                wetlandImageUrl3 = wetland.ImageUrl3,
                wetlandAreaSqKm = wetland.AreaHa, // Using AreaHa as SqKm for display compatibility
                species = new
                {
                    animals = wetland.Animals,
                    birds = wetland.Birds,
                    fish = wetland.Fish,
                    flora = wetland.Floras,
                    insects = wetland.Insects
                }
            };

            return Ok(result);
        }

        // GET: api/species/{type}/{id}
        [HttpGet("{type}/{id}")]
        public async Task<ActionResult<object>> GetSingleSpecies(string type, int id)
        {
            object species = null;
            string typeName = "";

            switch (type.ToLower())
            {
                case "animal":
                    species = await _context.Animals.Include(a => a.Wetlands).FirstOrDefaultAsync(a => a.Id == id);
                    typeName = "Animal";
                    break;
                case "bird":
                    species = await _context.Birds.Include(b => b.Wetlands).FirstOrDefaultAsync(b => b.Id == id);
                    typeName = "Bird";
                    break;
                case "fish":
                    species = await _context.Fish.Include(f => f.Wetlands).FirstOrDefaultAsync(f => f.Id == id);
                    typeName = "Fish";
                    break;
                case "flora":
                    species = await _context.Floras.Include(f => f.Wetlands).FirstOrDefaultAsync(f => f.Id == id);
                    typeName = "Flora";
                    break;
                case "insect":
                    species = await _context.Insects.Include(i => i.Wetlands).FirstOrDefaultAsync(i => i.Id == id);
                    typeName = "Insect";
                    break;
                default:
                    // Fallback to searching all (original logic)
                    return await GetSingleSpeciesByIdOnly(id);
            }

            if (species == null) return NotFound($"{typeName} with Id {id} not found.");

            // Use reflection or dynamic to get Wetlands for habitats
            dynamic dSpecies = species;
            return Ok(new 
            { 
                Type = typeName, 
                Data = species, 
                Habitats = ((IEnumerable<Wetland>)dSpecies.Wetlands)?.Select(w => new { id = w.Id, name = w.Name }) ?? Enumerable.Empty<object>()
            });
        }

        private async Task<ActionResult<object>> GetSingleSpeciesByIdOnly(int id)
        {
            var animal = await _context.Animals.Include(a => a.Wetlands).FirstOrDefaultAsync(a => a.Id == id);
            if (animal != null) return Ok(new { Type = "Animal", Data = animal, Habitats = animal.Wetlands.Select(w => new { id = w.Id, name = w.Name }) });

            var bird = await _context.Birds.Include(b => b.Wetlands).FirstOrDefaultAsync(b => b.Id == id);
            if (bird != null) return Ok(new { Type = "Bird", Data = bird, Habitats = bird.Wetlands.Select(w => new { id = w.Id, name = w.Name }) });

            var fish = await _context.Fish.Include(f => f.Wetlands).FirstOrDefaultAsync(f => f.Id == id);
            if (fish != null) return Ok(new { Type = "Fish", Data = fish, Habitats = fish.Wetlands.Select(w => new { id = w.Id, name = w.Name }) });

            var flora = await _context.Floras.Include(f => f.Wetlands).FirstOrDefaultAsync(f => f.Id == id);
            if (flora != null) return Ok(new { Type = "Flora", Data = flora, Habitats = flora.Wetlands.Select(w => new { id = w.Id, name = w.Name }) });

            var insect = await _context.Insects.Include(i => i.Wetlands).FirstOrDefaultAsync(i => i.Id == id);
            if (insect != null) return Ok(new { Type = "Insect", Data = insect, Habitats = insect.Wetlands.Select(w => new { id = w.Id, name = w.Name }) });

            return NotFound($"Species with Id {id} not found.");
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
