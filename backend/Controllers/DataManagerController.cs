using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataManagerController : ControllerBase
    {
        private readonly ManipurWetlandsContext _context;

        public DataManagerController(ManipurWetlandsContext context)
        {
            _context = context;
        }

        // ==================== GET ALL ====================

        [HttpGet("wetlands")]
        public async Task<ActionResult> GetWetlands()
        {
            var data = await _context.Wetlands
                .Select(w => new { w.Id, w.Name, w.CommonId, w.Type, w.District, w.Description, w.ImageUrl, w.ImageUrl2, w.ImageUrl3, w.Latitude, w.Longitude, AreaSqKm = w.AreaHa })
                .ToListAsync();
            return Ok(data);
        }

        [HttpGet("animals")]
        public async Task<ActionResult> GetAnimals()
        {
            var data = await _context.Animals.Include(a => a.Wetlands)
                .Select(a => new { a.Id, a.CommonName, a.CommonId, a.ScientificName, a.LocalName, a.Description, a.ImageUrl, a.ImageUrl2, a.IucnStatus, Wetlands = a.Wetlands.Select(w => new { w.Id, w.Name }) })
                .ToListAsync();
            return Ok(data);
        }

        [HttpGet("birds")]
        public async Task<ActionResult> GetBirds()
        {
            var data = await _context.Birds.Include(b => b.Wetlands)
                .Select(b => new { b.Id, b.CommonName, b.CommonId, b.ScientificName, b.LocalName, b.Description, b.ImageUrl, b.ImageUrl2, b.Seasonality, b.IucnStatus, Wetlands = b.Wetlands.Select(w => new { w.Id, w.Name }) })
                .ToListAsync();
            return Ok(data);
        }

        [HttpGet("fish")]
        public async Task<ActionResult> GetFish()
        {
            var data = await _context.Fish.Include(f => f.Wetlands)
                .Select(f => new { f.Id, f.CommonName, f.CommonId, f.ScientificName, f.LocalName, f.Description, f.ImageUrl, f.ImageUrl2, f.EconomicValue, f.IucnStatus, Wetlands = f.Wetlands.Select(w => new { w.Id, w.Name }) })
                .ToListAsync();
            return Ok(data);
        }

        [HttpGet("flora")]
        public async Task<ActionResult> GetFlora()
        {
            var data = await _context.Floras.Include(f => f.Wetlands)
                .Select(f => new { f.Id, f.CommonName, f.CommonId, f.ScientificName, f.LocalName, f.Description, f.ImageUrl, f.ImageUrl2, f.PlantType, f.IucnStatus, Wetlands = f.Wetlands.Select(w => new { w.Id, w.Name }) })
                .ToListAsync();
            return Ok(data);
        }

        [HttpGet("insects")]
        public async Task<ActionResult> GetInsects()
        {
            var data = await _context.Insects.Include(i => i.Wetlands)
                .Select(i => new { i.Id, i.CommonName, i.CommonId, i.ScientificName, i.LocalName, i.Description, i.ImageUrl, i.ImageUrl2, i.RoleInEcosystem, i.IucnStatus, Wetlands = i.Wetlands.Select(w => new { w.Id, w.Name }) })
                .ToListAsync();
            return Ok(data);
        }

        // ==================== CREATE ====================

        [HttpPost("wetlands")]
        public async Task<ActionResult> CreateWetland([FromBody] JsonElement body)
        {
            var wetland = new Wetland
            {
                Name = body.GetProperty("name").GetString() ?? "",
                CommonId = GetStringOrNull(body, "commonId"),
                Type = GetStringOrNull(body, "type"),
                District = GetStringOrNull(body, "district"),
                Description = GetStringOrNull(body, "description"),
                ImageUrl = GetStringOrNull(body, "imageUrl"),
                ImageUrl2 = GetStringOrNull(body, "imageUrl2"),
                ImageUrl3 = GetStringOrNull(body, "imageUrl3"),
                Latitude = GetDecimalOrNull(body, "latitude"),
                Longitude = GetDecimalOrNull(body, "longitude"),
                AreaHa = GetDecimalOrNull(body, "areaSqKm")
            };
            _context.Wetlands.Add(wetland);
            await _context.SaveChangesAsync();
            return Ok(wetland);
        }

        [HttpPost("animals")]
        public async Task<ActionResult> CreateAnimal([FromBody] SpeciesSaveRequest<JsonElement> request)
        {
            var d = request.Data;
            var animal = new Animal
            {
                CommonName = GetStringOrNull(d, "commonName"),
                CommonId = GetStringOrNull(d, "commonId"),
                ScientificName = GetStringOrNull(d, "scientificName"),
                LocalName = GetStringOrNull(d, "localName"),
                Description = GetStringOrNull(d, "description"),
                ImageUrl = GetStringOrNull(d, "imageUrl"),
                ImageUrl2 = GetStringOrNull(d, "imageUrl2"),
                IucnStatus = GetStringOrNull(d, "iucnStatus")
            };
            _context.Animals.Add(animal);
            await _context.SaveChangesAsync();
            await LinkWetlands("wetland_animals", "animal_id", animal.Id, request.WetlandIds);
            return Ok(animal);
        }

        [HttpPost("birds")]
        public async Task<ActionResult> CreateBird([FromBody] SpeciesSaveRequest<JsonElement> request)
        {
            var d = request.Data;
            var bird = new Bird
            {
                CommonName = GetStringOrNull(d, "commonName"),
                CommonId = GetStringOrNull(d, "commonId"),
                ScientificName = GetStringOrNull(d, "scientificName"),
                LocalName = GetStringOrNull(d, "localName"),
                Description = GetStringOrNull(d, "description"),
                ImageUrl = GetStringOrNull(d, "imageUrl"),
                ImageUrl2 = GetStringOrNull(d, "imageUrl2"),
                IucnStatus = GetStringOrNull(d, "iucnStatus"),
                Seasonality = GetStringOrNull(d, "seasonality")
            };
            _context.Birds.Add(bird);
            await _context.SaveChangesAsync();
            await LinkWetlands("wetland_birds", "bird_id", bird.Id, request.WetlandIds);
            return Ok(bird);
        }

        [HttpPost("fish")]
        public async Task<ActionResult> CreateFish([FromBody] SpeciesSaveRequest<JsonElement> request)
        {
            var d = request.Data;
            var fish = new Fish
            {
                CommonName = GetStringOrNull(d, "commonName"),
                CommonId = GetStringOrNull(d, "commonId"),
                ScientificName = GetStringOrNull(d, "scientificName"),
                LocalName = GetStringOrNull(d, "localName"),
                Description = GetStringOrNull(d, "description"),
                ImageUrl = GetStringOrNull(d, "imageUrl"),
                ImageUrl2 = GetStringOrNull(d, "imageUrl2"),
                IucnStatus = GetStringOrNull(d, "iucnStatus"),
                EconomicValue = GetStringOrNull(d, "economicValue")
            };
            _context.Fish.Add(fish);
            await _context.SaveChangesAsync();
            await LinkWetlands("wetland_fish", "fish_id", fish.Id, request.WetlandIds);
            return Ok(fish);
        }

        [HttpPost("flora")]
        public async Task<ActionResult> CreateFlora([FromBody] SpeciesSaveRequest<JsonElement> request)
        {
            var d = request.Data;
            var flora = new Flora
            {
                CommonName = GetStringOrNull(d, "commonName"),
                CommonId = GetStringOrNull(d, "commonId"),
                ScientificName = GetStringOrNull(d, "scientificName"),
                LocalName = GetStringOrNull(d, "localName"),
                Description = GetStringOrNull(d, "description"),
                ImageUrl = GetStringOrNull(d, "imageUrl"),
                ImageUrl2 = GetStringOrNull(d, "imageUrl2"),
                IucnStatus = GetStringOrNull(d, "iucnStatus"),
                PlantType = GetStringOrNull(d, "plantType")
            };
            _context.Floras.Add(flora);
            await _context.SaveChangesAsync();
            await LinkWetlands("wetland_flora", "flora_id", flora.Id, request.WetlandIds);
            return Ok(flora);
        }

        [HttpPost("insects")]
        public async Task<ActionResult> CreateInsect([FromBody] SpeciesSaveRequest<JsonElement> request)
        {
            var d = request.Data;
            var insect = new Insect
            {
                CommonName = GetStringOrNull(d, "commonName"),
                CommonId = GetStringOrNull(d, "commonId"),
                ScientificName = GetStringOrNull(d, "scientificName"),
                LocalName = GetStringOrNull(d, "localName"),
                Description = GetStringOrNull(d, "description"),
                ImageUrl = GetStringOrNull(d, "imageUrl"),
                ImageUrl2 = GetStringOrNull(d, "imageUrl2"),
                IucnStatus = GetStringOrNull(d, "iucnStatus"),
                RoleInEcosystem = GetStringOrNull(d, "roleInEcosystem")
            };
            _context.Insects.Add(insect);
            await _context.SaveChangesAsync();
            await LinkWetlands("wetland_insects", "insect_id", insect.Id, request.WetlandIds);
            return Ok(insect);
        }

        // ==================== UPDATE ====================

        [HttpPut("wetlands/{id}")]
        public async Task<ActionResult> UpdateWetland(int id, [FromBody] JsonElement body)
        {
            var wetland = await _context.Wetlands.FindAsync(id);
            if (wetland == null) return NotFound();
            wetland.Name = body.GetProperty("name").GetString() ?? wetland.Name;
            wetland.CommonId = GetStringOrNull(body, "commonId");
            wetland.Type = GetStringOrNull(body, "type");
            wetland.District = GetStringOrNull(body, "district");
            wetland.Description = GetStringOrNull(body, "description");
            wetland.ImageUrl = GetStringOrNull(body, "imageUrl");
            wetland.ImageUrl2 = GetStringOrNull(body, "imageUrl2");
            wetland.ImageUrl3 = GetStringOrNull(body, "imageUrl3");
            wetland.Latitude = GetDecimalOrNull(body, "latitude");
            wetland.Longitude = GetDecimalOrNull(body, "longitude");
            wetland.AreaHa = GetDecimalOrNull(body, "areaSqKm");
            await _context.SaveChangesAsync();
            return Ok(wetland);
        }

        [HttpPut("animals/{id}")]
        public async Task<ActionResult> UpdateAnimal(int id, [FromBody] SpeciesSaveRequest<JsonElement> request)
        {
            var animal = await _context.Animals.FindAsync(id);
            if (animal == null) return NotFound();
            var d = request.Data;
            animal.CommonName = GetStringOrNull(d, "commonName");
            animal.CommonId = GetStringOrNull(d, "commonId");
            animal.ScientificName = GetStringOrNull(d, "scientificName");
            animal.LocalName = GetStringOrNull(d, "localName");
            animal.Description = GetStringOrNull(d, "description");
            animal.ImageUrl = GetStringOrNull(d, "imageUrl");
            animal.ImageUrl2 = GetStringOrNull(d, "imageUrl2");
            animal.IucnStatus = GetStringOrNull(d, "iucnStatus");
            await _context.SaveChangesAsync();
            await LinkWetlands("wetland_animals", "animal_id", id, request.WetlandIds);
            return Ok(animal);
        }

        [HttpPut("birds/{id}")]
        public async Task<ActionResult> UpdateBird(int id, [FromBody] SpeciesSaveRequest<JsonElement> request)
        {
            var bird = await _context.Birds.FindAsync(id);
            if (bird == null) return NotFound();
            var d = request.Data;
            bird.CommonName = GetStringOrNull(d, "commonName");
            bird.CommonId = GetStringOrNull(d, "commonId");
            bird.ScientificName = GetStringOrNull(d, "scientificName");
            bird.LocalName = GetStringOrNull(d, "localName");
            bird.Description = GetStringOrNull(d, "description");
            bird.ImageUrl = GetStringOrNull(d, "imageUrl");
            bird.ImageUrl2 = GetStringOrNull(d, "imageUrl2");
            bird.IucnStatus = GetStringOrNull(d, "iucnStatus");
            bird.Seasonality = GetStringOrNull(d, "seasonality");
            await _context.SaveChangesAsync();
            await LinkWetlands("wetland_birds", "bird_id", id, request.WetlandIds);
            return Ok(bird);
        }

        [HttpPut("fish/{id}")]
        public async Task<ActionResult> UpdateFish(int id, [FromBody] SpeciesSaveRequest<JsonElement> request)
        {
            var fish = await _context.Fish.FindAsync(id);
            if (fish == null) return NotFound();
            var d = request.Data;
            fish.CommonName = GetStringOrNull(d, "commonName");
            fish.CommonId = GetStringOrNull(d, "commonId");
            fish.ScientificName = GetStringOrNull(d, "scientificName");
            fish.LocalName = GetStringOrNull(d, "localName");
            fish.Description = GetStringOrNull(d, "description");
            fish.ImageUrl = GetStringOrNull(d, "imageUrl");
            fish.ImageUrl2 = GetStringOrNull(d, "imageUrl2");
            fish.IucnStatus = GetStringOrNull(d, "iucnStatus");
            fish.EconomicValue = GetStringOrNull(d, "economicValue");
            await _context.SaveChangesAsync();
            await LinkWetlands("wetland_fish", "fish_id", id, request.WetlandIds);
            return Ok(fish);
        }

        [HttpPut("flora/{id}")]
        public async Task<ActionResult> UpdateFlora(int id, [FromBody] SpeciesSaveRequest<JsonElement> request)
        {
            var flora = await _context.Floras.FindAsync(id);
            if (flora == null) return NotFound();
            var d = request.Data;
            flora.CommonName = GetStringOrNull(d, "commonName");
            flora.CommonId = GetStringOrNull(d, "commonId");
            flora.ScientificName = GetStringOrNull(d, "scientificName");
            flora.LocalName = GetStringOrNull(d, "localName");
            flora.Description = GetStringOrNull(d, "description");
            flora.ImageUrl = GetStringOrNull(d, "imageUrl");
            flora.ImageUrl2 = GetStringOrNull(d, "imageUrl2");
            flora.IucnStatus = GetStringOrNull(d, "iucnStatus");
            flora.PlantType = GetStringOrNull(d, "plantType");
            await _context.SaveChangesAsync();
            await LinkWetlands("wetland_flora", "flora_id", id, request.WetlandIds);
            return Ok(flora);
        }

        [HttpPut("insects/{id}")]
        public async Task<ActionResult> UpdateInsect(int id, [FromBody] SpeciesSaveRequest<JsonElement> request)
        {
            var insect = await _context.Insects.FindAsync(id);
            if (insect == null) return NotFound();
            var d = request.Data;
            insect.CommonName = GetStringOrNull(d, "commonName");
            insect.CommonId = GetStringOrNull(d, "commonId");
            insect.ScientificName = GetStringOrNull(d, "scientificName");
            insect.LocalName = GetStringOrNull(d, "localName");
            insect.Description = GetStringOrNull(d, "description");
            insect.ImageUrl = GetStringOrNull(d, "imageUrl");
            insect.ImageUrl2 = GetStringOrNull(d, "imageUrl2");
            insect.IucnStatus = GetStringOrNull(d, "iucnStatus");
            insect.RoleInEcosystem = GetStringOrNull(d, "roleInEcosystem");
            await _context.SaveChangesAsync();
            await LinkWetlands("wetland_insects", "insect_id", id, request.WetlandIds);
            return Ok(insect);
        }

        // ==================== DELETE ====================

        [HttpDelete("wetlands/{id}")]
        public async Task<ActionResult> DeleteWetland(int id)
        {
            var item = await _context.Wetlands.FindAsync(id);
            if (item == null) return NotFound();
            _context.Wetlands.Remove(item);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("animals/{id}")]
        public async Task<ActionResult> DeleteAnimal(int id)
        {
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM wetland_animals WHERE animal_id = {0}", id);
            var item = await _context.Animals.FindAsync(id);
            if (item == null) return NotFound();
            _context.Animals.Remove(item);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("birds/{id}")]
        public async Task<ActionResult> DeleteBird(int id)
        {
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM wetland_birds WHERE bird_id = {0}", id);
            var item = await _context.Birds.FindAsync(id);
            if (item == null) return NotFound();
            _context.Birds.Remove(item);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("fish/{id}")]
        public async Task<ActionResult> DeleteFish(int id)
        {
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM wetland_fish WHERE fish_id = {0}", id);
            var item = await _context.Fish.FindAsync(id);
            if (item == null) return NotFound();
            _context.Fish.Remove(item);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("flora/{id}")]
        public async Task<ActionResult> DeleteFlora(int id)
        {
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM wetland_flora WHERE flora_id = {0}", id);
            var item = await _context.Floras.FindAsync(id);
            if (item == null) return NotFound();
            _context.Floras.Remove(item);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpDelete("insects/{id}")]
        public async Task<ActionResult> DeleteInsect(int id)
        {
            await _context.Database.ExecuteSqlRawAsync("DELETE FROM wetland_insects WHERE insect_id = {0}", id);
            var item = await _context.Insects.FindAsync(id);
            if (item == null) return NotFound();
            _context.Insects.Remove(item);
            await _context.SaveChangesAsync();
            return Ok();
        }

        // ==================== HELPERS ====================

        private async Task LinkWetlands(string junctionTable, string speciesColumn, int speciesId, List<int>? wetlandIds)
        {
            if (wetlandIds == null) return;
            // Clear existing links
            await _context.Database.ExecuteSqlRawAsync($"DELETE FROM {junctionTable} WHERE {speciesColumn} = {{0}}", speciesId);
            // Insert new links
            foreach (var wid in wetlandIds)
            {
                await _context.Database.ExecuteSqlRawAsync(
                    $"INSERT INTO {junctionTable} (wetland_id, {speciesColumn}) VALUES ({{0}}, {{1}}) ON CONFLICT DO NOTHING",
                    wid, speciesId);
            }
        }

        private static string? GetStringOrNull(JsonElement el, string prop)
        {
            if (el.TryGetProperty(prop, out var val) && val.ValueKind == JsonValueKind.String)
                return val.GetString();
            return null;
        }

        private static decimal? GetDecimalOrNull(JsonElement el, string prop)
        {
            if (el.TryGetProperty(prop, out var val))
            {
                if (val.ValueKind == JsonValueKind.Number)
                    return val.GetDecimal();
            }
            return null;
        }

        public class SpeciesSaveRequest<T>
        {
            public T Data { get; set; } = default!;
            public List<int>? WetlandIds { get; set; }
        }
    }
}
