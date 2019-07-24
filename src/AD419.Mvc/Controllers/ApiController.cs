using System;
using System.Data;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AD419.Mvc.Models;
using AD419.Mvc.Helpers;
using Microsoft.Extensions.Configuration;
using Dapper;

namespace AD419.Mvc.Controllers
{
    public class ApiController : Controller
    {
        private readonly IConfiguration configuration;

        public ApiController(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        [HttpGet]
        public async Task<IActionResult> GetDepartments()
        {
            var conn = this.configuration.GetConnectionString("DefaultConnection");

            using (var db = new DbManager(conn))
            {
                var departments = await db.Connection.QueryAsync("usp_getReportingOrg", commandType: CommandType.StoredProcedure);
                return Json(departments.ToList());
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetTotalExpensesByDept(string OrgR)
        {
            var conn = this.configuration.GetConnectionString("DefaultConnection");

            using (var db = new DbManager(conn))
            {
                var expenses = await db.Connection
                    .QueryAsync("usp_getTotalExpensesByDept", new { OrgR }, commandType: CommandType.StoredProcedure);
                return Json(expenses.ToList());
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetExpensesByRecordGrouping(string Grouping, string OrgR, int Associated, int Unassociated)
        {
            var conn = this.configuration.GetConnectionString("DefaultConnection");

            using (var db = new DbManager(conn))
            {
                var expenses = await db.Connection
                    .QueryAsync("usp_getExpenseRecordGrouping", new { Grouping, OrgR, Associated, Unassociated }, commandType: CommandType.StoredProcedure);
                return Json(expenses.ToList());
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetProjectsByDept(string OrgR)
        {
            var conn = this.configuration.GetConnectionString("DefaultConnection");

            using (var db = new DbManager(conn))
            {
                var expenses = await db.Connection
                    .QueryAsync("usp_getProjectsByDept", new { OrgR }, commandType: CommandType.StoredProcedure);
                return Json(expenses.ToList());
            }
        }
    }
}
