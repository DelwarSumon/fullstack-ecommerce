using backend.Models;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace backend.Database
{
    public class DatabaseContext : DbContext
    {
        private readonly IConfiguration _config;
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<FileModel> Images { get; set; } = null!;
        public DbSet<Order> Orders { get; set; } = null!;
        public DbSet<OrderItem> OrderItems { get; set; } = null!;

        public DatabaseContext(DbContextOptions<DatabaseContext> options, IConfiguration config)
            : base(options)
        {
            _config = config;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
        {
            var builder = new NpgsqlDataSourceBuilder(
                _config.GetConnectionString("DefaultConnection")
            );
            builder.MapEnum<Role>("role");

            options
                .UseNpgsql(builder.Build())
                .AddInterceptors(new AppDbContextSaveChangesInterceptor())
                .UseSnakeCaseNamingConvention();
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Category
            builder.Entity<Category>()
                .Property(c => c.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.Entity<Category>()
                .HasMany(c => c.Products)
                .WithOne(p => p.Category)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            // Product
            builder.Entity<Product>()
                .Property(p => p.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.Entity<Product>()
                .HasOne(p => p.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            //User
            builder.HasPostgresEnum<Role>(); // will create a enum type called "role" inside database
            builder.Entity<User>(entity =>
            {
                entity.Property(e => e.Role).HasColumnType("role");
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });

            builder.Entity<FileModel>(entity =>
            {
                entity
                    .HasOne(e => e.User)
                    .WithOne(u => u.Image)
                    .HasForeignKey<FileModel>(entity => entity.UserId)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.Cascade);
                entity
                    .HasOne(e => e.Category)
                    .WithOne(c => c.Image)
                    .HasForeignKey<FileModel>(e => e.CategoryId)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.Cascade);
                entity
                    .HasOne(e => e.Product)
                    .WithMany(p => p.Images)
                    .HasForeignKey(e => e.ProductId)
                    .IsRequired(false)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            //Order
            builder.Entity<Order>()
                .Property(p => p.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.Entity<Order>()
                .HasMany(o => o.OrderItems)
                .WithOne(oi => oi.Order)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<OrderItem>()
                .Property(p => p.UpdatedAt)
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            builder.Entity<OrderItem>()
                .HasOne(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
