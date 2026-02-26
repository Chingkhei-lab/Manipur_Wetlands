using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data;

public partial class ManipurWetlandsContext : DbContext
{
    public ManipurWetlandsContext()
    {
    }

    public ManipurWetlandsContext(DbContextOptions<ManipurWetlandsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Animal> Animals { get; set; }

    public virtual DbSet<Bird> Birds { get; set; }

    public virtual DbSet<Fish> Fish { get; set; }

    public virtual DbSet<Flora> Floras { get; set; }

    public virtual DbSet<Insect> Insects { get; set; }

    public virtual DbSet<Wetland> Wetlands { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // Connection string is managed in Program.cs via Dependency Injection.
        // This method can be left empty or removed if not needed for design-time tools.
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Animal>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("animals_pkey");

            entity.ToTable("animals");

            entity.HasIndex(e => e.CommonId, "animals_common_id_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CommonId)
                .HasMaxLength(50)
                .HasColumnName("common_id");
            entity.Property(e => e.CommonName)
                .HasMaxLength(255)
                .HasColumnName("common_name");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasColumnName("image_url");
            entity.Property(e => e.IucnStatus)
                .HasMaxLength(50)
                .HasColumnName("iucn_status");
            entity.Property(e => e.LocalName)
                .HasMaxLength(255)
                .HasColumnName("local_name");
            entity.Property(e => e.ScientificName)
                .HasMaxLength(255)
                .HasColumnName("scientific_name");
        });

        modelBuilder.Entity<Bird>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("birds_pkey");

            entity.ToTable("birds");

            entity.HasIndex(e => e.CommonId, "birds_common_id_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CommonId)
                .HasMaxLength(50)
                .HasColumnName("common_id");
            entity.Property(e => e.CommonName)
                .HasMaxLength(255)
                .HasColumnName("common_name");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasColumnName("image_url");
            entity.Property(e => e.LocalName)
                .HasMaxLength(255)
                .HasColumnName("local_name");
            entity.Property(e => e.ScientificName)
                .HasMaxLength(255)
                .HasColumnName("scientific_name");
            entity.Property(e => e.Seasonality)
                .HasMaxLength(50)
                .HasColumnName("seasonality");
        });

        modelBuilder.Entity<Fish>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("fish_pkey");

            entity.ToTable("fish");

