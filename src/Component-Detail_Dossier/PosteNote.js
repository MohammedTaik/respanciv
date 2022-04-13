import React from "react";
function PosteNote({post}) {
   

   return (
    <>
      <div className="Postnote" >
        <h4 className="dateNote">{post.creationDate}</h4>
        <textarea className="areaBorder"  value={post.note}></textarea>
      </div>
    </>
  )
  
}

export default PosteNote;
