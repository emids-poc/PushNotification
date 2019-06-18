using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PushNotificationAPI.Models
{
    public class NotificationMessage
    {
        public Dictionary<string, string> Data;
        public string Token { get; set; }
        public string Topic { get; set; }
        public string Condition { get; set; }
        public string NotificationBody { get; set; }
        public string NotificationTitle { get; set; }
    }
}
