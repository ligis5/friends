import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import {Card} from 'react-bootstrap';




const LikeDislike = ({likes}) => {

    const [like, setLike] = useState(likes);
    const [color, setColor] = useState('white')
    const [color1, setColor1] = useState('white')

    const likeButton = () => {
        if(like === likes) {
        setLike(like + 1)
        setColor('green')
        setColor1('white')
        } else if(like < likes){
            setLike(like + 1)
            setColor('white')
            setColor1('white')
        }
    }
    const dislikeButton = () => {
        if(like === likes){
        setLike(like - 1)
        setColor1('red')
        setColor('white')
        }else if(like > likes){
            setLike(like - 1)
            setColor1('white')
            setColor('white')
        }
    }

    return(
        <Card.Text as='div' style={{display:'flex', gap:'10px'}}>
             <FontAwesomeIcon icon={faThumbsUp} color={color} 
                        onClick={likeButton}
                        />
                    <h6>Likes: {like}</h6>
             <FontAwesomeIcon icon={faThumbsDown} color={color1}
                          onClick={dislikeButton}
                           />
        </Card.Text>
    )
}
export default LikeDislike;