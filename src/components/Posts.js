
import React, {useMemo} from 'react';
import Post from './post';
import './posts.css';


 const Posts = ({data}) => {
   
        const memoizedData = useMemo(() => data.map(({id, ...otherPostProps}) => (
                <Post key={id} id={id}
                  {...otherPostProps}
                 owner={otherPostProps.owner}
                 tags={otherPostProps.tags}
                 />
                 )), [data])
        

    return(
            <div>
            <div className='posts'>   
                {memoizedData}
            </div>
            </div>
    )
 }
        


 export default Posts;