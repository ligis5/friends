import React from "react";
import AllPostsAssign from "../../../AllPostsAssign";
import Post from "./post";
import { useData } from "../../FirebaseComponents/firebaseFunctionsFiles";

const Posts = () => {
  const { userPosts, allUsers } = useData();
  return (
    <div style={{ marginRight: "60px" }}>
      {userPosts && allUsers ? (
        <>
          {AllPostsAssign().map((postData) => (
            <Post key={postData.id} postData={postData} />
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Posts;
