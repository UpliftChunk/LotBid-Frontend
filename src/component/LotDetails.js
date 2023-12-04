import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import ProfilePng from '../images/Profile.png';
import DefaultVegi from '../images/DefaultVegi.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddBidModal from './AddBidModal';

const LotDetails = () => {
  const currentPage = window.location.href;
  const lot_id= (currentPage.split("lot/"))[1];

  let {user} = useOutletContext();
  let [Lot, setLot] = useState({});
  let [customer, setCustomer] = useState({});
  let [modalOpen, setModalOpen] = useState(false);
  let [isAuthenticated, setAuth] = useState(false);

  const defaultBid= 'd-flex card flex-row my-1 bg-light m-auto';
  const UserBid= 'd-flex card flex-row my-2 bg-warning m-auto';
 useEffect(() => {
    // make http get request
    // write side-effect only in use effect
    if(user._id) setAuth(true);
    async function getLot() {
      const {data} = await axios.get(`/api/v1/lot/${lot_id}`);
      if(data.lot){
        console.log(data);
        console.log(data.lot);
        setLot(data.lot);

        let cust = await axios.get(`/api/v1/customer/${data.lot.user}`);
        setCustomer(cust.data.user);
      }
    }
    getLot();
   },[lot_id,user, Lot.user, modalOpen, isAuthenticated] );

  return (
    <div>
      {
        customer &&
        <Row className='mt-4 border m-auto' style={{width:'70%'}}>
          {/* profile photo */}
          <Col xs={4} className='d-flex' >
            <div style={{height:"200px", width:"200px", marginLeft: "auto"}}>
              <img src= {customer.avatar?.url?(customer.avatar.url):ProfilePng}
                  alt="profile_img" style={{height:'100%', width:"100%", objectFit:'cover'}}
                  className='rounded-circle border border-dark'
                  />
            </div>
          </Col>
  
          {/* customer description */}
          
          <Col className='d-flex'>
            <div className='my-auto me-auto' style={{maxWidth:"600px"}}>
            <Row>
              <Col className='m-0 p-0'>
                <Card style={{minHeight:"200px"}}>
                  <Card.Header className='d-flex flex-row justify-content-between'>
                    <div>@{customer.name}</div>
                    <div style={{fontSize:"small", textTransform:"capitalize"}}>Location: {customer.location}</div>
                    </Card.Header>
                  <Card.Body>
                    <Card.Title>{Lot.description}</Card.Title>
                    <Card.Text>
                      Requirement: {Lot.vegi_name}
                      <div>
                        <div> 
                          Quantity: <span style={{fontWeight:"bold"}}>{Lot.quantity}</span> quintals
                        </div>
                      </div>
                    </Card.Text>
                    {
                      user.role==="farmer" &&
                      <div>
                        <div className='d-flex flex-row justify-content-around'>
                          <Button variant="success" onClick={()=>setModalOpen(true)}>Make Bid</Button>
                          <AddBidModal isAuthenticated={isAuthenticated} modalOpen={modalOpen} setModalOpen={setModalOpen} lotId={lot_id}/>
                        </div>
                      </div>
                    }
                  </Card.Body>
              </Card>
              </Col>
              <Col xs={4} className="m-0 p-0" style={{minHeight:"200px"}}>
                <div style={{width:'100%', height:'100%'}}>
                  <img src= {Lot.image? Lot.image: DefaultVegi}
                      alt="vegi_img" style={{width:'100%', height:'100%', objectFit:'cover', paddingRight:"2px"}}
                      />
                </div>
              </Col>
            </Row>

            </div>
          </Col>
          
          <hr className='mt-5'/>
          {
            Lot.numOfBids>0 ?
              <div>
                <div className='display-6 text-center mb-5'>
                  Current Bids: {Lot.numOfBids}
                </div>
                <div className='row w-50 m-auto user-select-none mb-4'>
                {
                  Lot.bids.map(bid=>
                    <div className={bid.user === user._id? UserBid: defaultBid}  key={bid._id} 
                      title={user.role==="customer"?(`phone Number: ${bid.phoneNumber}`):""}>
                      <div className='row rounded w-100 p-2'>
                        <div className='col'>Name:  {bid.name} </div>
                        <div className='col-3'>Price: {bid.price} </div>
                        <div className='col'>Location: {bid.location}  </div>
                      </div>
                    </div>
                  )
                }
                </div>
              </div>
            :
            <div className='display-6 text-center mb-5'>
                {user.role==="farmer"?
                `Be the first person to Bid this Lot`
                :
                `You have no Bids currently`
                }
            </div>
              
          }
  
        </Row>
      }
    </div>
  )
}

export default LotDetails