import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment';
import {Link} from 'react-router-dom'

class UserPost extends Component {
    state={
        get:[]

    }
    componentDidMount(){
        axios.get(`/api/userpost?id=${this.props.user.login.id}`)
        .then(resp=>{
            this.setState({get:resp.data})
        })

    }
    posts=()=>{
        return(
        this.state.get.map((item)=>{
            return(
            <tr key={item._id}>
                <td style={{cursor:"pointer"}}><Link to={`/user/edit-post/${item._id}`}>{item.name}</Link></td>
                <td><Link to={`/user/edit-post/${item._id}`}>{item.theme}</Link></td>
                <td><Link to={`/user/edit-post/${item._id}`}>{moment(item.createAt).format("MM/DD/YY")}</Link></td>
            </tr>)
        })
        )
    }
    showpost=()=>{
        return(
            <div className="user_posts">
                <h4 style={{fontSize:"16px",fontFamily:"cursive"}}>Your Posts:&nbsp;<br/> You may edit post by clicking on it</h4> 
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Theme</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.posts()}
                    </tbody>
                </table>

            </div>
        )
    }
    render() {
        console.log(this.state.get)
        return (
            <div>
                {this.showpost()}
            </div>
        );
    }
}

export default UserPost;