export default function(state={},action){
    switch(action.type){
        case 'GET_BLOGS':
            return {...state,list:action.payload}
        case 'GET_BOOK_WITH_REVIEWER':
        return {...state,blog:action.payload.blog,writer:action.payload.writer}
        case 'CLEAR_BOOK_WITH_REVIEWER':
        return {...state,blog:action.payload.blog,writer:action.payload.writer}
        default:
            return state;
    }
}