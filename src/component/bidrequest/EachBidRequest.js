import React, { useState } from 'react'
import AddBidModal from './AddBidModal';
import ProfilePng from '../../images/Profile.png';
import { IoMdClose } from "react-icons/io";
import darkjpg from '../../images/dark.jpg';
import { IoMdCheckmark } from "react-icons/io";
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EachBidRequest = ({BidObj, User, setUser, setReqCount, setBidsCount}) => {
   
     let lotid= BidObj[0];
     let bid= BidObj[1];
     let [modalOpen, setModalOpen] = useState(false);
     const RejectRequest= async(lotID, friendid)=>{
    
      const config = {headers: {'Content-Type': 'application/json'}};
      const {data}= await axios.post(`/api/v1/users/rejectbidrequest`,
        {
          friendid: friendid,
          lotID: lotID
        },
        config
      );
      console.log(data);
      if(data.user){
        localStorage.setItem(`user`, JSON.stringify(data.user));
        setUser(data.user);
        setReqCount(data.user.friendRequestsReceived);
        setBidsCount(Object.entries(data.user.bids).length);
      }
    }
     return(
     <div 
       key={lotid} 
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
             <img src= {(User.friends?.[bid.friendUser].avatar?.url)?(User.friends?.[bid.friendUser].avatar?.url):ProfilePng}
                   alt="profile_img" style={{height:'100%', width:"100%", objectFit:'cover'}}
                   className='border border-white'
                   />
             </div>
           </Col>

           <Col className='p-0 my-auto'> 
             <div className='card-header text-center'>
                 @<span className='text-capitalize'>{User.friends?.[bid.friendUser].name}'s Contribution</span>
             </div>
                 <hr className='m-0'/> 
             <div className='d-flex justify-content-between'>
                 <div className='mx-2' style={{fontSize:'0.8rem'}}>Quantity</div>
                 <div className='mx-3' style={{fontSize:'0.8rem'}}>Price</div>
             </div>
             <div className='d-flex justify-content-between'>
                 <div>{bid.contribution.quantity} quintals</div>
                 <div>{bid.contribution.price}/-</div>
             </div>
                 <hr className='m-0'/> 
             

             </Col>
       </Row>
       <Row className='w-100 mx-auto'>
             <div>
               <div style={{fontSize:'1.2rem', fontWeight:'bold'}}>Required</div>
               <div className='mx-2'>
                   <span>
                     <Link className='text-decoration-none' to={`/lot/${lotid}`}>Variety</Link>
                   </span>
                   : <span className='text-capitalize'>{bid.vegiName}</span>
               </div>
             </div>
             <div className='mx-2'>
                 Quantity: <span className='text-capitalize'>{bid.totalQuantity - bid.contribution.quantity} quintals</span>
             </div>
             <div className='my-1 p-0'>
               <Row className='d-flex w-100 mx-auto gap-1' style={{textShadow:'white 1px 0 10px'}}>
                   <Col style={{height:'100%'}} className='btn fw-bold p-0 bg-success'
                       onClick={()=>(setModalOpen(true))}>
                     Accept<IoMdCheckmark className='mb-1 fw-bold'/>
                   </Col>
                   <Col style={{height:'100%'}} className='btn fw-bold p-0 bg-danger'
                       onClick={()=>RejectRequest(lotid, bid.friendUser)}>
                     Reject<IoMdClose className='my-1 fw-bold'/>
                   </Col>
                  <AddBidModal friendid={bid.friendUser} modalOpen={modalOpen} setModalOpen={setModalOpen} lotId={lotid}/>
               </Row>
             </div>  
                   
       </Row>
     </div>
     )
   
}

export default EachBidRequest