using Microsoft.EntityFrameworkCore.Migrations;

namespace BMW_ONBOARDING_SYSTEM.Migrations
{
    public partial class userandemployee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropForeignKey(
            //    name: "FK_User_Employee_EmployeeID",
            //    table: "User");

            //migrationBuilder.DropIndex(
            //    name: "IX_User_EmployeeID",
            //    table: "User");

            //migrationBuilder.AlterColumn<int>(
            //    name: "EmployeeID",
            //    table: "User",
            //    nullable: true,
            //    oldClrType: typeof(int),
            //    oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "EmployeeID",
                table: "User",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_User_EmployeeID",
                table: "User",
                column: "EmployeeID");

            migrationBuilder.AddForeignKey(
                name: "FK_User_Employee_EmployeeID",
                table: "User",
                column: "EmployeeID",
                principalTable: "Employee",
                principalColumn: "EmployeeID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
