
import React, {useMemo} from 'react';
import Post from './post';
import './posts.css';
import {Container} from 'react-bootstrap';


 const Posts = ({data}) => {
   
        
        

    return(
            <Container>
                {data.filter(({id}) => id)
                .map(({id, ...otherPostProps}) => (
                <Post key={id} id={id}
                  {...otherPostProps}
                 owner={otherPostProps.owner}
                 tags={otherPostProps.tags}
                 />
                 ))}
            </Container>
    )
 }
        


 export default Posts;