using System;
using System.Data.Common;
using System.Data.SqlClient;

namespace AD419.Mvc.Helpers
{
    public class DbManager : IDisposable
    {
        public readonly DbConnection Connection;

        public DbManager(string connectionString)
        {
            Connection = new SqlConnection(connectionString);
            Connection.Open();
        }

        public void Dispose()
        {
            Connection.Close();
        }
    }
}