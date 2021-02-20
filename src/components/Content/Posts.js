import React from 'react';
import Post from './post';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useData } from '../FirebaseComponents/firebaseFunctionsFiles';
import { useCallback } from 'react';


 const Posts = () => {
   const { userPosts, allUsers } = useData()

   let usersData = [];
   allUsers.map((doc) => {
    usersData.push({[doc.id]: doc.data()});
});
  
  let allPosts;
  usersData.map(y => {
    userPosts.map(x => {
      if(Object.keys(y).toString() === x.data().userId){
       const q = Object.assign(x.data(), {['id']:x.id})
       allPosts =  Object.assign(q, y)
      }
    })
  })
  console.log(allPosts)



    return(
        // <InfiniteScroll
        // scrollThreshold={0.9}
        // dataLength={data.length}
        // next={nextPage}
        // hasMore={true}
        // loader={<h4>Loading...</h4>}
        // >
            <div>
                {/* {
                 userPosts.map((postData) => (
                    <Post key={postData.id} postData={postData.data()}
                 />
                 ))} */}
            </div>
        // </InfiniteScroll>
    )
 }
        
 export default Posts;