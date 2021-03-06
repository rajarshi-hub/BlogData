import React from 'react';

const User = (props) => {
   console.log(props)
    return (
        <div className="user_container">
            <div className="avatar">
            <img alt="avatar" src="/images/avatar.png"/>
            </div>
            <div className="nfo">
                <div><span>Name:</span>&nbsp;{props.user.login.name}</div>
                <div><span>Lastname:</span>&nbsp;{props.user.login.lastname}</div>
                <div><span>Email:</span>&nbsp;{props.user.login.email}</div>
            </div>
            
        </div>
    );
};

export default User;