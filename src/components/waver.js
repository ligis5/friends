import React,{useState, useEffect} from 'react';
import './waver.css';
import {ListGroup} from 'react-bootstrap';

const Waver = ({loading}) => {

     const BASE_URL = 'https://dummyapi.io/data/api/user';
     const APP_ID = '5feb30439db72cfa73c9166d';

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
    

    console.log(pages)
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