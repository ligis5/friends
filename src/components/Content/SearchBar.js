import React from 'react';
import { InputGroup, Button, FormControl } from "react-bootstrap";
import './SearchBar.css';

const SearchBar = () => {

    return(
        <InputGroup className="SearchBar"
         style={{
             maxWidth:'500px', minWidth:'250px', height:'60px', marginTop:'15px', display:'flex',
             flexWrap:'nowrap'
            }}
         >
            <FormControl
            style={{height:'60px',
             backgroundColor:'rgb(64, 52, 91)',
              color:'aliceblue',
              boxShadow:'2px 2px aliceblue'
            }}
            placeholder="Search by UserName"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
                <Button bsPrefix='searchButton'>Search</Button>
            </InputGroup.Append>
        </InputGroup>
    )
}


export default SearchBar;