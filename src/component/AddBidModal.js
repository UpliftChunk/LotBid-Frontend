import axios from 'axios';
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

function AddBidModal({isAuthenticated, modalOpen, setModalOpen, lotId, setError, setUser}) {
  console.log(modalOpen, lotId); 
  const handleClose = () => setModalOpen(false);
  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm();


  let addBid = (BidDetails) =>{
    if(!isAuthenticated)
      return navigate('/account/login?message:Please_Login_to_Bid_a_Lot');

    BidDetails.lotId= lotId;
    console.log(BidDetails);
    async function postBid() {
      let data, err;
      const config = {headers: {'Content-Type': 'application/json'}};
      await axios.post( 
         `/api/v1/lot/bid`, 
         BidDetails, 
         config
      ).then((response)=> data= response.data).catch(({response})=>{
        err=(response.data.message)
        console.log('hi error');
      });
      if(err){
        setError(err);
        reset();
        setModalOpen(false);
        return;
      }
      if(data.user){
        localStorage.setItem(`user`, JSON.stringify(data.user));
        setUser(data.user);
      }
      setError(null);
      console.log(BidDetails);
      reset();
      setModalOpen(false);
    }

    postBid();
  }

   return (
        <Modal show={modalOpen} onHide={handleClose}>
              <Modal.Body className="modal-body">
                <Modal.Header  className="card-title heading fw-bold fs-6 lh-sm">Bid for the Lot</Modal.Header>
                <hr className="m-0" />
                {/* list */}
                <Modal.Body className="fs-5">
                  <form onSubmit={handleSubmit(addBid)}>

                      <label htmlFor="price">Price</label>
                         <input type="number" className="form-control" id="price" placeholder="in rupees" 
                         {...register("price", {required: true})}/>

                      {errors.price?.type==="required" && 
                              <p className='text-danger'>*price is required</p>
                      }

                      <label htmlFor="description">Description</label>
                      <input type="text" className="form-control" id="description" placeholder="Describe your crop quality" 
                        {...register("description", {required: true})}/>
                      {errors.description?.type==="required" && 
                              <p className='text-danger'>*description is required</p>
                      }

                      {/* button */}
                      <Modal.Footer className="d-flex justify-content-around mt-3">
                        <button type='button' className="btn rounded-pill text-white btn-secondary" onClick={handleClose} >cancel</button>
                        <button type='submit' className="btn rounded-pill text-white btn-success">Confirm Bid</button>
                      </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal.Body>
            
        </Modal>
    );
}

export default AddBidModal