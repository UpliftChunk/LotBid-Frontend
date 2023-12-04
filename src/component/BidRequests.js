import React, { useCallback, useEffect, useState } from 'react';
import FriendsBackground from '../images/FriendsBackground.jpg';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import darkjpg from '../images/dark.jpg';
import greyjpg from '../images/grey.jpg';
import DefaultVegiImg from '../images/DefaultVegi.jpg';
import { IoMdClose } from "react-icons/io";
import { IoMdCheckmark } from "react-icons/io";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
const BidRequests = () => {

  let {isAuthenticated} = useOutletContext();
  let [User, setUser] = useState(null);
  // let count = signal(0);
  let [reqCount, setReqCount] = useState(0);
  let [bidsCount, setBidsCount] = useState(0);
  let [loading, setLoading] = useState(true);
  // navigate hook
  let navigate= useNavigate();

  console.log(User);

  const handleRequest= async(id, status)=>{
    console.log(id, status);
    const {data}= await axios.get(`/api/v1/users/connection?id=${id}&status=${status}`);
    console.log(data);
    if(data.user){
      localStorage.setItem(`user`, JSON.stringify(data.user));
      setUser(data.user);
      setReqCount(data.user.friendRequestsReceived);
      setBidsCount(Object.entries(data.user.bids).length);
    }
  }

  const setFriendRequestsCount = useCallback(()=>{
    if(User?.friendRequestsReceived) setReqCount(User.friendRequestsReceived);
  },[User?.friendRequestsReceived])

  useEffect(() =>{
    const func= async()=>{
      if(localStorage.getItem('user')) {
        const user = await JSON.parse(localStorage.getItem('user'));
        setUser(user);
        setFriendRequestsCount();
        setBidsCount(Object.entries(user.bids).length);
        const {data} = await axios.get('/api/v1/me'); 
        if(data.user!== user){
          localStorage.setItem(`user`, JSON.stringify(data.user));
          setUser(user);
        }

        setLoading(false);
      }
      else {
          return navigate('/');
      }
    }
    func();
  },[isAuthenticated, setFriendRequestsCount, navigate]); 
  return (
    <div>
      {
      !loading &&
        <div 
          style={{
            backgroundImage:`url(${FriendsBackground})`,
            minHeight: '60vh',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            color: 'white',
            }}
          className='d-flex '
          >
            <div className='d-flex flex-column align-items-center flex-grow-1'
                style={{backdropFilter:'blur(4px)'}}>

              

              {/* FriendRequests */}
              <div>

                <div className='fs-5 d-flex' style={{minWidth: '50vw'}}>
                  Bid Requests
                  <Badge className='mt-auto' style={{transform:'scale(0.6)'}}>
                    {reqCount}
                  </Badge>
                  {
                    reqCount===0 && <div className='fs-6 my-auto ms-auto lead'>No Friend Requests</div>
                  }
                </div>
                <hr className='mt-0'/>
                {/* bid Requests list */}
                <div className='d-flex flex-wrap justify-content-center' style={{maxWidth:'60vw'}}>
                  {
                      reqCount>0 && 
                      Object.entries(User?.connectionRequests.received).map((UserObj)=>
                      {
                        let key= UserObj[0];
                        let user= UserObj[1];
                        console.log(key);
                        return(
                        <div key={key} 
                          style={{
                          width: '320px',
                          backgroundImage: `url(${darkjpg})`,
                          color: `white`,
                          textShadow: 'black 1px 0px 5px',
                          backgroundSize: 'cover',
                          boxShadow: 'white 1px 0px 5px'
                          }}
                          className='card p-2 m-2'
                              >
                          <Row className='px-2'>
                              {/* lot image */}
                              <Col xs={4} className='d-flex m-0 p-0' >
                                <div style={{height:"100px", width:"100px"}}>
                                <img src= {(user.avatar?.url)?(user.avatar.url):DefaultVegiImg}
                                      alt="profile_img" style={{height:'100%', width:"100%", objectFit:'cover'}}
                                      className='border border-white'
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
                                <div className='my-1 p-0'>
                                  <Row className='d-flex w-100 mx-auto' style={{textShadow:'white 1px 0 10px'}}>
                                      <Col style={{height:'100%'}} className='btn fw-bold p-0 bg-success'
                                          onClick={()=>handleRequest(key, 'Accepted')}>
                                        Accept<IoMdCheckmark className='mb-1 fw-bold'/>
                                      </Col>
                                      <Col style={{height:'100%'}} className='btn fw-bold p-0 bg-danger'
                                          onClick={()=>handleRequest(key, 'Rejected')}>
                                        Reject<IoMdClose className='my-1 fw-bold'/>
                                      </Col>
                                  </Row>
                                </div>
                              </Col>
                          </Row>
                        </div>
                        )
                      }
                      )
                  }
                  
                </div>

              </div>

              {/*Current bids section*/}
              <div>
                <div className='fs-5 d-flex' style={{minWidth: '50vw'}}>
                  My Bids
                  <Badge className='mt-auto' style={{transform:'scale(0.6)'}}>
                    {bidsCount}
                  </Badge>
                  {
                    bidsCount===0 && <div className='fs-6 my-auto ms-auto lead'>No Friends</div>
                  }
                </div>
                <hr className='mt-0'/>
                {/* Current friends list */}
                <div className='d-flex flex-wrap justify-content-center' style={{maxWidth:'60vw'}}>
                  {
                      bidsCount>0 && 
                      Object.entries(User?.bids).map((bidObj)=>
                      {
                        let lotid = bidObj[0];
                        let bid   = bidObj[1];
                        console.log(lotid);
                        return(
                        <div key={lotid} 
                          style={{
                          width: '290px',
                          backgroundImage: `url(${greyjpg})`,
                          color: `white`,
                          textShadow: 'black 1px 0px 5px',
                          backgroundSize: 'cover',
                          boxShadow: 'white 1px 0px 5px'
                          }}
                          className='card p-2 m-2'
                              >
                          <Row className='px-2'>
                              {/* profile photo */}
                              <Col xs={5} className='d-flex m-0 p-0' >
                                <div style={{height:"100px", width:"100px"}}>
                                <img src= {(bid?.avatar?.url)?(bid.avatar.url):DefaultVegiImg}
                                      alt="vegi_img" style={{height:'100%', width:"100%", objectFit:'cover'}}
                                      className='rounded border border-white'
                                      />
                                </div>
                              </Col>
        
                              <Col className='px-0 my-auto'> 
                                <div className='d-flex text-center flex-column'>
                                    <div style={{fontSize:'0.8rem'}}>Vegitable</div>
                                    <hr className='border border-white m-0'/> 
                                    <div className='text-capitalize'>{bid.vegiName}</div>
                                </div>
                                    <hr className='m-0'/> 
                                <div className='d-flex justify-content-between'>
                                    <div className='mx-2' style={{fontSize:'0.8rem'}}>Quantity</div>
                                    <div className='mx-3' style={{fontSize:'0.8rem'}}>Price</div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div>{bid.quantity} quintals</div>
                                    <div>{bid.price}/-</div>
                                </div>
                                    <hr className='m-0'/> 
                              </Col>
                          </Row>
                        </div>
                        )
                      }
                      )
                  }
                  
                </div>
              </div>
            </div>
        </div>
      }
    </div>
  )
}

export default BidRequests