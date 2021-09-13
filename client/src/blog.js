import  React,{ Component } from 'react';
import {connect} from 'react-redux'
import {getBlogWithReviewer,clearBlogWithReviewer} from './actions'
import moment from 'moment';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';

class BlogView extends Component{
    componentDidMount(){
        this.props.dispatch(getBlogWithReviewer(this.props.match.params.id))

    }
    componentWillUnmount(){
        this.props.dispatch(clearBlogWithReviewer(this.props.match.params.id))


    }
    like=()=>{
        let blog = this.props.blogs.blog;
        const s = this.props.blogs.blog.likes;
        let num = (parseInt(s)+1)
        blog.likes = num.toString(10)
        axios.post(`/api/like?id=${blog._id}`,blog)
        .then(res=>{})
        this.props.history.push(`/blogs/${this.props.blogs.blog._id}`)
    }
    renderBlog=(blogs)=>{
        return(
        blogs.blog ? 
        <div className="br_container">
            <div className="br_header">
               <strong><h2>{blogs.blog.name}</h2></strong>
               <h5>{blogs.blog.theme}</h5>
               <div className="br_reviewer">
                   <span>Written By:</span>&nbsp;
                   {blogs.writer.name} {blogs.writer.lastname}

               </div>
               <div className="br_review">
                 {blogs.blog.content}
               </div>
            </div>
            <div onClick={this.like} style={{cursor:"pointer"}}>
            <FontAwesome name="thumbs-up" style={{fontSize:"22px",marginLeft:"20px",color:"#3457D5"}}></FontAwesome>
            <span style={{color:"#3457D5",fontSize:"18px",fontFamily:"cursive"}}>&nbsp;Like</span>
            </div>
            <div className="br_box">
                <div className="left">
                   <div>
                       <span>Time to Read:</span>&nbsp;{blogs.blog.time_read} min
                   </div>
                   <div>
                       <span>Date:</span>&nbsp;{moment(blogs.blog.createdAt).format("ll")}
                   </div>
                </div>
                <div className="right">
                    <span>Likes</span>
                    <div>{blogs.blog.likes}</div>
                </div>
            </div>
           
        </div>
        :null)
    }
    render(){
        let blogs =this.props.blogs
        return(
            <div>
                {this.renderBlog(blogs)}
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        blogs:state.blogs
    }
}
export default connect(mapStateToProps)(BlogView);