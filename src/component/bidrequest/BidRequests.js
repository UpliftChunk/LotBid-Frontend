import React, { useEffect, useState } from 'react';
import FriendsBackground from '../../images/FriendsBackground.jpg';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import greyjpg from '../../images/grey.jpg';
import DefaultVegiImg from '../../images/DefaultVegi.jpg';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import axios from 'axios';
import EachBidRequest from './EachBidRequest';
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




const BidRequests = () => {

  let {isAuthenticated} = useOutletContext();
  let [User, setUser] = useState(null);
  // let count = signal(0);
  let [reqCount, setReqCount] = useState(0);
  let [bidsCount, setBidsCount] = useState(0);
  let [loading, setLoading] = useState(true);
  // let modalOpen = signal(false);
  // navigate hook
  let navigate= useNavigate();

  console.log(User);

  

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
        setBidsCount(Object.entries(data.user.bids).length);
        setReqCount(Object.entries(data.user.bidRequests.received).length);
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

              

              {/* Bid Requests */}
              <div>

                <div className='fs-5 d-flex' style={{minWidth: '50vw'}}>
                  Bid Requests
                  <Badge className='mt-auto' style={{transform:'scale(0.6)'}}>
                    {reqCount}
                  </Badge>
                  {
                    reqCount===0 && <div className='fs-6 my-auto ms-auto lead'>No Bid Requests</div>
                  }
                </div>
                <hr className='mt-0'/>
                {/* bid Requests list */}
                <div className='d-flex flex-wrap justify-content-center' style={{maxWidth:'60vw'}}>
                  {
                      reqCount>0 && 
                      Object.entries(User?.bidRequests.received).map((BidObj)=>
                      <EachBidRequest BidObj={BidObj} key={BidObj[0]} User={User} setUser={setUser} setBidsCount={setBidsCount} setReqCount={setReqCount}/>
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
                    bidsCount===0 && <div className='fs-6 my-auto ms-auto lead'>No Bids</div>
                  }
                </div>
                <hr className='mt-0'/>
                {/* Current bids list */}
                <div className='d-flex flex-wrap justify-content-center' style={{maxWidth:'60vw'}}>
                  {
                      bidsCount>0 && 
                      Object.entries(User?.bids).map((bidObj)=>
                      {
                        let lotid = bidObj[0];
                        let bid   = bidObj[1];
                        console.log(lotid);
                        return(
                        <Link
                          to={`/lot/${lotid}`} 
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
                              {/* profile photo */}
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

export default BidRequests