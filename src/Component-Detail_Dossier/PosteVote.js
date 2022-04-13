import React from "react";
import ChoixVote from "./ChoixVote";

function PosteVote({ post, choix ,results} ) {
  
  return (
    <>
      <div className="vote">
        <h4 className="dateNote">{post.creationDate}</h4>
        <div className="voteshadow">
          <p className="titleVote">{post.title}</p>
         
          {choix.map(function (choix) {
            if (choix.idVote == post.idVote) {
               return <ChoixVote choix={choix} results={results} post={post}/>
            }
            return null;
          })}

        </div>
      </div>
    </>
  );
}

export default PosteVote;
