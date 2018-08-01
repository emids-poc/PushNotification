using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PushNotificationAPI.Models
{
    public class User
    {
        public string token { get; set; }
        public string body { get; set; }
        public string title { get; set; }
    }
}
