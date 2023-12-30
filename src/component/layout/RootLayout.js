import React, { useEffect, useState } from 'react'
import Navbar from './RootNavbar.js';
import Footer from './RootFooter.js';
import { Outlet } from 'react-router-dom';

function RootLayout() {  
   let [isAuthenticated, setAuth] = useState(false);
   let [user, setUser] = useState({role: 'farmer'});
   let [loading, setLoading] = useState(true);
   useEffect( () => {
    // console.log(localStorage.getItem('user'));
    if(localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')));
      setAuth(true);
      setLoading(false);
    }
    else {
      setUser({role: 'farmer', friends: {}});
      setLoading(false);
    }
  },[isAuthenticated])
   
  return (
    <div>
    {
        (loading===false) &&
        <div className='d-flex flex-column' style={{minHeight:"100vh"}}>
            <div>
              <Navbar isAuthenticated={isAuthenticated} user={user} setAuth={setAuth}/>
            </div>

            {/* dynamic content */}
            <div className='d-flex' style={{flexGrow:"1"}}>
              <div className='w-100 m-auto'>
                <Outlet context={{isAuthenticated, setUser, user, setAuth}} />
              </div>
            </div>

            {/* constant */}
            <div >
              <Footer/>
            </div>
        </div>
      
    }
    </div>
  )
}

export default RootLayout