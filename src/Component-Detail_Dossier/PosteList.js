import React from "react";
import PosteNote from "./PosteNote";
import PosteVote from "./PosteVote";
import PosteFichier from "./PosteFichier";

function PosteList({ posts , choix , results}) {
  return (
    <>
      {posts.map(function (post) {
        if (post. type === "note") {
          return <PosteNote post={post} />;
        } else if (post. type === "vote") {
          return <PosteVote post={post} choix={choix} results={results}/>;
        } else if (post. type === "Fichier") {
          return <PosteFichier post={post} />;
        }
        return null;
      })}
    </>
  );
}

export default PosteList;
