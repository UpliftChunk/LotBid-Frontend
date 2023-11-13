import React, {useEffect, useState} from 'react'
import { Link, Outlet, useNavigate, useOutletContext } from 'react-router-dom';
const LoginRegister = () => {
   // navigate hook
   let navigate= useNavigate();
   let {isAuthenticated, setAuth} = useOutletContext();
   let currentPage = window.location.href;
   const [active, setActive] = useState("");
   useEffect(()=>{
      const redirect = "/user/account"; 

      if(isAuthenticated){
         return navigate(redirect);
      }
      else if(currentPage.includes("register")){
         setActive("Register");
      }
      else{
         setActive("Login");
         return navigate("login");
      }
   },[currentPage, navigate, isAuthenticated]);
  return (
    <div>
      <div className='d-flex flex-row justify-content-center gap-3 fs-6 nav nav-tabs w-75 mx-auto mt-1'>
         <Link 
            className={active==="Login"?
               'fs-4 nav-link active text-warning':'my-auto nav-link lead text-secondary'} to="login"
            onClick={(e)=>setActive("Login")}>
            Login
         </Link>
         <Link 
            className={active==="Register"?
               'fs-4 nav-link active text-warning':'my-auto nav-link lead text-secondary'} to="register"
            onClick={(e)=>setActive("Register")}>
            Register
         </Link>
      </div>
      <div className='container-fluid' style={{minHeight:"60vh"}}>
         <div className='d-flex flex-column'>
            <Outlet context={{isAuthenticated, setAuth}}/>
         </div>
      </div>

    </div>
  )
}

export default LoginRegister