import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ProfilePng from '../../images/Profile.png';
import tangjpg from '../../images/tang.jpg';
import darkjpg from '../../images/dark.jpg';
import greyjpg from '../../images/grey.jpg';
import bluejpg from '../../images/blue.jpg';
import Col from 'react-bootstrap/esm/Col';
import { IoSearch } from "react-icons/io5";
import { FaUserCheck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Row from 'react-bootstrap/esm/Row';


const SearchBar = ({User, setUser}) => {
   const [searchText, setSearchText] = useState('');
   const [searchedUser, setSearchedUser] = useState(null);
   const [cardsDesgin, setCardsDesgin] = useState([1,2,3,4]);
   const [Error, setError] = useState(null);

   const backgroundImage= [
      tangjpg, darkjpg, greyjpg, bluejpg
   ]
   const color= ['white', 'white', 'white', 'white'];
   const randomColor= useCallback((key) => {
      const images= backgroundImage.length;
      return (Math.floor(Math.random() * images* key)) %images;
   },[backgroundImage.length])
   console.log(searchedUser);
   const Search = useCallback(async()=>{
      console.log('Searching...', searchText);
      if(!searchText){
         setError(null);
         return;
      } 
      let link=`/api/v1/users?name=${searchText}`
      
      let data, err;
      await axios.get(link).then((response)=> data= response.data)
      .catch(({response})=>{
        err= response.data;
        console.log('hi error', err);
      })
      if(err){
         setError(err.message);
         return;
      } 
      setSearchedUser(data.user);
      setError(null);
      let i=[];
      await data.user.map((user, key)=> i.push(randomColor(key+1)));
      console.log(i);

      setCardsDesgin(i);

   }, [searchText, randomColor] )

   useEffect(() => {
     const delay = 1000;
     const debounce = setTimeout(Search, delay)
     return () => {
       clearTimeout(debounce);
     }
     
   },[searchText, Search])
   
   const sendFriendRequest= (id) => {
      
      async function postfriendRequest() {
         
         const {data} = await axios.get(`/api/v1/users/add/${id}`);

         // console.log(data);
         if(data.user){
            localStorage.setItem(`user`, JSON.stringify(data.user));
            setUser(data.user);
         }  
      }

      postfriendRequest();
   }
   const cancelFriendRequest= (id) => {
      
      async function postCancelfriendRequest() {
         
         const {data} = await axios.get(`/api/v1/users/cancel/${id}`);

         // console.log(data);
         if(data.user){
            localStorage.setItem(`user`, JSON.stringify(data.user));
            setUser(data.user);
         }  
      }

      postCancelfriendRequest();
   }
  return (
   <div>
      { User &&
    <div >
      
      <div className="px-2 py-1 bg-light rounded rounded-pill mx-auto my-2" style={{width: '25vw'}}>
         <div>
            <div className="input-group">
               <input type="search" 
                        placeholder="Search with username"
                        className="form-control border-0 bg-light shadow-none"
                        onChange={(e)=>{setSearchText(e.target.value)}}
                        onKeyDown={(e)=>{if(e.key==='Enter') Search()}}/>
               <IoSearch className="input-group-append fs-5 text-dark my-auto"
                        onMouseOver={({target})=>target.style.color="blue"}
                        onMouseOut={({target})=>target.style.color="black"}
                        onClick={Search}
                        style={{cursor:'pointer'}}/>
            </div>
         </div>
      </div>

      <div className='d-flex flex-wrap justify-content-center' style={{maxWidth:'60vw'}}>
         {
            Error &&
            <div 
               className='mb-3 text-danger fs-5 text-center fw-bold text-decoration-underline font-monospace'
               style={{textShadow:'1px 0 10px crimson'}}>{Error}</div>
         }
         {
            searchText && !Error && 
            searchedUser?.map((user, key)=>
            {
               return(
               <div key={key} 
                    style={{
                     width: '320px',
                     backgroundImage: `url(${backgroundImage[cardsDesgin[key]]})`,
                     color: `${color[cardsDesgin[key]]}`,
                     textShadow: 'black 1px 0px 5px',
                     backgroundSize: 'cover',
                     boxShadow: 'white 1px 0px 5px'
                    }}
                    className='card p-2 m-2'
                    >
                     <Row className='px-2'>
                        {/* profile photo */}
                        <Col xs={4} className='d-flex m-0 p-0' >
                           <div style={{height:"100px", width:"100px"}}>
                           <img src= {(user.avatar?.url)?(user.avatar.url):ProfilePng}
                                 alt="profile_img" style={{height:'100%', width:"100%", objectFit:'cover'}}
                                 className='rounded-circle border border-white'
                                 />
                           </div>
                        </Col>
  
                        <Col className='p-0 my-auto'> 
                           <div>
                              name: <span className='text-capitalize'>{user.name}</span>
                           </div>
                           <div>
                              location: <span className='text-capitalize'>{user.location}</span>
                           </div>
                           <button className='btn btn-success border w-100 border-dark p-0'>
                              {
                                (User.friends[user._id])?(
                                 <div>
                                    <FaUserCheck className='mb-1'/> friends
                                 </div>
                                ):(
                                 <div>
                                    {
                                    (User.connectionRequests?.sent[user._id] || User.connectionRequests?.received[user._id])?(
                                       User.connectionRequests.sent[user._id]?
                                       (
                                       <Row className='d-flex w-100 mx-auto'>
                                          <Col style={{fontSize:'0.8rem'}} className='my-auto'>
                                             FRIEND REQUEST SENT
                                          </Col>
                                          <Col lg={2} style={{height:'100%'}} className='btn p-0 bg-danger'
                                               onClick={()=>cancelFriendRequest(user._id)}>
                                            <IoMdClose className='my-1'/>
                                          </Col>
                                       </Row>
                                       ):(
                                          <div style={{cursor:'help'}} 
                                               title='Check your friend requests section'>Friend Request Received</div>
                                       )
                                       ):(
                                          <div onClick={()=>sendFriendRequest(user._id)}>
                                             friend request
                                          </div>
                                       )
                                    }
                                 </div>
                                 )
                              }
                           </button>
                        </Col>
                     </Row>
               </div>
               )
            }
            )
         }
      </div>
    </div>
      }
   </div>
  )
}

export default SearchBar