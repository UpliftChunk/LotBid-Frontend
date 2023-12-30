import React, { useEffect, useState } from 'react';
import FriendsBackground from '../images/FriendsBackground.jpg';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import greyjpg from '../images/grey.jpg';
import DefaultVegiImg from '../images/DefaultVegi.jpg';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
// import { signal } from "@preact/signals-react";



  // const AcceptRequest= async(lotID, friendid)=>{
    
  //   const config = {headers: {'Content-Type': 'application/json'}};
  //   const {data}= await axios.post(`/api/v1/users/rejectbidrequest`,
  //     {
  //       friendid: friendid,
  //       lotID: lotID
  //     },
  //     config
  //   );
  //   console.log(data);
  //   if(data.user){
  //     localStorage.setItem(`user`, JSON.stringify(data.user));
  //     setUser(data.user);
  //     setReqCount(data.user.friendRequestsReceived);
  //     setBidsCount(Object.entries(data.user.bids).length);
  //   }
  // }




const Deals = () => {

  let {isAuthenticated} = useOutletContext();
  let [User, setUser] = useState(null);
  // let count = signal(0);
  let [loading, setLoading] = useState(true);
  // let modalOpen = signal(false);
  // navigate hook
  let navigate= useNavigate();

  useEffect(() =>{
    const func= async()=>{
      if(localStorage.getItem('user')) {
        const user = await JSON.parse(localStorage.getItem('user'));
        setUser(user);
        const {data} = await axios.get('/api/v1/me'); 
        if(data.user!== user){
          localStorage.setItem(`user`, JSON.stringify(data.user));
          setUser(data.user);
        }
        setLoading(false);
      }
      else {
          return navigate('/');
      }
    }
    func();
  },[isAuthenticated, navigate]); 

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

              {/*Current bids section*/}
              <div>
                <div className='fs-5 d-flex' style={{minWidth: '50vw'}}>
                  My Deals
                  <Badge className='mt-auto' style={{transform:'scale(0.6)'}}>
                    {User.dealsClosed}
                  </Badge>
                  {
                    User.dealsClosed===0 && <div className='fs-6 my-auto ms-auto lead'>No Deals Closed</div>
                  }
                </div>
                <hr className='mt-0'/>
                {/* Current bids list */}
                <div className='d-flex flex-wrap justify-content-center' style={{maxWidth:'60vw'}}>
                  {
                      User.dealsClosed>0 && 
                      Object.entries(User?.deals).map((bidObj)=>
                      {
                        let lotid = bidObj[0];
                        let bid   = bidObj[1];
                        return(
                        <Link
                          to={`/lot/${lotid}`} 
                          key={lotid}
                          style={{
                          width: '290px',
                          backgroundImage: `url(${greyjpg})`,
                          color: `white`,
                          textShadow: 'black 1px 0px 5px',
                          backgroundSize: 'cover',
                          boxShadow: 'white 1px 0px 5px'
                          }}
                          className='card p-2 m-2 text-decoration-none'
                              >
                          <Row className='px-2'>
                              {/* vegi photo */}
                              <Col xs={5} className='d-flex m-0 p-0' >
                                <div style={{height:"100px", width:"100px"}}>
                                <img src= {(bid?.image)?(bid.image):DefaultVegiImg}
                                      alt="vegi_img" style={{height:'100%', width:"100%", objectFit:'cover'}}
                                      className='rounded border border-white'
                                      />
                                </div>
                              </Col>
        
                              <Col className='px-0 my-auto pe-none'> 
                                <div className='d-flex text-center flex-column'>
                                    <div style={{fontSize:'0.8rem'}}>Vegitable</div>
                                    <hr className='border border-white m-0'/> 
                                    <div className='text-capitalize'>{bid.vegiName}</div>
                                </div>
                                    <hr className='m-0'/> 
                                <div className='d-flex justify-content-between'>
                                    <div className='mt-1 mx-2' style={{fontSize:'0.8rem'}}>Quantity</div>
                                    <div className='mt-1 mx-1 px-1 rounded-pill bg-primary' style={{fontSize:'0.8rem'}}>Amount</div>
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <div>{bid.quantity} quintals</div>
                                    <div>{bid.price}/-</div>
                                </div>
                                    <hr className='m-0'/> 
                              </Col>
                          </Row>
                        </Link>
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

export default Deals