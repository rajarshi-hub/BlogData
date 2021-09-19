import React, { Component } from 'react';
import axios from 'axios'

class Login extends Component {
    state={
        email:'',
        password:'',
        error:'',
        success:false,
        info:{}
    }
    onSubmit=(event)=>{
       event.preventDefault();
       const email=this.state.email
       const password=this.state.password
       axios.post(`/api/login`,{email,password})
       .then((resp)=>{
        this.setState({info:resp.data})
            if(this.state.info.isAuth)
       this.props.history.push('/user')

       }
       )
    }
    render() {
        return (
            <div className="rl_container">
                <form onSubmit={this.onSubmit}>
                    <h2>Log in Here</h2>
                    <div className="form_element">
                        <input type="email"
                        value={this.state.email}
                        onChange={event=>{this.setState({email:event.target.value})}}
                        placeholder="Enter your email"
                        />

                    </div>
                    <div className="form_element">
                        <input type="password"
                        value={this.state.password}
                        onChange={event=>{this.setState({password:event.target.value})}}
                        placeholder="Enter Password"
                        />

                    </div>
                    <button type="submit" style={{cursor:"pointer"}}>Log in</button>
                    <div className="error">
                    {
                        this.state.info?(<div>{this.state.info.message}</div>):null
                    }
                    </div>

                </form>
                
            </div>
        );
    }
}

export default Login;
