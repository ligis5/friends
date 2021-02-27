import React from 'react';
import { useData } from "./components/FirebaseComponents/firebaseFunctionsFiles";



// here we map over all posts and all users and for every post we assign a user that created said post.
 const AllPostsAssign = () => {
    const { userPosts, allUsers } = useData();

    let allPosts = [];
 allUsers.forEach(y => {
   userPosts.forEach(x => {
     if(y.userId === x.data().userId){
      const q = Object.assign(x.data(), {'id':x.id})
      Object.assign(q, {'user':y})
      allPosts.push(q)
     }
   })
 })

 allPosts.sort((a, b) => {
  return a.createdAt.seconds - b.createdAt.seconds;
})
allPosts.reverse();
return allPosts;
}

export default AllPostsAssign
