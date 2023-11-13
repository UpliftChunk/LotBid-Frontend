import React, {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form';
import {useNavigate } from 'react-router-dom';

const labelStyle = "text-end border-bottom border-dark w-100 mb-1";
const inputStyle = "form-control  border-top-0  border-dark";

const Register = () => {
   // navigate hook
   let navigate= useNavigate();
   // user form hook
   const [isAuthenticated, setIsAuthenticated] = useState(false)
   let {
      register,
      handleSubmit,
      formState: {errors}
   } = useForm();
  

   let addNewUser = (newUser) => {
      newUser.avatar = newUser.avatar[0];

      setIsAuthenticated(true);
   }

   
   useEffect(()=>{
      if(isAuthenticated) 
         navigate(`/user/account`);
   }, [navigate, isAuthenticated]);

  return (
    <div>
            <div>
               {/* Register form */}
               <div className='p-2'>
                  <div className='text-center display-5'>Register User</div>
                  
                  {/* responsive form */}
               <div className='row'>
                  <div className='col-11 col-sm-8 col-md-5 col-lg-3 mx-auto'>
                     
                     <form onSubmit={handleSubmit(addNewUser)}>
                        {/* name */}
                        <div className="mb-3">
                           <label className={labelStyle} htmlFor='name'>Name</label>
                           
                           <input type="text" id="name" className={inputStyle} 
                              {...register("name", {required: true})}/>
         
                           {/* validation errors for name */}
                        {errors.name?.type==="required" && 
                           <p className='text-danger'>*name is required</p>
                        }
                        </div>
                        {/* email */}
                        <div className="mb-3">
                           <label className={labelStyle} htmlFor='email'>Email</label>
                           
                           <input type="email" id="email" className={inputStyle} 
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
                        {/* image url */}
                        <div className="mb-3">
                           <label className={labelStyle} htmlFor='Image'>Profile photo</label>
                           
                           <input type="file" id="Image" className={inputStyle} 
                              {...register("avatar")}/>
                        </div>
                        {/*Submit button */}
                        <div className='d-flex'>
                           <button type='submit' className='btn btn-success ms-auto'>Register</button>
                        </div>
                     </form>
                  </div>
               </div>
         
               </div>
            </div>
      
    </div>
  )
}

export default Register