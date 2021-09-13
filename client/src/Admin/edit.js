import React, { PureComponent } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
class EditBlog extends PureComponent {
    state={
        formdata:{
            _id:this.props.match.params.id,
            name:'',
            theme:'',
            content:'',
            time_read:'',
            likes:'0'
        },
        info:{},
        del:false
    }
    handleInput=(event,name)=>{
        const newFormdata ={
            ...this.state.formdata
        }
        newFormdata[name] = event.target.value;
        this.setState({formdata:newFormdata})

    }
    componentDidMount(){
        axios.get(`/api/getBlog?id=${this.state.formdata._id}`)
        .then((resp)=> 
        {
            const res=resp.data;
            this.setState({formdata:{
            _id:res._id,
            name:res.name,
            theme:res.theme,
            content:res.content,
            time_read:res.time_read
        }})})

    }
    onSub=(event)=>{
        event.preventDefault();
        axios.post(`/api/update `,this.state.formdata)
        .then((resp)=> 
        {this.setState({info:resp.data})}
        )

    }
    showmsg=()=>{
        return(
        this.state.info.success?
        <div className="edit_confirm"> Updated the Blog
        <Link to={`/blogs/${this.state.formdata._id}`}> Click here to see the Post</Link>
        </div>
        :null)
    }
    delete=()=>{
        axios.delete(`/api/delete?id=${this.state.formdata._id}`)
        .then(resp=>{this.setState({del:resp.data})})
    }
    redirect=()=>{
        setTimeout(()=>{
            this.props.history.push('/user/user-reviews')},5000)
    }
    delmsg=()=>{
        return(
            <div>
            <div className="red_tag"> Blog Deleted</div>
            {this.redirect()}
            </div>
            )

    }
    render() {
        return (
            <div className="rl_container article">
                 {this.state.info ?this.showmsg():null}
                 {this.state.del?this.delmsg():null}
                <form  onSubmit={this.onSub}>
                    <h2>Edit Blog</h2>
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
                        value={this.state.formdata.theme}
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
                        placeholder="Enter read time"
                        value={this.state.formdata.time_read}
                        onChange={(event)=>{this.handleInput(event,'time_read')}}
                        />
                    </div>
                    <button type="submit" style={{cursor:"pointer"}}>Edit Blog</button>
                    <div className="delete_post">
                        <div className="button" style={{cursor:"pointer"}}
                        onClick={this.delete}>
                            Delete Blog
                        </div>
                    </div>
                   
                </form>
                
            </div>
        );
    }
}

export default EditBlog;