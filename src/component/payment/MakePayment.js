import React from "react";
import "./styles.css";
import Modal from "react-bootstrap/esm/Modal";
import axios from "axios";
// This is a reference code
export default function MakePayment({price, lotId, users, modalOpen, setModalOpen, setUser}) {
  console.log(price, lotId, users, modalOpen);
  const payment = ()=>{
    async function makeDeal(){
      const config = {headers: {'Content-Type': 'application/json'}};
      const {data}= await axios.post(
        `/api/v1/customer/lot/payment`,
        {price, lotID: lotId, users},
        config
      );
      alert('Payment successful'); 
      console.log(data);
      if(data.customer){
        localStorage.setItem('user', JSON.stringify(data.customer));
        setUser(data.customer);
      }
    }
    makeDeal();
  }

  return (
    <Modal id="payment" show={modalOpen}>
      <form id="form" >
        <header id="header">
          <div id="TitleSecure">
            <h3>Payment Details </h3>
          </div>
          <div id="Amont">
            <p> Amount : </p>
            <label id="price">{price}/- only</label>
          </div>
        </header>
        <main id="main">
          <div id="ClientName">
            <label> Name of the Client </label>
            <input id='input' name="ClientName" />
          </div>
          <div id="CardNumber">
            <label> Card Number </label>
            <input id='input'
              placeholder="Valid Card Number"
              name="cardNumber"
              maxLength="19"
            />
          </div>
          <div id="DateEtCvc">
            <div id="Date">
              <label>Expiration Date</label>
              <input id='input'
                placeholder="MM/YY"
                name="expiryDate"
              />
            </div>
            <div id="CvC">
              <label> Cvv</label>
              <input id='input'
                name="cvc"
                maxLength="3"
              />
            </div>
          </div>
          <div id="terme" >
            <input id='input' className="my-3" type="checkbox"/>
            <p id="termsConditions" className="mb-2">
              Accept terms and conditions
            </p>
          </div>
          <button
            type="submit"
            className="btn btn-success"
            onClick={payment}
          >Proceed</button>
        </main>
      </form>
    </Modal>
  );
}
