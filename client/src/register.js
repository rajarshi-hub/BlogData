import axios from 'axios';
import React, { Component } from 'react';

class Register extends Component {
    state={
        formdata:{
        name:'',
        lastname:'',
        email:'',
        password:''},
        error:{success:null},
        info:[]
    }
    componentDidMount(){
        axios.get('/api/users')
        .then(resp => this.setState({info:resp.data}))
        console.log(this.state.info)

    }
    HandleName=(event)=>{
        const newFormdata ={
            ...this.state.formdata
        }
        newFormdata["name"] = event.target.value;
        this.setState({formdata:newFormdata})
          
    }
    HandleLastname=(event)=>{
        const newFormdata ={
            ...this.state.formdata
        }
        newFormdata["lastname"] = event.target.value;
        this.setState({formdata:newFormdata})

    }
    HandleEmail=(event)=>{
        const newFormdata ={
            ...this.state.formdata
        }
        newFormdata["email"] = event.target.value;
        this.setState({formdata:newFormdata})

    }
    HandlePassword=(event)=>{

        const newFormdata ={
            ...this.state.formdata
        }
        newFormdata["password"] = event.target.value;
        this.setState({formdata:newFormdata})
    }
    redirect=()=>{
        setTimeout(()=>{
            this.props.history.push('/login')},2000)
    }
    onSub=(event)=>{
        event.preventDefault();
        axios.post('/api/register',this.state.formdata)
        .then(resp=>this.setState({error:resp.data}))
        {this.redirect()}
    }
    tablebody=()=>{
        return(
        this.state.info?
        this.state.info.map(item=>{
            return(
            <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>



            </tr>)
        })
        :null)
        
    }
    render() {
        return (
            <div className="rl_container">
                <form onSubmit={this.onSub}>
                    <h2>Add User</h2>
                    <div className="form_element">
                        <input 
                        type="text"
                        placeholder="Enter First Name"
                        value={this.state.formdata.name}
                        onChange={this.HandleName}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                        type="text"
                        placeholder="Enter Last Name"
                        value={this.state.formdata.lastname}
                        onChange={this.HandleLastname}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                        type="email"
                        placeholder="Enter Email"
                        value={this.state.formdata.email}
                        onChange={this.HandleEmail}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                        type="password"
                        placeholder="Enter Password"
                        value={this.state.formdata.password}
                        onChange={this.HandlePassword}
                        />
                    </div>
                     <button type="submit" style={{cursor:"pointer"}}>Add User</button>

                </form>
                <div style={{marginTop:"10px"}}>
                {
    
              this.state.error.success !== null?
            this.state.error.success?
            <div className="edit_confirm">
              Success
            </div>:
            <div className="red_tag">
              Error
             </div>:
              null
            }
            </div>
                <div className="current_users">
                    <h4>Current Users</h4>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>LastName</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.tablebody()}
                        </tbody>
                    </table>
                </div>
                
            </div>
        );
    }
}

export default Register;