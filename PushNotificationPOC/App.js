/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase, { RemoteMessage } from 'react-native-firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  componentDidMount() {
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          console.log("hasPermission: " + enabled);
        } else {
          console.log("hasPermission: " + enabled);
        } 
    });

    firebase.messaging().requestPermission()
      .then(() => {
        console.log("User has Authorized");
      })
      .catch(error => {
        console.log("User has rejected permissions");
      });

    this.messageListener = firebase.messaging().onMessage((message) => {
      console.log("onMessage: " + message);
    });

    firebase.messaging().getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log("Token: " + fcmToken);
        } else {
          console.log("No Token Generated");
        } 
      });

    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      alert("Token: " + fcmToken);
    });

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
      console.log("onNotificationDisplayed: " + notification);
    });
    this.notificationListener = firebase.notifications().onNotification((notification) => {
      console.log("onNotification: " + notification);
    });

    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      // Get the action triggered by the notification being opened
        const action = notificationOpen.action;
        console.log("notificationOpen.action: " + notificationOpen.action);
        // Get information about the notification that was opened
        const notification = notificationOpen.notification;
        console.log("notificationOpen.notification: " + notificationOpen.notification);
    });

    firebase.notifications().getInitialNotification()
      .then((notificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          const action = notificationOpen.action;
          console.log("notificationOpen.action: " + notificationOpen.action);
          // Get information about the notification that was opened
          const notification = notificationOpen.notification;
          console.log("notificationOpen.notification: " + notificationOpen.notification);
        }
      });

    const notification = new firebase.notifications.Notification()
      .setNotificationId('1')
      .setTitle('title')
      .setBody('description')
      .setData({
        key: true,
        key2: false
      });
  }

  componentWillUnmount() {
    this.messageListener();
    this.onTokenRefreshListener();
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
