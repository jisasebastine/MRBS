using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace youbefit.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "blog",
                columns: table => new
                {
                    blogid = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    url = table.Column<string>(type: "character varying(1000)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_blog", x => x.blogid);
                });

            migrationBuilder.CreateTable(
                name: "post",
                columns: table => new
                {
                    postid = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn),
                    blogid = table.Column<int>(nullable: false),
                    content = table.Column<string>(type: "character varying(1000)", nullable: true),
                    title = table.Column<string>(type: "character varying(1000)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_post", x => x.postid);
                    table.ForeignKey(
                        name: "fk_post_blog_blogid",
                        column: x => x.blogid,
                        principalTable: "blog",
                        principalColumn: "blogid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_post_blogid",
                table: "post",
                column: "blogid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "post");

            migrationBuilder.DropTable(
                name: "blog");
        }
    }
}
