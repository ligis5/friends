import React from 'react';
import LikeDislike from './LikeDislike';
import {Card} from 'react-bootstrap';


const Post = ({owner, tags, text, likes, image, publishDate}) => {   

    // {owner.picture}

    return(
        <Card className="text-center" 
        style={{ width: '40rem', marginTop:'20px' }}>
            <Card.Title style={{margin:'0'}}>
            Posted by {owner.firstName + ' ' + owner.lastName}
            </Card.Title>
           {image && ( <Card.Img variant="top" src={image} />)}
           {!image && (<h1>Loading...</h1>)}
            <Card.Body style={{padding:'0'}}>
                <Card.Title style={{marginTop:'20px',}}>
                    {text}
                </Card.Title>
                <Card.Body style={{display:'grid',
                 gridTemplateColumns:'repeat(3, auto)',
                 padding:'0',
                 marginTop:'70px',
                 justifyContent: 'space-between'
                 }}>
                        <Card.Body style={{display:'flex', padding:'0', paddingLeft:'10px'}}>
                        {
                        tags.map(tag => <p style={{margin:'0'}} key={tag}>{'#' + tag}</p>)}
                        </Card.Body>
                    <Card.Body style={{border:'none', padding:'0'}}>
                        <LikeDislike likes={likes}/>
                    </Card.Body>
                        <Card.Text style={{display:'flex', padding:'0', paddingRight:'10px'}}>
                            Date: {publishDate.substring(0,10)}
                        </Card.Text>
                </Card.Body>
            </Card.Body>
        </Card>          
    )
}

export default Post;