            entity.HasIndex(e => e.CommonId, "fish_common_id_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CommonId)
                .HasMaxLength(50)
                .HasColumnName("common_id");
            entity.Property(e => e.CommonName)
                .HasMaxLength(255)
                .HasColumnName("common_name");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.EconomicValue)
                .HasMaxLength(100)
                .HasColumnName("economic_value");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasColumnName("image_url");
            entity.Property(e => e.LocalName)
                .HasMaxLength(255)
                .HasColumnName("local_name");
            entity.Property(e => e.ScientificName)
                .HasMaxLength(255)
                .HasColumnName("scientific_name");
        });

        modelBuilder.Entity<Flora>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("flora_pkey");

            entity.ToTable("flora");

            entity.HasIndex(e => e.CommonId, "flora_common_id_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CommonId)
                .HasMaxLength(50)
                .HasColumnName("common_id");
            entity.Property(e => e.CommonName)
                .HasMaxLength(255)
                .HasColumnName("common_name");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasColumnName("image_url");
            entity.Property(e => e.LocalName)
                .HasMaxLength(255)
                .HasColumnName("local_name");
            entity.Property(e => e.PlantType)
                .HasMaxLength(100)
                .HasColumnName("plant_type");
            entity.Property(e => e.ScientificName)
                .HasMaxLength(255)
                .HasColumnName("scientific_name");
        });

        modelBuilder.Entity<Insect>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("insects_pkey");

            entity.ToTable("insects");

            entity.HasIndex(e => e.CommonId, "insects_common_id_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CommonId)
                .HasMaxLength(50)
                .HasColumnName("common_id");
            entity.Property(e => e.CommonName)
                .HasMaxLength(255)
                .HasColumnName("common_name");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasColumnName("image_url");
            entity.Property(e => e.LocalName)
                .HasMaxLength(255)
                .HasColumnName("local_name");
            entity.Property(e => e.RoleInEcosystem)
                .HasMaxLength(100)
                .HasColumnName("role_in_ecosystem");
            entity.Property(e => e.ScientificName)
                .HasMaxLength(255)
                .HasColumnName("scientific_name");
        });

        modelBuilder.Entity<Wetland>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("wetlands_pkey");

            entity.ToTable("wetlands");

            entity.HasIndex(e => e.CommonId, "wetlands_common_id_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AreaSqKm)
                .HasPrecision(10, 2)
                .HasColumnName("area_sq_km");
            entity.Property(e => e.CommonId)
                .HasMaxLength(50)
                .HasColumnName("common_id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.District)
                .HasMaxLength(100)
                .HasColumnName("district");
            entity.Property(e => e.ImageUrl)
                .HasMaxLength(255)
                .HasColumnName("image_url");
            entity.Property(e => e.Latitude)
                .HasPrecision(10, 6)
                .HasColumnName("latitude");
            entity.Property(e => e.Longitude)
                .HasPrecision(10, 6)
                .HasColumnName("longitude");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Type)
                .HasMaxLength(100)
                .HasColumnName("type");

            entity.HasMany(d => d.Animals).WithMany(p => p.Wetlands)
                .UsingEntity<Dictionary<string, object>>(
                    "WetlandAnimal",
                    r => r.HasOne<Animal>().WithMany()
                        .HasForeignKey("AnimalId")
                        .HasConstraintName("fk_wa_animal"),
                    l => l.HasOne<Wetland>().WithMany()
                        .HasForeignKey("WetlandId")
                        .HasConstraintName("fk_wa_wetland"),
                    j =>
                    {
                        j.HasKey("WetlandId", "AnimalId").HasName("wetland_animals_pkey");
                        j.ToTable("wetland_animals");
                        j.IndexerProperty<int>("WetlandId").HasColumnName("wetland_id");
                        j.IndexerProperty<int>("AnimalId").HasColumnName("animal_id");
                    });

            entity.HasMany(d => d.Birds).WithMany(p => p.Wetlands)
                .UsingEntity<Dictionary<string, object>>(
                    "WetlandBird",
                    r => r.HasOne<Bird>().WithMany()
                        .HasForeignKey("BirdId")
                        .HasConstraintName("fk_wb_bird"),
                    l => l.HasOne<Wetland>().WithMany()
                        .HasForeignKey("WetlandId")
                        .HasConstraintName("fk_wb_wetland"),
                    j =>
                    {
                        j.HasKey("WetlandId", "BirdId").HasName("wetland_birds_pkey");
                        j.ToTable("wetland_birds");
                        j.IndexerProperty<int>("WetlandId").HasColumnName("wetland_id");
                        j.IndexerProperty<int>("BirdId").HasColumnName("bird_id");
                    });

            entity.HasMany(d => d.Fish).WithMany(p => p.Wetlands)
                .UsingEntity<Dictionary<string, object>>(
                    "WetlandFish",
                    r => r.HasOne<Fish>().WithMany()
                        .HasForeignKey("FishId")
                        .HasConstraintName("fk_wf_fish"),
                    l => l.HasOne<Wetland>().WithMany()
                        .HasForeignKey("WetlandId")
                        .HasConstraintName("fk_wf_wetland"),
                    j =>
                    {
                        j.HasKey("WetlandId", "FishId").HasName("wetland_fish_pkey");
                        j.ToTable("wetland_fish");
                        j.IndexerProperty<int>("WetlandId").HasColumnName("wetland_id");
                        j.IndexerProperty<int>("FishId").HasColumnName("fish_id");
                    });

            entity.HasMany(d => d.Floras).WithMany(p => p.Wetlands)
                .UsingEntity<Dictionary<string, object>>(
                    "WetlandFlora",
                    r => r.HasOne<Flora>().WithMany()
                        .HasForeignKey("FloraId")
                        .HasConstraintName("fk_wfl_flora"),
                    l => l.HasOne<Wetland>().WithMany()
                        .HasForeignKey("WetlandId")
                        .HasConstraintName("fk_wfl_wetland"),
                    j =>
                    {
                        j.HasKey("WetlandId", "FloraId").HasName("wetland_flora_pkey");
                        j.ToTable("wetland_flora");
                        j.IndexerProperty<int>("WetlandId").HasColumnName("wetland_id");
                        j.IndexerProperty<int>("FloraId").HasColumnName("flora_id");
                    });

            entity.HasMany(d => d.Insects).WithMany(p => p.Wetlands)
                .UsingEntity<Dictionary<string, object>>(
                    "WetlandInsect",
                    r => r.HasOne<Insect>().WithMany()
                        .HasForeignKey("InsectId")
                        .HasConstraintName("fk_wi_insect"),
                    l => l.HasOne<Wetland>().WithMany()
                        .HasForeignKey("WetlandId")
                        .HasConstraintName("fk_wi_wetland"),
                    j =>
                    {
                        j.HasKey("WetlandId", "InsectId").HasName("wetland_insects_pkey");
                        j.ToTable("wetland_insects");
                        j.IndexerProperty<int>("WetlandId").HasColumnName("wetland_id");
                        j.IndexerProperty<int>("InsectId").HasColumnName("insect_id");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
