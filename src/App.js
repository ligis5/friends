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
import {auth} from './components/firebase';






function App({history, location}) {

  const BASE_URL = 'https://dummyapi.io/data/api';
  const APP_ID = '6006be3b574d117434a0f7c3';
  

      const [data, setData] = useState([]);
      const [pages, setPages] = useState(0);
      const [loading, setLoading] = useState(true);
      const [hasError, setHasError] = useState(false);
      const [isLogin, setIsLogin] = useState(false);
      const [currentUser, setCurrentUser] = useState(null);
      
  

      useEffect(() => {
          getData();
          afterLogin();
          return {
            
          }
      }, [pages, isLogin]);
          const getData = async () => {
              try{
                  const response = await fetch(`${BASE_URL}/post?page=${pages}`, { headers: { 'app-id': APP_ID } })
                  const x  = await response.json()
                    setData([...data ,...x.data])
                 setLoading(false);
              } catch(error) {
                  setHasError(true);
                  console.log(error);
              }
              
          }
          console.log(currentUser)
          console.log(isLogin)
          
          const afterLogin = () => {
            if(isLogin === true) {
              history.push('/')
            }else if(isLogin === false){
              history.push('/login')
            }
          }
          const onAuthStateChanged = () => {
            auth.onAuthStateChanged( user => {
              setCurrentUser(user);
                if(currentUser){
                  loginTrue();
                }
                else{
                 setIsLogin(false)
                } 
              })
          }
          

       const nextPage = () =>{
           setPages(pages + 1);
        };
        const ErrorComponent = () => (<h1>Error</h1>);

        const loginTrue = () => {
          setIsLogin(true)
      }
      

      const googleSignOut = () => {
        auth.signOut();
       }

  return ( 
    <Container fluid className='App'>
      <Row>
        <Col>
          <Header
          isLogin={isLogin} 
           location={location.pathname}
           googleSignOut={googleSignOut}
           />
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
          <Login loginTrue={loginTrue} isLogin={isLogin}
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
