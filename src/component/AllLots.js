import './AllLots.css';
import React, { useEffect, useState } from 'react'
import { useOutletContext, Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import AddLotModal from './AddLotModal';
import DefaultVegi from '../images/DefaultVegi.jpg';

const AllLots = () => {
  let {user} = useOutletContext();
  console.log(user.role);

  let [Lots, setLots] = useState([]);
  let [modalOpen, setModalOpen] = useState(false);

 useEffect(() => {
    // make http get request
    // write side effect only in use effect
    let link;
    if(user.role==="farmer") link ="/api/v1/lots";
    else link ="/api/v1/customer/lots";
    
    console.log(link);
    async function getLots() {
        const {data} = await axios.get(link);
        if(data.lots){
          console.log(data);
          console.log(data.lots);
          setLots(data.lots);
        }
    }
    getLots();

   },[user, modalOpen])


  return (
    <div>
      <div className=' m-5 d-flex' id='container'
        style={{position:"relative"}}
        >
        <div className='display-6 text-center text-decoration-underline m-auto'>
          {user.role==="customer"? ("Your Lots"): ("Featured Lots")}
        </div>

          {
            user.role==="customer" &&
            <div className='d-flex'>
              <Button className='fs-4 p-0 m-auto' onClick={()=>setModalOpen(true)}>Add Lot</Button>
              <AddLotModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
            </div>
          }
      </div>
      {
          (
            <div className='d-flex flex-column'>

              {/* Lot Cards */}
              <div>
                {Lots?
                  (
                    <div className="row justify-content-center text-black my-3 mx-0">
                      {
                        Lots.map(lotObj=>
                        <div className="col col-sm-5 col-md-4 col-lg-3 col-xl-2 mb-4 mx-2" key={lotObj._id}> 
                          <div className='MyProd mx-auto card border-dark'>
                          <Link className="text-decoration-none position-relative text-dark" to={`/lot/${lotObj._id}`}
                              defaultValue={`/lot/${lotObj._id}`} readOnly> 
                            <div className="ProdPhoto">
                              <img src={lotObj.image? lotObj.image : DefaultVegi} alt='Card ImageTop' 
                                   style={{width:"100%", height:"100%" ,objectFit:"cover", borderRadius:"5px 5px 0px 0px"}}
                                   />
                            </div>
                            <div className='fs-6 fw-bold p-2 OneLine text-center' style={{width:'100%'}}> 
                              <span>Require: </span>
                              {lotObj.vegi_name}
                            </div>

                                
                            <div className='text-danger fw-bold px-2 text-center'>
                              <span>Quantity: </span>
                              {lotObj.quantity} quintals 
                            </div> 

                            <div className='text-end footer px-2'>
                              number of bids: {lotObj.numOfBids}
                            </div>
                          </Link>
                            
                          </div> 
                        </div>)
                      }
                    </div>
                  )
                  :
                  (
                    <div>
                      No Lots Online
                    </div>
                  ) 
                }
              </div>
              
            </div>
          )
      }
      
      <div>

      </div>

    </div>
  )
}

export default AllLots