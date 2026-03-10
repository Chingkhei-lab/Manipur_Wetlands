using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Animal
{
    public int Id { get; set; }

    public string? CommonName { get; set; }

    public string? ScientificName { get; set; }

    public string? LocalName { get; set; }

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public string? ImageUrl2 { get; set; }

    public string? IucnStatus { get; set; }

    public string? CommonId { get; set; }

        public string? TaxonomyGroup { get; set; }

public virtual ICollection<Wetland> Wetlands { get; set; } = new List<Wetland>();
}
