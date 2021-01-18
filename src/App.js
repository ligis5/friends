import React,{useEffect, useState} from 'react';
import Posts from './components/Posts';
import './App.css';
import Header from './components/header';
import Waver from './components/waver';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Container, Row, Col} from 'react-bootstrap';






function App() {

  const BASE_URL = 'https://dummyapi.io/data/api';
  const APP_ID = '5feb30439db72cfa73c9166d';
  
      
      const [data, setData] = useState([]);
      const [pages, setPages] = useState(0);
      const [allPages, setAllPages] = useState();
      const [loading, setLoading] = useState(true);
      const [hasError, setHasError] = useState(false);
      const [bandau, setBandau] = useState([]);
      const [newData, setNewData] = useState();
      
  
      useEffect(() => {
          getData()
      }, [pages]);
          const getData = async () => {
              try{
                  const response = await fetch(`${BASE_URL}/post?page=${pages}`, { headers: { 'app-id': APP_ID } })
                  const x  = await response.json()
                  setAllPages(x.total / x.limit);
                  setData([...data ,...x.data])
                 setLoading(false)
              } catch {
                  setHasError(true);
              }
              
          }
       const nextPage = () =>{
           setPages(pages + 1)
        } ;
       
        const ErrorComponent = () => (<h1>Error</h1>)
          
  return ( 
    <Container fluid className='App'>
      <Row>
        <Col>
          <Header/>
        </Col>
      </Row>
        <Row>
        <Col className='waverCol'>
          {!loading &&
            <Waver loading={loading}/>
          }{
            loading && <h5>...Loading</h5>
          }
        </Col>
            <Col>
                  {!hasError && (
                <InfiniteScroll
                scrollThreshold={0.9}
                dataLength={data.length}
                next={nextPage}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                >
                    <div className='main'>
                        {!loading &&
                          <Posts
                            data={data}
                            page={pages}
                          />}
                          {loading && <h1>Loading...</h1>}
                    </div>
                    <button onClick={() => window.scrollTo(0, 0)}
                      style={{position: 'fixed', 
                      bottom:'0vw',
                      right: '0vw',
                      color:'whitesmoke',
                      backgroundColor: 'rgb(79,59,120)'
                    }}>Go Top</button>
                </InfiniteScroll>
              )}{hasError && <ErrorComponent></ErrorComponent>}
            </Col>
        </Row>
    </Container>         
  );
}

export default App;
