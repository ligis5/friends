
import React from 'react';
import Post from './post';
import {Container} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';


 const Posts = ({data, nextPage}) => {
    
    const hash = {};
    const filteredData = data.filter(({owner, id}) => {
      const key = `${owner}${id}`; 
      if (key in hash) {
        return false;
      }
     
      hash[key] = true;
      return true;
    });

    return(
        <InfiniteScroll
        scrollThreshold={0.9}
        dataLength={data.length}
        next={nextPage}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        >
            <Container style={{padding:'0'}}>
                {
                 filteredData.map(({id, ...otherPostProps}) => (
                    <Post key={id} id={id}
                    {...otherPostProps}
                    owner={otherPostProps.owner}
                    tags={otherPostProps.tags}
                 />
                 ))}
            </Container>
        </InfiniteScroll>
    )
 }
        
 export default Posts;