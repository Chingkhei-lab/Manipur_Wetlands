using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
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
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;database=manipur_wetlands;user=root;password=ChinGkheI@123", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.44-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Animal>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("animals");

            entity.HasIndex(e => e.CommonId, "common_id").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CommonId)
                .HasMaxLength(50)
                .HasColumnName("common_id");
            entity.Property(e => e.CommonName)
                .HasMaxLength(255)
                .HasColumnName("common_name");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
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
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("birds");

            entity.HasIndex(e => e.CommonId, "common_id").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CommonId)
                .HasMaxLength(50)
                .HasColumnName("common_id");
            entity.Property(e => e.CommonName)
                .HasMaxLength(255)
                .HasColumnName("common_name");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
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
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("fish");

            entity.HasIndex(e => e.CommonId, "common_id").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CommonId)
                .HasMaxLength(50)
                .HasColumnName("common_id");
            entity.Property(e => e.CommonName)
                .HasMaxLength(255)
                .HasColumnName("common_name");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
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
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("flora");

            entity.HasIndex(e => e.CommonId, "common_id").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CommonId)
                .HasMaxLength(50)
                .HasColumnName("common_id");
            entity.Property(e => e.CommonName)
                .HasMaxLength(255)
                .HasColumnName("common_name");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
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
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("insects");

            entity.HasIndex(e => e.CommonId, "common_id").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CommonId)
                .HasMaxLength(50)
                .HasColumnName("common_id");
            entity.Property(e => e.CommonName)
                .HasMaxLength(255)
                .HasColumnName("common_name");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
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
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("wetlands");

            entity.HasIndex(e => e.CommonId, "common_id").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AreaSqKm)
                .HasPrecision(10, 2)
                .HasColumnName("area_sq_km");
            entity.Property(e => e.CommonId)
                .HasMaxLength(50)
                .HasColumnName("common_id");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
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
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("wetland_animals_ibfk_2"),
                    l => l.HasOne<Wetland>().WithMany()
                        .HasForeignKey("WetlandId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("wetland_animals_ibfk_1"),
                    j =>
                    {
                        j.HasKey("WetlandId", "AnimalId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("wetland_animals");
                        j.HasIndex(new[] { "AnimalId" }, "animal_id");
                        j.IndexerProperty<int>("WetlandId").HasColumnName("wetland_id");
                        j.IndexerProperty<int>("AnimalId").HasColumnName("animal_id");
                    });

            entity.HasMany(d => d.Birds).WithMany(p => p.Wetlands)
                .UsingEntity<Dictionary<string, object>>(
                    "WetlandBird",
                    r => r.HasOne<Bird>().WithMany()
                        .HasForeignKey("BirdId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("wetland_birds_ibfk_2"),
                    l => l.HasOne<Wetland>().WithMany()
                        .HasForeignKey("WetlandId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("wetland_birds_ibfk_1"),
                    j =>
                    {
                        j.HasKey("WetlandId", "BirdId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("wetland_birds");
                        j.HasIndex(new[] { "BirdId" }, "bird_id");
                        j.IndexerProperty<int>("WetlandId").HasColumnName("wetland_id");
                        j.IndexerProperty<int>("BirdId").HasColumnName("bird_id");
                    });

            entity.HasMany(d => d.Fis).WithMany(p => p.Wetlands)
                .UsingEntity<Dictionary<string, object>>(
                    "WetlandFish",
                    r => r.HasOne<Fish>().WithMany()
                        .HasForeignKey("FisId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("wetland_fish_ibfk_2"),
                    l => l.HasOne<Wetland>().WithMany()
                        .HasForeignKey("WetlandId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("wetland_fish_ibfk_1"),
                    j =>
                    {
                        j.HasKey("WetlandId", "FisId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("wetland_fish");
                        j.HasIndex(new[] { "FisId" }, "fis_id");
                        j.IndexerProperty<int>("WetlandId").HasColumnName("wetland_id");
                        j.IndexerProperty<int>("FisId").HasColumnName("fis_id");
                    });

            entity.HasMany(d => d.Flors).WithMany(p => p.Wetlands)
                .UsingEntity<Dictionary<string, object>>(
                    "WetlandFlora",
                    r => r.HasOne<Flora>().WithMany()
                        .HasForeignKey("FlorId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("wetland_flora_ibfk_2"),
                    l => l.HasOne<Wetland>().WithMany()
                        .HasForeignKey("WetlandId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("wetland_flora_ibfk_1"),
                    j =>
                    {
                        j.HasKey("WetlandId", "FlorId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("wetland_flora");
                        j.HasIndex(new[] { "FlorId" }, "flor_id");
                        j.IndexerProperty<int>("WetlandId").HasColumnName("wetland_id");
                        j.IndexerProperty<int>("FlorId").HasColumnName("flor_id");
                    });

            entity.HasMany(d => d.Insects).WithMany(p => p.Wetlands)
                .UsingEntity<Dictionary<string, object>>(
                    "WetlandInsect",
                    r => r.HasOne<Insect>().WithMany()
                        .HasForeignKey("InsectId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("wetland_insects_ibfk_2"),
                    l => l.HasOne<Wetland>().WithMany()
                        .HasForeignKey("WetlandId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("wetland_insects_ibfk_1"),
                    j =>
                    {
                        j.HasKey("WetlandId", "InsectId")
                            .HasName("PRIMARY")
                            .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
                        j.ToTable("wetland_insects");
                        j.HasIndex(new[] { "InsectId" }, "insect_id");
                        j.IndexerProperty<int>("WetlandId").HasColumnName("wetland_id");
                        j.IndexerProperty<int>("InsectId").HasColumnName("insect_id");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
