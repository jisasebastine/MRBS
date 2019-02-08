using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

namespace youbefit.Models
{
    public partial class AppDbContext1 : DbContext
    {
        public AppDbContext1(DbContextOptions<AppDbContext1> options, IConfiguration configuration): base(options)
        {
            _configuration = configuration;
        }
        private IConfiguration _configuration;
        public virtual DbSet<Booking> Booking { get; set; }
        public virtual DbSet<Event> Event { get; set; }
        public virtual DbSet<MeetingRoom> MeetingRoom { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("cube")
                .HasPostgresExtension("earthdistance");

            modelBuilder.Entity<Booking>(entity =>
            {
                entity.ToTable("booking");

                entity.HasIndex(e => e.EventId)
                    .HasName("fki_book_event");

                entity.HasIndex(e => e.MeetingRoomId)
                    .HasName("fki_book_room");

                entity.HasIndex(e => e.UserId)
                    .HasName("fki_book_user");

                entity.Property(e => e.BookingId)
                    .HasColumnName("booking_id")
                    .HasDefaultValueSql("nextval('\"Booking_BookingId_seq\"'::regclass)");

                entity.Property(e => e.EndTime).HasColumnName("end_time");

                entity.Property(e => e.EventId)
                    .HasColumnName("event_id")
                    .HasDefaultValueSql("nextval('\"Booking_EventId_seq\"'::regclass)");

                entity.Property(e => e.MeetingRoomId)
                    .HasColumnName("meeting_room_id")
                    .HasDefaultValueSql("nextval('\"Booking_MeetingRoomId_seq\"'::regclass)");

                entity.Property(e => e.StartTime).HasColumnName("start_time");

                entity.Property(e => e.UserId)
                    .HasColumnName("user_id")
                    .HasDefaultValueSql("nextval('\"Booking_UserId_seq\"'::regclass)");

                entity.HasOne(d => d.Event)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.EventId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_book_event");

                entity.HasOne(d => d.MeetingRoom)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.MeetingRoomId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("book_room");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_book_user");
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.ToTable("event");

                entity.HasIndex(e => e.MeetingRoomId)
                    .HasName("fki_event_room");

                entity.Property(e => e.EventId)
                    .HasColumnName("event_id")
                    .HasDefaultValueSql("nextval('\"Event_EventId_seq\"'::regclass)");

                entity.Property(e => e.EndTime).HasColumnName("end_time");

                entity.Property(e => e.MeetingRoomId)
                    .HasColumnName("meeting_room_id")
                    .HasDefaultValueSql("nextval('\"Event_MeetingRoomId_seq\"'::regclass)");

                entity.Property(e => e.Organizer)
                    .HasColumnName("organizer")
                    .HasDefaultValueSql("nextval('\"Event_Organizer_seq\"'::regclass)");

                entity.Property(e => e.Purpose)
                    .HasColumnName("purpose")
                    .HasColumnType("character varying(1000)");

                entity.Property(e => e.StartTime).HasColumnName("start_time");

                entity.HasOne(d => d.MeetingRoom)
                    .WithMany(p => p.Event)
                    .HasForeignKey(d => d.MeetingRoomId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("event_room");
            });

            modelBuilder.Entity<MeetingRoom>(entity =>
            {
                entity.ToTable("meeting_room");

                entity.Property(e => e.MeetingRoomId)
                    .HasColumnName("meeting_room_id")
                    .HasDefaultValueSql("nextval('\"MeetingRoom_MeetingRoomId_seq\"'::regclass)");

                entity.Property(e => e.MeetingRoomName)
                    .HasColumnName("meeting_room_name")
                    .HasColumnType("character varying(100)");

                entity.Property(e => e.NextBooking).HasColumnName("next_booking");

                entity.Property(e => e.Vacant)
                    .IsRequired()
                    .HasColumnName("vacant")
                    .HasDefaultValueSql("true");
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

            modelBuilder.HasSequence<int>("Booking_BookingId_seq");

            modelBuilder.HasSequence<int>("Booking_EventId_seq");

            modelBuilder.HasSequence<int>("Booking_MeetingRoomId_seq");

            modelBuilder.HasSequence<int>("Booking_UserId_seq");

            modelBuilder.HasSequence<int>("Event_EventId_seq");

            modelBuilder.HasSequence<int>("Event_MeetingRoomId_seq");

            modelBuilder.HasSequence<int>("Event_Organizer_seq");

            modelBuilder.HasSequence<int>("MeetingRoom_MeetingRoomId_seq");
        }
    }
}
