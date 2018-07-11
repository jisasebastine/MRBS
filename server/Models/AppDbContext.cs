using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace youbefit.Models
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Blog> Blog { get; set; }
        public virtual DbSet<Post> Post { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("database=d8kkpvq5sos16h; server=ec2-54-227-247-225.compute-1.amazonaws.com; port=5432; user id=hqhltwqwkwobww; password=c3558858108b0b3040a4d03de28036c7351f2c65045b8b830725bc161474d43e; SSL Mode=Require;Trust Server Certificate=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("cube")
                .HasPostgresExtension("earthdistance");

            modelBuilder.Entity<Blog>(entity =>
            {
                entity.ToTable("blog");

                entity.Property(e => e.Blogid).HasColumnName("blogid");

                entity.Property(e => e.Url)
                    .IsRequired()
                    .HasColumnName("url")
                    .HasColumnType("character varying(1000)");
            });

            modelBuilder.Entity<Post>(entity =>
            {
                entity.ToTable("post");

                entity.HasIndex(e => e.Blogid);

                entity.Property(e => e.Postid).HasColumnName("postid");

                entity.Property(e => e.Blogid).HasColumnName("blogid");

                entity.Property(e => e.Content)
                    .HasColumnName("content")
                    .HasColumnType("character varying(1000)");

                entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasColumnType("character varying(1000)");

                entity.HasOne(d => d.Blog)
                    .WithMany(p => p.Post)
                    .HasForeignKey(d => d.Blogid)
                    .HasConstraintName("fk_post_blog_blogid");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasColumnType("character varying(100)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasColumnType("character varying(100)");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("username")
                    .HasColumnType("character varying(80)");
            });
        }
    }
}
