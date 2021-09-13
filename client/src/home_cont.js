import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getBlogs} from './actions'
import BlogItem  from './bookitem'
class Home_Cont extends Component{
    componentDidMount(){
        this.props.dispatch(getBlogs(3,0,'desc'))
    }
    renderItems=(blogs)=>{
        return(
        blogs.list ?
        blogs.list.map((item,i)=>{
           return  <div key={i}><BlogItem item={item}/></div>
        })
        :null)


    }
    loadmore=()=>{
        let count = this.props.blogs.list.length
        this.props.dispatch(getBlogs(1,count,'desc',this.props.blogs.list))
    }
    render(){
        return(
            <div>
               {this.renderItems(this.props.blogs)}
               <div 
               onClick={this.loadmore}
               style={{color:"#505050"}}className="loadmore">
                   Load More
               </div>
            </div>
        )

    }
}
function mapStateToProps(state){
    return {
        blogs:state.blogs
    }
}
export default connect(mapStateToProps)(Home_Cont)