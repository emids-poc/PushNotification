using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FcmSharp.Requests;
using FcmSharp.Settings;
using FcmSharp;
using System.Threading;

namespace PushNotificationAPI.Services
{
    public class PushNotificationService
    {

        public void SendPushNotification(string token, string notificationTitle, string notificationBody)
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
                        Token = token,
                        Notification = new Notification
                        {
                            Title = notificationTitle,
                            Body = notificationBody
                        }
                    }
                };

                // Finally send the Message and wait for the Result:
                CancellationTokenSource cts = new CancellationTokenSource();


                // Send the Message and wait synchronously:
                var result = client.SendAsync(message, cts.Token).GetAwaiter().GetResult();

                // Print the Result to the Console:
                System.Console.WriteLine("Message ID = {0}", result.Name);
            }
        }
    }
}
