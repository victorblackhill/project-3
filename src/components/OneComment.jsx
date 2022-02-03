import React from "react";
import APIHandler from "../api/APIHandler";

function OneComment({comment,updateComments}) {

  const deleteComment= async ()=>{
    try{
    await APIHandler.post("/comment/delete",{_id:comment._id})
    updateComments()
    }catch(e){console.log(e)}
  }



  return (
    <>
      <li key={comment._id} id={comment._id} className="comment">
        <span data-commentid={comment.id}>{comment.content}</span>
        <i className="fa fa-trash delete" data-commentid={comment.id} onClick={deleteComment} ></i>
      </li>
    </>
  );
}

export default OneComment;
