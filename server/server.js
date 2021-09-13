const express = require('express')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const app = express();
const config = require('./config/config').get(process.env.NODE_ENV);
mongoose.Promise = global.Promise;
const User = require('./models/user')
const {Blog} =require('./models/blog')
const {auth} = require('./middleware/auth')
mongoose.connect(config.DATABASE)
app.use(express.json());
app.use(cookieParser());
app.use(express.static('client/build'))
// --- GET ---
app.get('/api/getblog',(req,res)=>{
    let id = req.query.id;
    Blog.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.send(doc)

    })
})
app.get('/api/blogs',(req,res)=>{
  let skip = parseInt(req.query.skip)
  let limit= parseInt(req.query.limit)
  let order= req.query.order

  Blog.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
    if(err) return res.status(400).send(err)
    res.send(doc)
  })
})
app.get('/api/writer',(req,res)=>{
    let id = req.query.id;
    User.findById(id,(err,user)=>{
        if(err) return res.status(400).send(err)
        res.json({
            name:user.name,
            lastname:user.lastname
        })
    })
})
app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err)
        res.json(users)
    })
})
app.get('/api/userpost',(req,res)=>{
    Blog.find({ownerId:req.query.id}).exec((err,docs)=>{
        if(err) return res.status(400).send(err)
        res.send(docs)

    })
})
app.get('/api/logout',auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err)
        res.sendStatus(200)
    })

})
app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname
    })
})
// --- POST ---
app.post('/api/blog',(req,res)=>{
    const blog = new Blog(req.body)
    blog.save((err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({
            post:true,
            blogId:doc._id
        })
    })
})
app.post('/api/register',(req,res)=>{
    const user = new User(req.body);
    user.save((err,doc)=>{
        if(err){ console.log(err); return res.json({success:false})}
        res.json({
            success:true,
            user:doc
        })
    })
})
app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},function(err,user){ 
        if(!user) return res.json({isAuth:false,message:'Email Not Found'})
        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch)return res.json({isAuth:false,message:'Wrong Password'})
            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err)
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
            
                })
            })
        })
    })
})
// --- UPDATE ---
app.post('/api/update',(req,res)=>{
    Blog.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({
            success:true,
            doc
        })
    })
})
app.post('/api/like',(req,res)=>{
    Blog.findByIdAndUpdate(req.query.id,req.body,(err,doc)=>{
        if(err) {console.log(err);return res.status(400).send(err)}
        res.status(200).json({
            success:true
        })
    })
})
// --- DELETE --- 
app.delete('/api/delete/',(req,res)=>{
    let id = req.query.id;
    Blog.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err)
        res.json(true)
    })
})

if(process.env.NODE_ENV === 'production')
{
    const path = require('path');
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'../client','build','index.html'))
    })
}


const port= process.env.PORT || 3001;
app.listen(port,()=>{
    console.log('Server Running');
});