import React from "react";

function OneComment({comment}) {

  return (
    <>
      <li key={comment._id} id={comment._id} className="comment">
        <span data-commentid={comment.id}>{comment.content}</span>
        <i className="fa fa-trash delete" data-commentid={comment.id}></i>
      </li>
    </>
  );
}

export default OneComment;
