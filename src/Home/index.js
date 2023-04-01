/* eslint-disable import/no-extraneous-dependencies */
//import {lazy} from 'react'
import {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import InfiniteScroll from 'react-infinite-scroll-component'
// import Loader from 'react-loader-spinner'

import { AiOutlineSearch } from "react-icons/ai";import './index.css'


const apiStatusContants = {
   initial : 'INITIAL',
   inProgress :'INPROGRESS',
   success:'SUCCESS'
}

const Home = () => {
  const [apiStatus, setApiStatus] = useState('')
  const [news, setNews] = useState([])
  const [userInformation, setUserInformation] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [searchItem, setSearchItem] = useState('')


  //const elementRef = useRef([])
  //console.log(visibleItems)

  const setFailureView = () => (
    <div className="failure-view">
      <img
        src="https://bl-i.thgim.com/public/news/1p8ycp/article65608331.ece/alternates/FREE_1200/BL07_Goldstone%20Technologies.jpg"
        alt="failure view"
        className="failure"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button">Retry</button>
    </div>
  )  


 const newsFetch = (userIdArray)=> {
  console.log(news)
  let newsLength; 
  let userIdArrayLength;
   if(news){
    newsLength = news.length
  }
  if(userIdArray){
    userIdArrayLength = userIdArray.length
  } 
  console.log(newsLength)
  console.log(userIdArrayLength)
  if (newsLength < userIdArrayLength){     
    for(let i= news.length; i < (news.length + 10); i++){
        const url = `https://hacker-news.firebaseio.com/v0/item/${userIdArray[i]}.json?print=pretty`
        const options = {
            headers: {
            // authorization:`Bearer ${jwtToken}`,
            'Content-type': 'application/json'
            }, 
            method: 'GET'             
        }
          fetch(url, options)
            .then((res) => res.json())                
            .then((items) => {
                let newObject ={
                  uniqueId:uuidv4(),
                  ...items
              }                
              setNews((newsData) => [...newsData, newObject])
              setApiStatus('success')
              console.log(apiStatus)                                    
            })            
            .catch(() => {    
            setFailureView()
            })
        }
}else{
  setHasMore(false)
}
 }


 
  const projectsApiUrl = () => {
    setApiStatus('....inProgress')
    console.log(apiStatus)    
    let userIdArray = [];
    // const jwtToken = Cookies.get("jwt_token")
    const url = ' https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    const options = {
      headers: {
        // authorization:`Bearer ${jwtToken}`,
        'Content-type': 'application/json'
      }, 
      method: 'GET'            
    }
    fetch(url, options)
      .then(res => res.json())
      .then((data) => {        
          userIdArray = data
          newsFetch(userIdArray, news)
          setUserInformation(data)       
        })
      .catch(() => {
        setFailureView()
      })
}

 useEffect(() => {    
     projectsApiUrl() 
    }, []); 
    
 

  const emptyView = () =>{
    return(
      <>
      <h1>News Not Found</h1>
      <p>Please Search With another Category</p>
      <button type="button" onClick={projectsApiUrl}>Retry</button>
      <p></p>
      </>
    )

  }

  
  
  return (
    <>    
      <div className="container">
        <nav className="header-containe">
          <img
            src="https://cdn.pixabay.com/photo/2019/10/21/12/01/newspapers-4565916__340.jpg"
            className="imge"
            alt="website logo"
          />
          <div className='heading'>
             <h1>Daily News</h1>
          </div>
          <div className='search-container'>
            <input type="search" className='searchBar'placeholder='Search..' value={searchItem} onChange={(e)=>setSearchItem(e.target.value)}/>
            <button type="button" onClick={() => setNews(news.filter((eachNews)=>eachNews.title.toLowerCase().includes(searchItem.toLowerCase())))} ><AiOutlineSearch/></button>
            </div>        
        </nav>
        <ul className='list'>          
          <InfiniteScroll dataLength={news.length} pullDownToRefreshThreshold={50} next={()=>newsFetch(userInformation)} hasMore={hasMore} loader={<p>Loading...</p>}>
            {news.length >= 0 ?
            (news.map((each, index)=> {
              return (
                < >
                  <li className="list-item" key={index}>
                    <div className='title'>
                      <h6 >by: {each.by}</h6>
                      <h3 >{each.title}</h3>
                      <h3> Type: {each.type}</h3>
                    </div>
                    <div>
                    <a href={each.url} target="_blank" rel="noreferrer" className="navigation">Read More</a>
                    </div>
                  </li>
                </>           
              )          
            })) :emptyView()} 
          </InfiniteScroll>      
        </ul> 
    </div>
    </>
  )
}

export default Home













 /* function onIntersection(entries){
    const firstEntry = entries[0]
    if (firstEntry.isIntersecting && hasMore){
        setVisibleItems((prevVisibleItems) => [
        ...prevVisibleItems,
        ...news.slice(prevVisibleItems.length, prevVisibleItems.length + 10),
      ]);
    }             
 
}   */  


 /* useEffect(()=>{    
      const observer = new IntersectionObserver((entries)=>{
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prevVisibleItems) => [
                ...prevVisibleItems,
                ...news.slice(prevVisibleItems.length, prevVisibleItems.length + 10),
              ]);
            }
          });
        }, { threshold: 0.5 });           
        elementRef.current.forEach((item) => {
          observer.observe(item);
        });
        return ()=>{
          if (observer){
            observer.disconnect()
          }
        }
  },[]) */