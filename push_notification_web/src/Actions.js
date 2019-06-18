import React, {Component} from "react";
import './actions.css';

class Actions extends Component {
    render() {
        return (
            <div className="actions">
                <button onClick={this.props.notifyMeFunc} className={this.props.fcmToken===null ? 'disabled' : ''} >Notify me!</button>
            </div>
        );
    }
}

export default Actions;