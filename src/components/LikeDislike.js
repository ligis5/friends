import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';



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
        <div style={{display:'flex', gap:'10px'}}>
             <FontAwesomeIcon icon={faThumbsUp} color={color} 
                        onClick={likeButton}
                        className={color}
                        style={{marginTop:'20px', cursor:'pointer'}}/>
                    <p>Likes: {like}</p>
             <FontAwesomeIcon icon={faThumbsDown} color={color1}
                          onClick={dislikeButton}
                          style={{marginTop:'20px', cursor:'pointer'}} />
        </div>
    )
}
export default LikeDislike;