import React, { useEffect, useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import axios from 'axios';
import ProfilePng from '../images/Profile.png';
import DefaultVegi from '../images/DefaultVegi.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddBidModal from './AddBidModal';
import AddDuoBidModal from './AddDuoBidModal';

const LotDetails = () => {
  const currentPage = window.location.href;
  const lot_id= (currentPage.split("lot/"))[1];

  let {setUser, user, isAuthenticated} = useOutletContext();
  let [Lot, setLot] = useState({});
  let [customer, setCustomer] = useState({});
  let [soloModalOpen, setSoloModalOpen] = useState(false);
  let [duoModalOpen, setDuoModalOpen] = useState(false);
  let [Error, setError] = useState(null);

  const defaultBid= 'd-flex card my-1 bg-light';
  const UserBid= 'd-flex card my-2 bg-warning';
 useEffect(() => {
    // make http get request
    // write side-effect only in use effect

    async function getLot() {
      let data;
      await axios.get(`/api/v1/lot/${lot_id}`).then((response)=>data= response.data)
      .catch(error=>{
        console.log(error);
        setError(error.response.data.message);
        console.log('hi error');
        return;
      })
      if(data.lot){
        console.log(data);
        // console.log(data.lot);
        setLot(data.lot);
        let cust = await axios.get(`/api/v1/customer/${data.lot.user}`);
        setCustomer(cust.data.user);
      }
    }
    getLot();
   },[ lot_id, user, Lot.user, soloModalOpen, duoModalOpen, isAuthenticated] );

  return (
    <div>
      {
        Error &&
        <div 
            className='mb-3 text-danger fs-5 text-center fw-bold text-decoration-underline font-monospace'
            style={{textShadow:'1px 0 10px crimson'}}>{Error}</div>
      }
      {
        customer &&
        <div>
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
          
          <Col xs={3} className='d-flex' >
            <div className='my-auto me-auto'>
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
                      <div className='w-50 ' >
                          { user.bids?.[lot_id]===undefined ?
                        <div className='d-flex flex-row'>

                          { (user?.friends)!==undefined && <>
                            <Button  variant="success" onClick={()=>setDuoModalOpen(true)}>Partner bid</Button>
                            <AddDuoBidModal modalOpen={duoModalOpen} setModalOpen={setDuoModalOpen} lotId={lot_id} quantity={Lot.quantity} setError={setError} setUser={setUser}/>
                            </>}
                          <Button className='ms-auto' variant="success" onClick={()=>setSoloModalOpen(true)}>Make Solo Bid</Button>
                          <AddBidModal isAuthenticated={isAuthenticated} modalOpen={soloModalOpen} setModalOpen={setSoloModalOpen} lotId={lot_id} setError={setError} setUser={setUser}/>
                        </div>
                        :
                        <div className='text-center bg-info fs-5'>
                          Your Bid is listed
                        </div>
                          }
                      </div>
                    }
                    {user.role==='customer' &&
                        <div className=''>

                          <Button variant="success" className='w-50'>
                            <Link className='text-decoration-none text-white' to={`/payment`} >Make Payment</Link>
                          </Button>
                          <Button className='w-50 ms-auto' onClick={()=>{setSoloModalOpen(!soloModalOpen)}}>
                            {!soloModalOpen? 'Make Refund': 'Processing'}
                          </Button>

                        </div>}
                  </Card.Body>
              </Card>
              </Col>
            </Row>
                    
            </div>
          </Col>
          
          <Col xs={3} className="m-0 p-0" style={{minHeight:"200px"}}>
                <div style={{width:'100%', height:'100%'}}>
                  <img src= {Lot.image? Lot.image: DefaultVegi}
                      alt="vegi_img" style={{width:'100%', height:'100%', objectFit:'cover', paddingRight:"2px"}}
                      />
                </div>
              </Col>
        </Row>
          <hr className='mt-5'/>
          {
            Lot.numOfBids>0 ?
              <div>
                <div className='display-6 text-center mb-5'>
                  Current Bids: {Lot.numOfBids}
                </div>
                <div className='row w-50 m-auto user-select-none mb-4'>
                {
                  Lot.bids.map((bid, key)=>{
                      let user1= bid['users']?.[0];
                      let user2= bid['users']?.[1];

                      let price=  +bid[user1]?.price;
                      if(user2) price+= +bid[user2]?.price;
                      console.log(user1, user2, bid);
                      return(
                      <div key={key} className='w-100 mx-auto'>
                        <div className={(bid[user._id])? UserBid: defaultBid} >
                          <div className='card-header d-flex flex-row justify-content-between w-100 p-2 fs-5'>
                            <div >@{bid[user1].name} {user2 && <>& @{bid[user2].name}</>} </div>
                            <div className='fw-bold'>Price: {price}</div>
                          </div>
                          <div className='card border border-dark' style={{fontSize:'0.8rem'}}
                              title={user.role==="customer"?(`phone Number: ${bid[user1].phoneNumber}`):""}>
                            {user2 && <div className='d-flex flex-row justify-content-between mx-2'>
                              <div>@{bid[user1].name}</div>
                              <div>Location: {bid[user1].location}</div>
                            </div>}
                            <hr className='m-0'/>
                            <div className='row w-100 mx-auto'>
                              <div className='col mx-3'>{bid[user1].description}</div>
                              {!user2 && <div className='col-3'>Location: {bid[user1].location}</div>}
                            </div>
                          </div>
                          {
                            user2 &&
                            <div className='card border border-dark' style={{fontSize:'0.8rem'}}
                              title={user.role==="customer"?(`phone Number: ${bid[user2].phoneNumber}`):""}>
                            <div className='d-flex flex-row justify-content-between mx-2'>
                              <div>@{bid[user2].name}</div>
                              <div>Location: {bid[user2].location}</div>
                            </div>
                            <hr className='m-0'/>
                            <div className='row w-100 mx-auto'>
                              <div className='mx-3'>{bid[user2].description}</div>
                            </div>
                          </div>
                          }
                        </div>
                      </div>
                      )
                    }
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
        </div>
      }
    </div>
  )
}

export default LotDetails