
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Permission from './Permission';
import Actions from './Actions';
import firebase from 'firebase';

class App extends Component {

  constructor() {
    super();

    this.state = {
        permissionStateToggle: false,
        fcmToken: null
    };

    var config = {
        apiKey: "AIzaSyDRVoLBeiolvlfITIu9Wk7cN5jT9hQqaEs",
        authDomain: "pushnotificationpoc-6a4f2.firebaseapp.com",
        databaseURL: "https://pushnotificationpoc-6a4f2.firebaseio.com",
        projectId: "pushnotificationpoc-6a4f2",
        storageBucket: "pushnotificationpoc-6a4f2.appspot.com",
        messagingSenderId: "1041406585120"
    };
    firebase.initializeApp(config);

    this.notifyMe = this.notifyMe.bind(this);
    this.requestPermission = this.requestPermission.bind(this);
    this.getToken = this.getToken.bind(this);
  }

  notifyMe(){
      if(this.state.fcmToken !== null){
        const values = {
          notification: {
            title: "Firebase",
            body: "Firebase is awesome"
          },
          to: this.state.fcmToken
        };
        fetch("https://fcm.googleapis.com/fcm/send", {
          method: 'post',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify(values)
        }).then((data) => {
          console.log(data);
        });
      }else{
          alert("FCM token not found. Generate Token by clicking the button above.");
      }
  }

requestPermission(){
    firebase.messaging().requestPermission()
        .then(()=>{
            console.log('Notification permission granted.');
            this.setState({permissionStateToggle : true});
        })
        .catch(function(err) {
            console.log('Unable to get permission to notify.', err);
        });
}

getToken(){
  firebase.messaging().getToken()
        .then((currentToken)=>{
            if (currentToken) {
                console.log("Token received: ", currentToken);
                this.setState({fcmToken: currentToken});
                //send token to the server
            } else {
                // Show permission request.
                console.log('No Instance ID token available. Request permission to generate one.');
                // this.requestPermission();
            }
        })
        .catch(function(err) {
            console.log('An error occurred while retrieving token. ', err);
            console.log('Error retrieving Instance ID token. ', err);
            // send false to server
        });
}

  render() {
    return (
      <div className="container">
          <div className="info">
              <span>There are four states possible:</span>
                <ul>
                    <li>Permission Denied.</li>
                    <li>Permission Granted.</li>
                    <li>Permission Granted but no Token Generated.</li>
                    <li>Permission Granted & Token Generated.</li>
                </ul>
          </div>
          <Permission
              fcmToken={ this.state.fcmToken }
              requestPermissionFunc={this.requestPermission}
              getTokenFunc={this.getToken}
              permissionStateToggle={this.state.permissionStateToggle}
          />
          <Actions
              fcmToken={ this.state.fcmToken }
              notifyMeFunc={this.notifyMe}
          />
      </div>
    );
  }
}

export default App;
