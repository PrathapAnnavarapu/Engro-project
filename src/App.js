import {lazy, Suspense} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
// import NewsItemDetails from './NewsItemDetails'
//import Home from './Home'
import './App.css';


const Home = lazy(() => import('./Home'));

function App() {
  return (
    <BrowserRouter>
    <Suspense fallback="...loading">
      <Switch>    
        <Route path="/" render={() => <Home/>}/>
      </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
