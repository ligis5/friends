import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye, faEdit, faCheck, faBan } from "@fortawesome/free-solid-svg-icons";
import {Container} from 'react-bootstrap';
import ShowHide from "./ShowHide";
import { useData } from '../FirebaseComponents/firebaseFunctionsFiles';




const AboutMe = ({value, name}) => {

  

    const [show, setShow] = useState(true);
    const [edit, setEdit] = useState(true);
    const inputValue = useRef('');
    const { updateUserProfile, userData } = useData();
    const [data, setData] = useState({[name]: value});
    const [upload, setUpload] = useState(false);

    const x = userData;
const y = Object.assign(x, data);


useEffect( async () => {
  await updateUserProfile(y)
  setUpload(false)
}, [upload]);

    const onOff = () => {
        setShow(show ? false : true)
    }
const editAboutMe = () => {
    setEdit(edit ? false : true)
}


const confirmEdit =  () => {
        setEdit(true);
        setData({[name]: inputValue.current.value})
        setUpload(true);
}
const cancelEdit = () => {
    setEdit(true);
}



  

    return(
        <Container style={{display:'flex', marginTop:'10px', paddingRight:'0'}}>
        <div style={{display:'flex'}}>{name}
        :
        <ShowHide show={show}>{edit ? value : <input style={{color:'aliceblue'}} ref={inputValue} />}</ShowHide></div>
              <div style={{width:'max-content'}}
               className="aboutMe-buttonGroup">
                   {edit ?
                   <>
                       <button className="aboutMe-button">
                       <FontAwesomeIcon
                         className="awesomeAbout"
                         icon={faEdit}
                         color="aliceblue"
                         onClick={editAboutMe}
                       />
                     </button>
                     <button
                       className="aboutMe-button"
                       id="onOff1"
                       onClick={onOff}
                     >
                       <FontAwesomeIcon
                         className="awesomeAbout"
                         icon={ show ? faEye : faEyeSlash }
                         color="aliceblue"
                       />
                     </button>
                    </>
                    :
                    <>
                       <button className="aboutMe-button">
                       <FontAwesomeIcon
                         className="awesomeAbout"
                         icon={faCheck}
                         color="aliceblue"
                         onClick={confirmEdit}
                       />
                     </button>
                     <button
                       className="aboutMe-button"
                       id="onOff1"
                     >
                       <FontAwesomeIcon
                         className="awesomeAbout"
                         icon={ faBan }
                         color="aliceblue"
                         onClick={cancelEdit}
                       />
                     </button>
                    </>
                   }
                
              </div>
        </Container>
    )
}

export default AboutMe;