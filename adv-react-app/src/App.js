import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home  from './pages/Home'
import {Navigation} from './Navigation'
import Heading from './Heading';
import { Footer } from './Footer';
import About from './pages/About';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';
import Loader from './pages/Loader';



function App() {
  return (
      <BrowserRouter>
        <Heading company="Bank of America"/>
        <Navigation />
     <div className="container routeholder">
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/about"  element={<About/>} />
          <Route path="users"  element={<Users/>} >
            <Route path=":id" element={<UserDetails/>}/>
          </Route>
          <Route path="lazy"  element={<Loader/>} ></Route>
        
          
      
        </Routes>
        <Footer/>
        </div>

    </BrowserRouter>
  );
}

export default App;
