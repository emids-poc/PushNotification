using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PushNotificationAPI.Models;
using Dapper;
using System.Data;
using System.Data.SqlClient;

namespace PushNotificationAPI.Controllers
{
    [Route("api/TokenStore")]
    public class TokenStoreController : Controller
    {
        public IDbConnection Connection { get; }

        public TokenStoreController()
        {
            Connection = new SqlConnection("Password=Emids123;Persist Security Info=True;User ID=sa;Initial Catalog=PushNotificationTest;Data Source=52.172.45.185");
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                Connection.Dispose();
            }
        }

        [HttpPost]
        public Task<string> Post([FromBody]UserToken userToken)
        {
            var spName = "spx_store_token";

            var parameters = new DynamicParameters();

            parameters.Add("@Token", userToken.token);
            parameters.Add("@UserId", userToken.userId);
            parameters.Add("@Result", dbType: DbType.String, direction: ParameterDirection.Output, size: 5215585);

            Connection.Query(spName, parameters, commandType: CommandType.StoredProcedure);

            string result = parameters.Get<string>("@Result");

            return Task.FromResult(result);
        }
    }
}