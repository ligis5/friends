import React from 'react';
import './post.css'
import LikeDislike from './LikeDislike'


const Post = ({id, owner, tags, text, likes, image, publishDate}) => {   



    return(
        <div className='main-post-div'>
            <div className='post'>
                <div className='post-author'>
                    <img alt='owner' src={owner.picture} heigth='auto' width='60px'  />
                    <h4>Posted by {owner.firstName + ' ' + owner.lastName}</h4>
                </div>
                {image && (<img alt='post' src={image} width='500' height='auto' />)}
                {!image && (<h1>Loading...</h1>)}
                <div className='post-text'>
                    <p style={{fontSize:'150%', textAlign:'center'}}>{text}</p>
                </div>  
                <div className='post-bottom'>
                    <div style={{display:'flex', gap:'10px', width:'min-content'}}>
                        {
                        tags.map(tag => <p key={tag}>{'#' + tag}</p>)}
                    </div>
                    <div >
                        <LikeDislike likes={likes}/>
                    </div>
                    <p>Date: {publishDate.substring(0,10)}</p>
                </div>
            </div>
        </div>
    )
}

export default Post;