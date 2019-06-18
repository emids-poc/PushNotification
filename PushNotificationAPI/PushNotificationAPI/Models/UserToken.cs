using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PushNotificationAPI.Models
{
    public class UserToken
    {
        public string token { get; set; }
        public int userId { get; set; }
    }
}
