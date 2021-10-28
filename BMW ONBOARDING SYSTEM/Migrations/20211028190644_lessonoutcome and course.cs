using Microsoft.EntityFrameworkCore.Migrations;

namespace BMW_ONBOARDING_SYSTEM.Migrations
{
    public partial class lessonoutcomeandcourse : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_QuestionBank_LessonID",
                table: "QuestionBank",
                column: "LessonID");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionBank_LessonOutcomeID",
                table: "QuestionBank",
                column: "LessonOutcomeID");

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionBank_Lesson_LessonID",
                table: "QuestionBank",
                column: "LessonID",
                principalTable: "Lesson",
                principalColumn: "LessonID",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionBank_LessonOutcome_LessonOutcomeID",
                table: "QuestionBank",
                column: "LessonOutcomeID",
                principalTable: "LessonOutcome",
                principalColumn: "LessonOutcomeID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionBank_Lesson_LessonID",
                table: "QuestionBank");

            migrationBuilder.DropForeignKey(
                name: "FK_QuestionBank_LessonOutcome_LessonOutcomeID",
                table: "QuestionBank");

            migrationBuilder.DropIndex(
                name: "IX_QuestionBank_LessonID",
                table: "QuestionBank");

            migrationBuilder.DropIndex(
                name: "IX_QuestionBank_LessonOutcomeID",
                table: "QuestionBank");
        }
    }
}
