import React from 'react';




const ShowHide = ({ children, inputFunction, ...rest }) => {

 return (
     <div style={{marginLeft:'5px'}}>
         {rest.show ? children : 'hidden'}
    </div>
 )
}

export default ShowHide;