send POST: https://fcm.googleapis.com/fcm/send

Body: 
{
	"notification": {
        "title": "Firebase",
        "body": "Firebase is awesome",
        "click_action": "http://localhost:3000/",
        "icon": "http://localhost:3000/icon.png"
    },
	 "to": "e1ILH8OU4YE:APA91bG6gdmqDIHqP63jOkaGJJGBlJdMeDOqN5vRYKG7zhtzTHvE9AAjuwn_ciCS7BE6TIZuKNpChb9oDuyBlsyGGLbnTWEKxNvcLeL3IVrxHab_twP5B1rBaFwUsbzT68Dg4nRLaUc8"
}

Headers: 
Content-Type: application/json
Authorization: key=SERVER-KEY
