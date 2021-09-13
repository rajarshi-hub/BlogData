import React from 'react';
import {Link} from 'react-router-dom'
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';


const SideNavItems =({user})=>{
    const items=[
        {
            type:'navItem',
            icon:'home',
            text:'Home',
            link:'/',
            restricted:false
        },
        {
            type:'navItem',
            icon:'user',
            text:'My Profile',
            link:'/user',
            restricted:true
        },
        {
            type:'navItem',
            icon:'user-plus',
            text:'Register',
            link:'/user/register',
            restricted:false
        },
        {
            type:'navItem',
            icon:'sign-in',
            text:'Login',
            link:'/login',
            restricted:false,
            exclude:true
        },
        {
            type:'navItem',
            icon:'file-text',
            text:'My Blogs',
            link:'/user/user-reviews',
            restricted:true
        },
        {
            type:'navItem',
            icon:'plus-square',
            text:'Add Blog',
            link:'/user/add',
            restricted:true
        },
        {
            type:'navItem',
            icon:'sign-out',
            text:'Logout',
            link:'/user/logout',
            restricted:true
        },
        
    ]
    const element = (item,i)=>{
        return(
        <div key={i} className={item.type}>
            <Link to={item.link}>
            <FontAwesome name={item.icon}/>
            <span style={{fontSize:"13px"}}>{item.text}</span>
            </Link>
        </div>)
        

    }
    const showItems=()=>{
        return(
            user.login?
        items.map((item,i)=>{
            if(user.login.isAuth){
                return !item.exclude ? element(item,i):null;

            }else{
                return !item.restricted ? element(item,i):null
            }

        }):null)
    }
return(
    <div style={{color:"#ffffff"}}>
        {showItems()}
    </div>
)
}
function mapStateToProps(state){
    return{
        user:state.user
    }
}
export default connect(mapStateToProps)(SideNavItems);