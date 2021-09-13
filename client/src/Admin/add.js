import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
class AddBlog extends Component {
    state={
        formdata:{
            name:'',
            theme:'',
            content:'',
            time_read:'',
            likes:'0'
        },
        info:{}
    }
    handleInput=(event,name)=>{
        const newFormdata ={
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value;
        this.setState({formdata:newFormdata})

    }
    redirect(){
        setTimeout(()=>{this.props.history.push(`/blogs/${this.state.info.blogId}`)},4000)
    }
    onSub=(event)=>{
        event.preventDefault();
        console.log(this.props)
        const forminfo={...this.state.formdata,ownerId:this.props.user.login.id}
        axios.post('/api/blog',forminfo)
        .then((resp)=> 
        {this.setState({info:resp.data})}
        )
        this.redirect()

    }
    showblog=()=>{
        return(
        this.state.info.post?
        <div className="conf_link"> Cool !!
        <Link to={`/blogs/${this.state.info.blogId}`}> Click here to see the Post</Link>
        </div>
        :null)
    }
    render() {
        return (
            <div className="rl_container article">
                {
                    this.state.info?
                    this.showblog()
                    :null
                }
                <form  onSubmit={this.onSub}>
                    <h2>Add the Blog</h2>
                    <div className="form_element">
                        <input 
                        type="text"
                        placeholder="Enter Name"
                        value={this.state.formdata.name}
                        onChange={(event)=>{this.handleInput(event,'name')}}
                        />
                    </div>
                    <div className="form_element">
                        <input 
                        type="text"
                        placeholder="Enter Theme"
                        value={this.state.formdata.author}
                        onChange={(event)=>{this.handleInput(event,'theme')}}
                        />
                    </div>
                    <textarea
                    placeholder="Add the Blog"
                    value={this.state.formdata.content}
                    onChange={(event)=>{this.handleInput(event,'content')}}
                    />
                    <div className="form_element">
                        <input 
                        type="text"
                        placeholder="Enter Time of reading"
                        value={this.state.formdata.pages}
                        onChange={(event)=>{this.handleInput(event,'time_read')}}
                        />
                    </div>
                    <button type="submit" style={{cursor:"pointer"}}>Add Blog</button>
                   
                </form>
                
            </div>
        );
    }
}

export default AddBlog;