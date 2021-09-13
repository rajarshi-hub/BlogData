import axios from 'axios'
export function getBlogs(
    limit=10,
    start=0,
    order='asc',
    list=''
){
    const req = axios.get(`/api/blogs?limit=${limit}&skip=${start}&order=${order}`)
    .then(resp=>
        {
            if(list){
          return [...list,...resp.data]
        }
        else
        {
            return resp.data
        }})
    return {
        type:'GET_BLOGS',
        payload:req
}

}
export function getBlogWithReviewer(id){
    const req =axios.get(`/api/getblog?id=${id}`)

    return(dispatch)=>{
        req.then(({data})=>{
            let blog=data;
            axios.get(`/api/writer?id=${blog.ownerId}`)
            .then(({data})=>
            {
                let resp={
                    blog,
                    writer:data
                }
                console.log(resp)
                dispatch({
                    type:'GET_BOOK_WITH_REVIEWER',
                    payload:resp
                })
            })
    })
}
}
export function clearBlogWithReviewer(id){
    return{
        type:'CLEAR_BOOK_WITH_REVIEWER',
        payload:{
            book:{},
            writer:{}
        }
    }
}
export function auth(){
    const req = axios.get('/api/auth') 
    .then(resp=>resp.data)
    return {
        type:'USER_AUTH',
        payload:req
    }
}