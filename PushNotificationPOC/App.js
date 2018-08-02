/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, Button} from 'react-native';
import firebase, { RemoteMessage } from 'react-native-firebase';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  state = {
    token: '',
    body: '',
    title: '',
    userId: null,
    topic: ''
  }

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
          this.setState({token: fcmToken});
        } else {
          console.log("No Token Generated");
        } 
      });

    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      console.log("Token: " + fcmToken);
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

    firebase.messaging().subscribeToTopic("emids");
  }

  componentWillUnmount() {
    this.messageListener();
    this.onTokenRefreshListener();
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
  }

  sendNotification = () => {
    const values = {
      notificationTitle: this.state.title,
      notificationBody: this.state.body,
      topic: this.state.topic
    };
    fetch("http://52.172.45.185:9000/api/SendNotification", {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(this.state)
    }).then((data) => {
      console.log(data);
    });
  }

  registerDevice = () => {
    const values = {
      userId: this.state.userId,
      token: this.state.token
    };
    fetch("http://52.172.45.185:9000/api/TokenStore", {
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(values)
    }).then((data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Push Notification Using React Native!</Text>
        <Text style={styles.instructions}>{this.state.token}</Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300}}
          onChangeText={(userId) => this.setState({userId})}
          value={this.state.userId}
          placeholder="UserId"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300}}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
          placeholder="Title"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300}}
          onChangeText={(body) => this.setState({body})}
          value={this.state.body}
          placeholder="Body"
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300}}
          onChangeText={(topic) => this.setState({topic})}
          value={this.state.topic}
          placeholder="Topic"
        />
        <Button
          onPress={this.registerDevice}
          title="Register Device"
        />
        <Button
          onPress={this.sendNotification}
          title="Send Notification"
        />
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
