import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form';
import { useNavigate, useOutletContext } from 'react-router-dom';
import ForgotPassword from './ForgotPassword.js';
import axios from 'axios';

const labelStyle = "text-end border-bottom border-dark w-100 mb-1";
const inputStyle = "form-control  border-top-0  border-dark";

const Login = () => {
   // navigate hook
   let navigate= useNavigate();
   let {isAuthenticated, setAuth} = useOutletContext();
   // user form hook
   let {
      register,
      handleSubmit,
      formState: {errors}
   } = useForm();
  let [Error, setError]= useState(null);

   let loginCurrentUser = (CurUser) => {
      // dispatch(login(CurUser.email, CurUser.password));
      async function postUser() {
         let data, err;
         const config = {headers: {'Content-Type': 'application/json'}};
         await axios.post( 
            `/api/v1/login`, 
            CurUser, 
            config
         ).then((response)=> {console.log(response);data = response.data})
         .catch(({response})=> {console.log(response);err = response.data.message} );
         if(err){
            setError(err);
            return;
         }
         console.log(data);
         if(data.user){
            localStorage.setItem(`user`, JSON.stringify(data.user));
            localStorage.setItem(`isAuthenticated`, JSON.stringify(true));
            setError(null);
            setAuth(true);
         }  
      }

      postUser();
   }

   useEffect(()=>{
      if(isAuthenticated) 
         navigate(`/`);
      
   }, [navigate, isAuthenticated]);

  return (
   <div>
         <div>
            {/* Login form */}
            <div className='p-2'>
               <div className='text-center display-5'>Login User</div>
               {
                  Error &&
                  <div className='mb-3 text-danger fs-5 text-center fw-bold text-decoration-underline font-monospace'
                     style={{textShadow:'1px 0 10px crimson'}}>{Error}</div>
               }
               
               {/* responsive form */}
            <div className='row'>
               <div className='col-11 col-sm-8 col-md-5 col-lg-3 mx-auto'>
                  
                  <form onSubmit={handleSubmit(loginCurrentUser)}>
                     {/* email */}
                     <div className="mb-3">
                        <label className={labelStyle} htmlFor='LoginEmail'>Email</label>
                        
                        <input type="email" id="LoginEmail" className={inputStyle} 
                           {...register("email", {required: true})}/>

                        {errors.email?.type==="required" && 
                           <p className='text-danger'>*email is required</p>
                        }
                     </div>
                     {/* password */}
                     <div className="mb-3">
                        <label className={labelStyle} htmlFor='password'>Password</label>
                        
                        <input type="password" id="password" className={inputStyle} 
                           {...register("password", {required: true})}/>

                        {errors.password?.type==="required" && 
                           <p className='text-danger'>*password is required</p>
                        }
                     </div>

                     {/*Submit button */}
                     <div className='d-flex'>
                        <div>
                           <ForgotPassword/>
                        </div>
                        <button type='submit' className='btn btn-success ms-auto'>Login</button>
                     </div>
                  </form>
               </div>
            </div>

            </div>
         </div>

   </div>   
  )
}

export default Login