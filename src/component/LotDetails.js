import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from 'axios';
import ProfilePng from '../images/Profile.png';
import DefaultVegi from '../images/DefaultVegi.jpg';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const LotDetails = () => {
  const currentPage = window.location.href;
  const lot_id= (currentPage.split("lot/"))[1];

  let user = useOutletContext();

  let [Lot, setLot] = useState({});
  let [customer, setCustomer] = useState({});

 useEffect(() => {
    // make http get request
    // write side-effect only in use effect
    async function getLot() {
      const {data} = await axios.get(`http://localhost:4000/api/v1/lot/${lot_id}`);
      if(data.lot){
        console.log(data);
        console.log(data.lot);
        setLot(data.lot);

            let cust = await axios.get(`/api/v1/customer/${data.lot.user}`);
            setCustomer(cust.data.user);
      }
    }
    getLot();
   },[lot_id, Lot.user, user] );

  return (
    <div>
      {
        customer &&
        <Row className='mt-4 border m-auto' style={{width:'70%'}}>
          {/* profile photo */}
          <Col xs={4} className='d-flex'>
              <img src= {(customer.avatar)?(customer.avatar.url):ProfilePng}
                  alt="profile_img" style={{height:'230px', objectFit:'cover'}}
                  className='rounded-circle ms-auto border border-dark'/>
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
                      <div className='d-flex flex-row justify-content-around'>
                        <Button variant="success">Make Bid</Button>
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
          
          <hr className='my-5'/>
          {
            Lot.numOfBids>0 ?
              <div>
                <div className='display-6 text-center my-5'>
                  Current Bids: {Lot.numOfBids}
                </div>
                <div className='row w-50 m-auto'>
                {
                  Lot.bids.map(bid=>
                    <div className='d-flex card flex-row m-1 bg-light m-auto'  key={bid._id}>
                      <div className='d-flex justify-content-between flex-row p-1 rounded w-75 '>
                        <div>name:  {bid.name} </div>
                        <div>price: {bid.price} </div>
                        <div>location: {bid.location}  </div>
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