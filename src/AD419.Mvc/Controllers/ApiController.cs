using System;
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
                var departments = await db.Connection.QueryAsync<DepartmentsModel>(Queries.Departments);
                return Json(departments);
            }
        }
    }
}
