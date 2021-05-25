import React from "react";
import AllPostsAssign from "../../../AllPostsAssign";
import Post from "./post";

const Posts = () => {
  const allPosts = AllPostsAssign();

  return (
    <div style={{ marginRight: "60px" }}>
      {allPosts &&
        allPosts.map((postData) => (
          <Post key={postData.id} postData={postData} />
        ))}
    </div>
  );
};

export default Posts;
