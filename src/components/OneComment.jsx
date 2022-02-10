import React from "react";
import APIHandler from "../api/APIHandler";

function OneComment({comment,updateComments,auth}) {

  const deleteComment= async ()=>{
    try{
    await APIHandler.post("/comment/delete",{_id:comment._id})
    updateComments()
    }catch(e){console.log(e)}
  }

  const modifyComment = (e)=>{e.target.toggleAttribute('contentEditable')}
  const closeComment = (e)=>{e.target.toggleAttribute('contentEditable')}
  const sendComment = async (e)=>{
        try{
        //create a mongo request to be treated
        console.log(">>>>",{...comment,content:e.target.textContent})
        await APIHandler.post("/comment/update", {...comment,content:e.target.textContent})
        updateComments()
        }catch(err){console.error(err)
    }
  }

  console.log(auth,comment.user)

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <>
      <li key={comment._id} className="comment">
        {auth.isLoggedIn && auth.user._id === comment.user._id && <span onDoubleClick={modifyComment} onBlur={(e)=>{closeComment(e);sendComment(e)}}>{comment.content}</span>}
        {(!auth.isLoggedIn || !auth.user._id === comment.user._id) && <span>{comment.content}</span>}
        <p>
          <span>Posted on {months[new Date(comment.date).getMonth()]} {new Date(comment.date).getFullYear()} </span>
          <span>By {comment.user.email.slice(0,comment.user.email.indexOf("@"))}{"*****"}</span>
        </p>
        
        {auth.isLoggedIn && auth.user._id === comment.user._id && <i className="fa fa-trash delete" onClick={deleteComment} ></i>}
      </li>
    </>
  );
}

export default OneComment;

//{auth.isLoggedIn && auth.user._id === comment.user &&<i className="fa fa-trash delete" data-commentid={comment.id} onClick={deleteComment} ></i>}