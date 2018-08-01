using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FcmSharp.Requests;
using FcmSharp.Settings;
using FcmSharp;
using System.Threading;
using PushNotificationAPI.Models;

namespace PushNotificationAPI.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
            var settings = FileBasedFcmClientSettings.CreateFromFile("pushnotificationpoc-6a4f2", @"E:\New folder\Navvis\codebase\CoreoHome\Push Notification\serviceAccountKey.json");

            // Construct the Client:
            using (var client = new FcmClient(settings))
            {

                // The Message should be sent to the News Topic:
                var message = new FcmMessage()
                {
                    ValidateOnly = false,
                    Message = new Message
                    {
                        Token = "fnHz7NZ-aqA:APA91bE_6vHTd1NqiOthIHEzkZ_WyMJcDRN6TZdBfnHMjo12kGr1GIGLb3yInkTcRssDmT2kialO6We2yYe-lm5qON3nO9oe1mIa94U76tGR12h_8K4aFb5kggyLrqiGTQ21XBl2AjuDhUxlsaB6B5QlzgwPNaCRjA",
                        Notification = new Notification
                        {
                            Title = "Hiiii",
                            Body = value
                        }
                    }
                };

                // Finally send the Message and wait for the Result:
                CancellationTokenSource cts = new CancellationTokenSource();

               
                // Send the Message and wait synchronously:
                var result = client.SendAsync(message, cts.Token).GetAwaiter().GetResult();

                // Print the Result to the Console:
                Console.WriteLine("Message ID = {0}", result.Name);
            }
        }

        [HttpPost("/register_token")]
        public void RegisterToken([FromBody]User user)
        {
            Console.WriteLine("Token :" + user.token);
        }

        [HttpPost("post_message")]
        public void PostMessage([FromBody]User user)
        {
            var settings = FileBasedFcmClientSettings.CreateFromFile("pushnotificationpoc-6a4f2", @"E:\New folder\Navvis\codebase\CoreoHome\Push Notification\serviceAccountKey.json");

            // Construct the Client:
            using (var client = new FcmClient(settings))
            {

                // The Message should be sent to the News Topic:
                var message = new FcmMessage()
                {
                    ValidateOnly = false,
                    Message = new Message
                    {
                        Token = user.token,
                        Notification = new Notification
                        {
                            Title = user.title,
                            Body = user.body
                        }
                    }
                };

                // Finally send the Message and wait for the Result:
                CancellationTokenSource cts = new CancellationTokenSource();


                // Send the Message and wait synchronously:
                var result = client.SendAsync(message, cts.Token).GetAwaiter().GetResult();

                // Print the Result to the Console:
                Console.WriteLine("Message ID = {0}", result.Name);
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
