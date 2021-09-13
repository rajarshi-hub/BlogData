import React  from "react";
import {Link} from 'react-router-dom';
import moment from 'moment';
import FontAwesome from "react-fontawesome";
const BookItem =(props)=>{
    return(
        <Link to={`blogs/${props.item._id}`} className="book_item">
            <div className="book_header">
               <h2>{props.item.name}</h2>
            </div>
            <div className="book_items">
                <div className="book_author">
                    {props.item.theme} 
                </div>
                <div className="book_bubble">
                    <strong>{props.item.time_read}</strong>&nbsp; min read

                </div>
                <div className="book_bubble rating">
                    <strong>Date</strong>&nbsp; &nbsp;{moment(props.item.createdAt).format("ll")}

                </div>
                <div className="book_bubble" style={{background:"white",color:"#686868",fontSize:"14px",fontWeight:"600"}}>
                <span><FontAwesome name="thumbs-up" style={{color:"#3457D5",fontSize:"14px"}}></FontAwesome></span>&nbsp;{props.item.likes}

                </div>
            </div>
        </Link>
    )
}
export default BookItem