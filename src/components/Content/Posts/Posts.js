import React from "react";
import AllPostsAssign from "../../../AllPostsAssign";
import Post from "./post";

const Posts = ({parentWidth}) => {
  const allPosts = AllPostsAssign();

  return (
    <div style={{  width:parentWidth < 1200 ? '100%' : '95%',
     marginLeft:parentWidth < 1200 && parentWidth > 800 ? '200px' : '5px'}}>
      {allPosts &&
        allPosts.map((postData) => (
          <Post key={postData.id} postData={postData} />
        ))}
    </div>
  );
};

export default Posts;
