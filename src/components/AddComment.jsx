import React, {useState} from "react";
import APIHandler from "../api/APIHandler";

function AddComment ({setComments,id,updateComments}){

    const [myComment,setMyComment] = useState("")
    
    const textListener = e => setMyComment(e.target.value)

    const sendComment = async ()=>{
        
        try{
            const newComment = {
                content:myComment,
                recipe:id
            }
            
            await APIHandler.post("/comment/"+id, newComment)
            setMyComment("")
            updateComments()
    
        }catch(err){console.error(err)}
           
    }

    
    return  <div className = "block-comment">
                <textarea value={myComment} onChange={textListener} className="block" type="textarea" id="comment" name="content"  placeholder="add your comments"/>
                <button type="button" onClick={myComment.length>0?sendComment:()=>{}}>Comment</button>
            </div>


}

export default AddComment