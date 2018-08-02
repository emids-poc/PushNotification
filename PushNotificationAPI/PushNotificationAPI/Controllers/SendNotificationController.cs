using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using PushNotificationAPI.Models;
using RabbitMQ.Client;

namespace PushNotificationAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/SendNotification")]
    public class SendNotificationController : Controller
    {
        [HttpPost]
        public void Post([FromBody]NotificationMessage message)
        {
            var factory = new ConnectionFactory() { HostName = "localhost" };

            using (var connection = factory.CreateConnection())
            {
                using (var channel = connection.CreateModel())
                {
                    channel.QueueDeclare(queue: "pushnotify",
                                 durable: false,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);
                    var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));
                    var properties = channel.CreateBasicProperties();
                    properties.Persistent = true;

                    channel.BasicPublish(exchange: "",
                                 routingKey: "pushnotify",
                                 basicProperties: properties,
                                 body: body);
                }
            }
        }
    }
}