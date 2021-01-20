import React,{useEffect, useState} from 'react';
import Posts from './components/Posts';
import './App.css';
import Header from './components/header';
import Waver from './components/waver';
import {Container, Row, Col} from 'react-bootstrap';
import { withRouter,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';







function App({history, location}) {

  const BASE_URL = 'https://dummyapi.io/data/api';
  const APP_ID = '6006be3b574d117434a0f7c3';
  

      const [data, setData] = useState([]);
      const [pages, setPages] = useState(0);
      const [loading, setLoading] = useState(true);
      const [hasError, setHasError] = useState(false);
      const [isLogin, setIsLogin] = useState(false);
      
  
      useEffect(() => {
        afterLogin();
          getData();
      }, [pages, isLogin]);
          const getData = async () => {
              try{
                  const response = await fetch(`${BASE_URL}/post?page=${pages}`, { headers: { 'app-id': APP_ID } })
                  const x  = await response.json()
                    setData([...data ,...x.data])
                 setLoading(false);
              } catch {
                  setHasError(true);
              }
              
          }
          const confirmLogin = () => {
            setIsLogin(true);
          }

       const nextPage = () =>{
           setPages(pages + 1);
        };
        const ErrorComponent = () => (<h1>Error</h1>);

        const afterLogin = () => {
          if(isLogin === true) {
            history.push('/')
          }else{
            history.push('/login')
          }
        }
        const signOut = () => {
          setIsLogin(true);
        }


  return ( 
    <Container fluid className='App'>
      <Row>
        <Col>
          <Header 
           location={location.pathname}
           loading={loading} 
           isLogin={isLogin}
           signOut={signOut}/>
        </Col>
      </Row>
      <Switch>
        <Route exact path='/'>
          <Row>
          <Col lg='3' className='waverCol'>
            {!loading &&
              <Waver loading={loading} APP_ID={APP_ID}/>
            }{
              loading && <h5>...Loading</h5>
            }
          </Col>
              <Col style={{padding:'0'}}>
                    {!hasError && (
                  <Container style={{padding:'0'}}>
                      <Container className='main' style={{padding:'0'}}>
                          {!loading &&
                            <Posts
                              isLogin={isLogin}
                              data={data}
                              nextPage={nextPage}
                            />}
                            {loading && <h1>Loading...</h1>}
                      </Container>
                      <button onClick={() => window.scrollTo(0, 0)}
                        style={{position: 'fixed', 
                        bottom:'0vw',
                        right: '0vw',
                        color:'whitesmoke',
                        backgroundColor: 'rgb(79,59,120)'
                      }}>Go Top</button>
                  </Container>
                )}{hasError && <ErrorComponent>Error</ErrorComponent>}
              </Col>
          </Row>
        </Route>
        <Route exact path='/login'>
          <Login 
          confirmLogin={confirmLogin}
          afterLogin={afterLogin}
          />
        </Route>
        <Route exact path='/register'>
          <Register/>
        </Route>
    </Switch>
    </Container>         
  );
}

export default withRouter(App);
