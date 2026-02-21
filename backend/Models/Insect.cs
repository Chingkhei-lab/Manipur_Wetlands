using System;
using System.Collections.Generic;

namespace backend.Models;

public partial class Insect
{
    public int Id { get; set; }

    public string? CommonId { get; set; }

    public string? CommonName { get; set; }

    public string? ScientificName { get; set; }

    public string? LocalName { get; set; }

    public string? RoleInEcosystem { get; set; }

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public virtual ICollection<Wetland> Wetlands { get; set; } = new List<Wetland>();
}
