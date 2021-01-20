import React,{useState, useEffect} from 'react';
import './waver.css';
import {ListGroup} from 'react-bootstrap';

const Waver = ({loading, APP_ID}) => {

     const BASE_URL = 'https://dummyapi.io/data/api/user';

     const [pages, setPages] = useState(0);
     const [data, setData] = useState([]);
     const [hasError, setHasError] = useState(false);
     const [waverLoading, setWaverLoading] = useState(true);

     useEffect(() => {
         getData();
    }, [pages]);

   
    const getData = async () => {
        try{
            const response = await fetch(`${BASE_URL}?page=${pages}`, { headers: { 'app-id': APP_ID } })
            const x  = await response.json();
           await setData(x.data);
           await setWaverLoading(false);
        } catch {
            setHasError(true);
        }
    }

    const randomNumber = () => {
        const y = Math.floor(Math.random() * 6);
        setPages(y);
    }
    

    return (
        <div>
            {!loading === true && !waverLoading === true ? (
                <ListGroup bsPrefix='waverGroup'  >
                {data.map(({firstName, picture, id}) => (
                <ListGroup.Item key={id} bsPrefix='waver'><img alt='person' src={picture}
                 width='auto' height='50px'/>
                    <p>{firstName}</p>
                </ListGroup.Item>
            ))}
            </ListGroup>
            ) : (
                <h1>...Loading</h1>
            ) 
            } 
        </div>  
    )
}

export default Waver;