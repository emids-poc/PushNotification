using FcmSharp;
using FcmSharp.Requests;
using FcmSharp.Settings;
using Newtonsoft.Json;
using PushNotificationService.Models;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;
using System.Threading;
using System.IO;
using System.Reflection;

namespace PushNotificationService
{
    class PushNotificationService
    {
        public static void Main()
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
                    var consumer = new EventingBasicConsumer(channel);
                    consumer.Received += (model, ea) =>
                    {
                        var body = ea.Body;
                        var message = Encoding.UTF8.GetString(body);
                        var messageObject = JsonConvert.DeserializeObject<NotificationMessage>(message);
                        FcmMessage fcmMessage = new FcmMessage()
                        {
                            ValidateOnly = false,
                            Message = new Message()
                            {
                                Data = messageObject.Data,
                                Token = messageObject.Token,
                                Topic = messageObject.Topic,
                                Condition = messageObject.Condition,
                                Notification = new Notification()
                                {
                                    Body = messageObject.NotificationBody,
                                    Title = messageObject.NotificationTitle
                                }
                            }
                        };
                        SendPushNotification(fcmMessage);
                        Console.WriteLine(" [x] Received {0}", message);
                    };
                    channel.BasicConsume(queue: "pushnotify",
                                         autoAck: true,
                                         consumer: consumer);

                    Console.WriteLine(" Press [enter] to exit.");
                    Console.ReadLine();
                }
            }
        }

        public static void SendPushNotification(FcmMessage message)
        {
            //var settings = FileBasedFcmClientSettings.CreateFromFile("pushnotificationpoc-6a4f2", @"E:\New folder\Navvis\codebase\CoreoHome\Push Notification\serviceAccountKey.json");
            string startupPath = Directory.GetParent(Directory.GetCurrentDirectory()).Parent.Parent.FullName;
            var settings = FileBasedFcmClientSettings.CreateFromFile("pushnotificationpoc-6a4f2", startupPath + "\\serviceAccountKey.json");

            // Construct the Client:
            using (var client = new FcmClient(settings))
            {

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
