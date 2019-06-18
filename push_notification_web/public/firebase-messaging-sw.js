importScripts("https://www.gstatic.com/firebasejs/4.12.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.12.0/firebase-messaging.js");
var config = {
    apiKey: "AIzaSyDRVoLBeiolvlfITIu9Wk7cN5jT9hQqaEs",
    authDomain: "pushnotificationpoc-6a4f2.firebaseapp.com",
    databaseURL: "https://pushnotificationpoc-6a4f2.firebaseio.com",
    projectId: "pushnotificationpoc-6a4f2",
    storageBucket: "pushnotificationpoc-6a4f2.appspot.com",
    messagingSenderId: "1041406585120"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(payload => {
   const title = payload.notification.title;
   console.log('payload', payload.notification.icon);
   const options = {
      body: payload.notification.body,
      icon: payload.notification.icon
   }
   return self.registration.showNotification(title, options);
})

// self.addEventListener('install', function(event) {
//     // Handle install event
//     console.log('install');
// });
// self.addEventListener('activate', function(event) {
//     // Handle activate event
//     console.log('activate');
// });

// self.addEventListener('notificationclick', function(event) {
//     const dismissedNotification = event.notification;

//     const promiseChain = notificationCloseAnalytics();
//     event.waitUntil(promiseChain);
// });