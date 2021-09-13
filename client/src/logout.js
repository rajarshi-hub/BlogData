import React, { Component } from 'react';
import axios from 'axios';

class Logout extends Component {
    componentDidMount(){
        axios.get('/api/logout')
        .then((res)=>
        setTimeout(()=>{this.props.history.push("/")},3000)
        )

    }
    render() {
        return (
            <div>
                <h3 className="logout_container">
                    &nbsp;Sorry to see you go :(
                </h3>
            </div>
        );
    }
}

export default Logout;