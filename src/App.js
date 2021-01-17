import React,{useEffect, useState, useMemo} from 'react';
import Posts from './components/Posts';
import './App.css';
import Header from './components/header';
import Waver from './components/waver';
import InfiniteScroll from 'react-infinite-scroll-component';






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
                  setBandau()
                 setLoading(false)
              } catch {
                  setHasError(true);
              }
              
          }
          
        
          console.log(data)

          
       const nextPage = () =>{
           setPages(pages + 1)
        } ;
       
        const memoizedData = useMemo(() => data.map(({owner, id}) => (
          <Waver key={id} owner={owner}/>
            )), [data])

          const ErrorComponent = () => (<h1>Error</h1>)
          
  return (
            
    <div className="App">
      <Header/>
        <div className='page'>
          <div className='people'>
            {memoizedData}
          </div>
                {!hasError && (
              <InfiniteScroll
              scrollThreshold={0.9}
              dataLength={data.length}
              next={nextPage}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              >
                  <div className='main'>
                    <div>
                      {!loading &&
                        <Posts
                          data={data}
                          page={pages}
                        />}
                        {loading && <h1>Loading...</h1>}
                    </div>
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
      </div>
    </div>
             
  );
}

export default App;
