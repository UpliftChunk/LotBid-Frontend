import axios from 'axios';
import React, {useEffect} from 'react'
import {useForm} from 'react-hook-form';
import {useNavigate, useOutletContext } from 'react-router-dom';

const labelStyle = "text-end border-bottom border-dark w-100 mb-1";
const inputStyle = "form-control  border-top-0  border-dark";

const Register = () => {
   // navigate hook
   let navigate= useNavigate();
   let {isAuthenticated, setAuth} = useOutletContext();
   let {
      register,
      handleSubmit,
      formState: {errors}
   } = useForm();
  

   let addNewUser = (newUser) => {
      async function postUser() {
         newUser.avatar =await newUser.avatar[0];
         console.log(newUser);
         
         const config = {headers: {'Content-Type': 'multipart/form-data'}};
         const {data} = await axios.post( 
            `/api/v1/register`, 
            newUser, 
            config
         );

         console.log(data);
         if(data.user){
            localStorage.setItem(`user`, JSON.stringify(data.user));
            localStorage.setItem(`isAuthenticated`, JSON.stringify(true));
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
                        {/* location */}
                        <div className="mb-3">
                           <label className={labelStyle} htmlFor='location'>Location</label>
                           
                           <input type="text" id="location" className={inputStyle} 
                              {...register("location", {required: true})}/>
         
                           {/* validation errors for location */}
                        {errors.location?.type==="required" && 
                           <p className='text-danger'>*location is required</p>
                        }
                        </div>
                        {/* phoneNumber */}
                        <div className="mb-3">
                           <label className={labelStyle} htmlFor='phoneNumber'>Phone Number</label>
                           
                           <input type="number" id="phoneNumber" className={inputStyle} 
                              {...register("phoneNumber", {required: true})}/>
         
                           {/* validation errors for phoneNumber */}
                        {errors.phoneNumber?.type==="required" && 
                           <p className='text-danger'>*Phone Number is required</p>
                        }
                        </div>
                        {/* role */}
                        <div className="mb-3">
                           <label className={labelStyle} htmlFor='role'>Role</label>
                           
                           <select id="role" className="form-control" {...register("role", {required: true})} 
                              defaultValue={"Choose"}>
                              <option disabled>Choose...</option>
                              <option>farmer</option>
                              <option>customer</option>
                           </select>
         
                           {/* validation errors for role */}
                        {errors.role?.type==="required" && 
                           <p className='text-danger'>*Role is required</p>
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