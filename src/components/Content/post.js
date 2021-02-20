import React, {useState} from 'react';
import LikeDislike from './LikeDislike';
import {Card} from 'react-bootstrap';
import { Link, Route } from "react-router-dom";
import { useData } from '../FirebaseComponents/firebaseFunctionsFiles';
import ReactPlayer from 'react-player/lazy';




const Post = ({postData}) => {   

    const [postImage, setPostImage] = useState();
    const { storageRef } = useData();
    const {postPhoto, aboutPost, createdAt, video } = postData;

   const publishDate = createdAt.toDate().toDateString();

   if(postPhoto){
    storageRef
              .child(postPhoto)
              .getDownloadURL()
              .then((url) => {
                setPostImage(url);
              });
   }

   
   
    return(
        <Card className="text-center" 
        style={{ maxWidth:'600px',minWidth:'400px', marginTop:'20px', color:'aliceblue'}}>
            {/* <Card.Title style={{margin:'0'}}>
                    <Image src={owner.picture} roundedCircle
                    style={{
                        maxWidth:'60px',
                        maxHeight:'60', 
                        position:'absolute', 
                        left:'0'
                    , boxShadow:'5px 2px 2px 1px rgb(56, 41, 84)'}}/>
                Posted by {owner.firstName + ' ' + owner.lastName}
            </Card.Title> */}
            {postImage ? <Card.Img variant="top" src={postImage}/> : <></>}
            {video ? <ReactPlayer controls={true} width='598px' url={video}/> : <></>}
            
            <Card.Body style={{padding:'0'}}>
                <Card.Title style={{marginTop:'20px',}}>
                    {aboutPost}
                </Card.Title>
                <Card.Body style={{display:'grid',
                 gridTemplateColumns:'repeat(3, auto)',
                 padding:'0',
                 marginTop:'70px',
                 justifyContent: 'space-between'
                 }}>
                    {/* <Card.Body style={{border:'none', padding:'0'}}>
                        <LikeDislike likes={likes}/>
                    </Card.Body> */}
                        <Card.Text style={{display:'flex', padding:'0', paddingRight:'10px'}}>
                            Date: {publishDate.substring(4)}
                        </Card.Text>
                </Card.Body>
            </Card.Body>
        </Card>          
    )
}

export default Post;