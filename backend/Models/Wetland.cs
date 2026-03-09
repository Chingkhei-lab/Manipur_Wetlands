using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Wetland
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Type { get; set; }

    public string? District { get; set; }

    public decimal? Latitude { get; set; }

    public decimal? Longitude { get; set; }

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    

    

    public virtual ICollection<Animal> Animals { get; set; } = new List<Animal>();

    public virtual ICollection<Bird> Birds { get; set; } = new List<Bird>();

    public virtual ICollection<Fish> Fish { get; set; } = new List<Fish>();

    public virtual ICollection<Flora> Floras { get; set; } = new List<Flora>();

        public decimal? AreaHa { get; set; }

    public string? Location { get; set; }

    public string? Coordinates { get; set; }

    public string? CommonId { get; set; }

public virtual ICollection<Insect> Insects { get; set; } = new List<Insect>();
}
