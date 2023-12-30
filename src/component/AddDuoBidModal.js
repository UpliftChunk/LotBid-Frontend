import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { useForm } from 'react-hook-form';

function AddDuoBidModal({modalOpen, setModalOpen, lotId, quantity, setError}) {
  // console.log(modalOpen, lotId); 
  const handleClose = () => setModalOpen(false);
  const [User, setUser] = useState({});
  const [inert, setInert] = useState(false)
  let {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
    reset
  } = useForm();


  const addBid = (BidDetails) =>{

    BidDetails.lotID= lotId;
    BidDetails.totalQuantity= quantity;
    console.log(BidDetails);
    async function postPartnerBid() {
      let data, err;
      const config = {headers: {'Content-Type': 'application/json'}};
      await axios.post( 
         `/api/v1/users/addbidrequest`, 
         BidDetails, 
         config
      ).then((response)=> {data = response.data})
      .catch(({response})=>{
        // console.log(response);
        err = response.data.message;
      });
      if(err){
        setError(err);
        setModalOpen(false);
        setInert(true);
        return;
      }
      setError(null);
      if(data?.user){
        localStorage.setItem(`user`, JSON.stringify(data.user));
        setUser(data.user);
      }
      reset();
      setModalOpen(false);
      setInert(true);
    }

    postPartnerBid();
  }
  
  const cancelBidRequest = () =>{
    async function cancelPartnerBid() {
      const {data} = await axios.get(`/api/v1/users/cancelbidrequest/${lotId}`);
      console.log(data);
      if(data.user){
        localStorage.setItem(`user`, JSON.stringify(data.user));
        setUser(data.user);
      }
      reset();
      setModalOpen(false);
      setInert(false); 
    }
    
    cancelPartnerBid();
    
  }
  useEffect(() => {
    const getUser= async()=>{
      const {data} = await axios.get('/api/v1/me');
      if(!data.user) return;
      setUser(data.user);
      if(data.user?.bidRequests?.sent?.[lotId]){
        let BidDetails = data.user.bidRequests?.sent?.[lotId];
        setValue('price', BidDetails.contribution.price);
        setValue('quantity', BidDetails.contribution.quantity);
        setValue('description', BidDetails.contribution.description);
        setValue('friendid', BidDetails.friendUser);
        setInert(true); 
      } 
      else {
       reset();
       setInert(false);
      }
    }
    getUser();

  }, [lotId, setValue, reset, inert]);
  
   return (
        <Modal show={modalOpen} onHide={handleClose}>
              <Modal.Body className="modal-body">
                <Modal.Header className="card-title heading fw-bold fs-6 lh-sm">Make a Partnership Bid request</Modal.Header>
                <hr className="m-0" />
                {/* list */}
                <Modal.Body className="fs-5">
                  <form onSubmit={handleSubmit(addBid)}>
                    <fieldset disabled={inert}>
                      <label htmlFor="friendid">Pick a friend</label>
                      <select id="friendid" className="form-control" {...register("friendid", {required: true})} 
                        defaultValue={"Choose"}>
                          {
                            User.friends && 
                            Object.entries(User?.friends).map((friendObj)=>{
                              let friendid = friendObj[0];
                              let friend = friendObj[1];
                              return(
                                <option key={friendid} value={friendid}>{friend.name}</option>
                              )
                            })
                          } 
                      </select> 

                     <div className='text-center fs-4'>My Contribution</div>
                     <hr className='m-0'/>
                     <Row>
                        <Col>
                           <label htmlFor="quantity">Quantity</label>
                              <input type="number" className="form-control" id="quantity" placeholder="in quintals" 
                              {...register("quantity", {required: true,
                                validate: {
                                  positive: v => parseInt(v) > 0,
                                  lessThanReq: v => parseInt(v) < quantity
                                }
                              }
                              )}/>

                           {errors.quantity?.type==="required" && 
                                    <p className='text-danger'>*quantity is required</p>
                           }
                           {(errors.quantity?.type==="lessThanReq" || errors.quantity?.type==='positive') && 
                                    <p className='text-danger'>*quantity is out of limit</p>
                           }
                        </Col>
                        <Col>
                           <label htmlFor="price">Price</label>
                              <input type="number" className="form-control" id="price" placeholder="in rupees" 
                              {...register("price", {required: true})}/>

                           {errors.price?.type==="required" && 
                                    <p className='text-danger'>*price is required</p>
                           }
                        </Col>
                     </Row>

                      <label htmlFor="description">Description</label>
                      <input type="text" className="form-control" id="description" placeholder="Describe your crop quality" 
                        {...register("description", {required: true})}/>
                      {errors.description?.type==="required" && 
                              <p className='text-danger'>*description is required</p>
                      }

                      {/* button */}
                      {
                        !inert && <>
                        <Modal.Footer className="d-flex justify-content-around mt-3">
                          <button type='button' className="btn rounded-pill text-white btn-secondary" onClick={handleClose} >cancel</button>
                          <button type='submit' className="btn rounded-pill text-white btn-success">Make Bid Request</button>
                        </Modal.Footer>
                        </>
                      }
                    </fieldset>
                  </form>

                </Modal.Body>
                {
                  inert && <>
                  <Modal.Footer className="d-flex justify-content-around mt-3">
                    <button type='button' className="btn rounded-pill text-white btn-secondary" onClick={handleClose} >close</button>
                    <button type='submit' 
                            className="btn rounded-pill text-white btn-danger"
                            onClick={cancelBidRequest}
                            >
                      Cancel Bid Request
                    </button>
                  </Modal.Footer>
                  </>
                }
              </Modal.Body>
            
        </Modal>
    );
}

export default AddDuoBidModal