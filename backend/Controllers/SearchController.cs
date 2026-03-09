using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ManipurWetlandsContext _context;

        public SearchController(ManipurWetlandsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> Search([FromQuery] string? query)
        {
            var lowercaseQuery = string.IsNullOrWhiteSpace(query) ? "" : query.ToLower();
            var results = new List<object>();

            // Search Wetlands
            var wetlands = await _context.Wetlands
                .Where(w => string.IsNullOrEmpty(lowercaseQuery) || w.Name.ToLower().Contains(lowercaseQuery) || (w.District != null && w.District.ToLower().Contains(lowercaseQuery)))
                .Select(w => new
                {
                    id = w.Id,
                    name = w.Name,
                    type = "Wetland",
                    image_url = w.ImageUrl,
                    link_id = w.Id
                })
                .ToListAsync();
            results.AddRange(wetlands);

            // Search Animals
            var animals = await _context.Animals
                .Where(a => string.IsNullOrEmpty(lowercaseQuery) || 
                            (a.CommonName != null && a.CommonName.ToLower().Contains(lowercaseQuery)) || 
                            (a.LocalName != null && a.LocalName.ToLower().Contains(lowercaseQuery)) || 
                            (a.ScientificName != null && a.ScientificName.ToLower().Contains(lowercaseQuery)))
                .Select(a => new
                {
                    id = a.Id,
                    name = a.CommonName ?? a.LocalName ?? a.ScientificName,
                    type = "Animal",
                    image_url = a.ImageUrl,
                    link_id = a.Id
                })
                .ToListAsync();
            results.AddRange(animals);

            // Search Birds
            var birds = await _context.Birds
                .Where(b => string.IsNullOrEmpty(lowercaseQuery) || 
                            (b.CommonName != null && b.CommonName.ToLower().Contains(lowercaseQuery)) || 
                            (b.LocalName != null && b.LocalName.ToLower().Contains(lowercaseQuery)) || 
                            (b.ScientificName != null && b.ScientificName.ToLower().Contains(lowercaseQuery)))
                .Select(b => new
                {
                    id = b.Id,
                    name = b.CommonName ?? b.LocalName ?? b.ScientificName,
                    type = "Bird",
                    image_url = b.ImageUrl,
                    link_id = b.Id
                })
                .ToListAsync();
            results.AddRange(birds);

            // Search Fish
            var fish = await _context.Fish
                .Where(f => string.IsNullOrEmpty(lowercaseQuery) || 
                            (f.CommonName != null && f.CommonName.ToLower().Contains(lowercaseQuery)) || 
                            (f.LocalName != null && f.LocalName.ToLower().Contains(lowercaseQuery)) || 
                            (f.ScientificName != null && f.ScientificName.ToLower().Contains(lowercaseQuery)))
                .Select(f => new
                {
                    id = f.Id,
                    name = f.CommonName ?? f.LocalName ?? f.ScientificName,
                    type = "Fish",
                    image_url = f.ImageUrl,
                    link_id = f.Id
                })
                .ToListAsync();
            results.AddRange(fish);

            // Search Flora
            var flora = await _context.Floras
                .Where(f => string.IsNullOrEmpty(lowercaseQuery) || 
                            (f.CommonName != null && f.CommonName.ToLower().Contains(lowercaseQuery)) || 
                            (f.LocalName != null && f.LocalName.ToLower().Contains(lowercaseQuery)) || 
                            (f.ScientificName != null && f.ScientificName.ToLower().Contains(lowercaseQuery)))
                .Select(f => new
                {
                    id = f.Id,
                    name = f.CommonName ?? f.LocalName ?? f.ScientificName,
                    type = "Flora",
                    image_url = f.ImageUrl,
                    link_id = f.Id
                })
                .ToListAsync();
            results.AddRange(flora);

            // Search Insects
            var insects = await _context.Insects
                .Where(i => string.IsNullOrEmpty(lowercaseQuery) || 
                            (i.CommonName != null && i.CommonName.ToLower().Contains(lowercaseQuery)) || 
                            (i.LocalName != null && i.LocalName.ToLower().Contains(lowercaseQuery)) || 
                            (i.ScientificName != null && i.ScientificName.ToLower().Contains(lowercaseQuery)))
                .Select(i => new
                {
                    id = i.Id,
                    name = i.CommonName ?? i.LocalName ?? i.ScientificName,
                    type = "Insect",
                    image_url = i.ImageUrl,
                    link_id = i.Id
                })
                .ToListAsync();
            results.AddRange(insects);

            return Ok(results);
        }
    }
}
