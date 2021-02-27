import React from "react";
import AllPostsAssign from '../../../AllPostsAssign';
import Post from "./post";


const Posts = () => {
 
   return(
           <div>
               {
                AllPostsAssign().map((postData) => (
                   <Post key={postData.id} postData={postData}
                />
                ))}
           </div>
   )
}
       
export default Posts;