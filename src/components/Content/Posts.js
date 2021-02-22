import React from 'react';
import Post from './post';
import { useData } from '../FirebaseComponents/firebaseFunctionsFiles';



 const Posts = () => {
   const { userPosts, allUsers } = useData()
  
  
  // here we map over all posts and all users and for every post we assign a user that created said post.
let allPosts = [];
  allUsers.map(y => {
   const z = Object.assign(y.data(), {['userId']:y.id})
    userPosts.map(x => {
      if(z.userId === x.data().userId){
       const q = Object.assign(x.data(), {['id']:x.id})
       Object.assign(q, {['user']:z})
       allPosts.push(q)
       
      }
    })
  })



    return(
            <div>
                {
                 allPosts.map((postData) => (
                    <Post key={postData.id} postData={postData}
                 />
                 ))}
            </div>
    )
 }
        
 export default Posts;