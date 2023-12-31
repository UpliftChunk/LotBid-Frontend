import axios from 'axios';
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'; 

function AddLotModal({modalOpen, setModalOpen}) {
   console.log(modalOpen);
  const handleClose = () => setModalOpen(false);
  let {
    register,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm();


  let addLot = (LotDetails) =>{
    console.log(LotDetails);
    async function postLot() {
         
      const config = {headers: {'Content-Type': 'application/json'}};
      const {data}= await axios.post( 
         `/api/v1/customer/lot/new`, 
         LotDetails, 
         config
      );
      if(data.user)
        localStorage.setItem(`user`, JSON.stringify(data.user));
        
      reset();
      setModalOpen(false);
    }

    postLot();
  }

   return (
        <Modal show={modalOpen} onHide={handleClose}>
              <Modal.Body className="modal-body">
                <Modal.Header  className="card-title heading fw-bold fs-6 lh-sm">Add Lot for auction</Modal.Header>
                <hr className="m-0" />
                {/* list */}
                <Modal.Body className="fs-5">
                  <form onSubmit={handleSubmit(addLot)}>
                      <label htmlFor="vegi_name">Food Variety</label>
                      <select id="vegi_name" className="form-control" {...register("vegi_name", {required: true})} 
                        defaultValue={"Choose"}>
                        <option disabled>Choose...</option>
                        <option>Tomato</option>
                        <option>Potato</option>
                        <option>Brinjal</option>
                        <option>Carrot</option>
                        <option>BeetRoot</option>
                        <option>Mango</option>
                        <option>Orange</option>
                      </select>
                      {errors.vegi_name?.type==="required" && 
                              <p className='text-danger'>*vegitable variety is required</p>
                      }

                      <label htmlFor="quantity">Quantity</label>
                      <input type="number" className="form-control" id="quantity" placeholder="in quintals" {...register("quantity", {required: true, validate: {
                                  lessThanReq: v => parseInt(v) > 9
                                }})}/>             

                      {errors.quantity?.type==="required" && 
                              <p className='text-danger'>*quantity is required</p>
                      }
                      {errors.quantity?.type==="lessThanReq" && 
                              <p className='text-danger'>*quantity should be atleast 10 quintals</p>
                      }

                      <label htmlFor="description">Description</label>
                      <input type="text" className="form-control" id="description" placeholder="Brief your requirement" {...register("description", {required: true})}/>
                      {errors.description?.type==="required" && 
                              <p className='text-danger'>*description is required</p>
                      }

                      <label htmlFor="inputphoto">photo</label>
                      <input type="text" className="form-control" id="inputphoto" placeholder="place url" {...register("image")}/>
                      {/* button */}
                      <Modal.Footer className="d-flex justify-content-around mt-3">
                        <button type='button' className="btn rounded-pill text-white btn-secondary" onClick={handleClose} >cancel</button>
                        <button type='submit' className="btn rounded-pill text-white btn-success">Confirm Lot</button>
                      </Modal.Footer>
                  </form>
                </Modal.Body>
              </Modal.Body>
            
        </Modal>
    );
}

export default AddLotModal