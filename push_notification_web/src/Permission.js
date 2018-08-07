import React, {Component} from "react";
import './permission.css';

class Permission extends Component {
    render() {
        if(Notification.permission !== 'granted'){
            return <div className="permission">
                <button onClick={ this.props.requestPermissionFunc }>Ask for permission!</button>
            </div>
        }
        else if(Notification.permission === 'granted' && this.props.fcmToken === null){
            return <div className="permission">
                <button onClick={ this.props.getTokenFunc }>Generate Token!</button>
                </div>
        }
        else{
            return <div className="permission">
                Permission Granted & Token Generated.
                You can send notificatons now!
            </div>
        }
    }
}

export default Permission;