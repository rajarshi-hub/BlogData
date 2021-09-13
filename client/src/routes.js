import React from 'react';
import {Switch,Route} from 'react-router-dom'
import Home from './home'
import Layout from './layout'
import Blog from './blog.js' 
import Login from './login'
import Auth from './auth'
import User from './Admin'
import AddBlog from './Admin/add'
import UserPost from './user_posts'
import EditBlog from './Admin/edit'
import Register from './register'
import Logout from './logout';
const Routes = ()=>{
return(
    <Layout>
    <Switch>
        <Route path="/" exact component={Auth(Home,null)}></Route>
        <Route path="/blogs/:id" exact component={Auth(Blog,null)}></Route>
        <Route path="/user"exact component={Auth(User,true)}></Route>
        <Route path="/login" exact component={Auth(Login,false)}></Route>
        <Route path="/user/add" exact component={Auth(AddBlog,true)}></Route>
        <Route path="/user/user-reviews" exact component={Auth(UserPost,true)}></Route>
        <Route path="/user/edit-post/:id" exact component={Auth(EditBlog,true)}></Route>
        <Route path="/user/register" exact component={Auth(Register,false)}></Route>
        <Route path="/user/logout" exact component={Auth(Logout,true)}></Route>
    </Switch>
    </Layout>
)
}
export default Routes;