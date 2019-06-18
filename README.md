# PushNotificationPOC

1. PushNotificationAPI
	a. Created "/api/TokenStore" to store userId and firebase token to register the token.
	b. created "/api/SendNotification" to publish notification message to the PushNotificationService using RabbitMq Queue
	
2. PushNotificationService
	a. Created micro service to listen the notification messages and send the notification to the particular device or team.
	
3. PushNotificatioPOC
	a. React-native code full setup of android and ios configuration to send notification through firebase.
