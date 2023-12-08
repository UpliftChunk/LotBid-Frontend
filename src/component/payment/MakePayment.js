import React from "react";
import { useRef } from "react";
// import emailjs from "@emailjs/browser";
import "./styles.css";
import { GrSecure } from "react-icons/gr";
import { usePaymentInputs } from "react-payment-inputs";

export default function Form() {
  const form = useRef();
  const {
    meta,
    getExpiryDateProps,
    getCVCProps
  } = usePaymentInputs();

  const [checked, setChecked] = React.useState(true);
  const [cardNumber, setCardNumber] = React.useState("");
  const [details, setDetails] = React.useState({
    expiryDate: "",
    cvc: "",
    NomDuClient: ""
  });

  const handleChange = (e) => {
    setDetails((prevFormDetails) => {
      return {
        ...prevFormDetails,
        [e.target.name]: e.target.value
      };
    });

    console.log(details);
  };
  const handleChangeCardNumber = (e) => {
    setCardNumber(
      e.target.value
        .replace(/[^\dA-Z]/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      (meta.isTouched && meta.error) ||
      Number(cardNumber.length) < 19 ||
      cardNumber.trim().length === 0 ||
      details.expiryDate.trim().length === 0 ||
      details.cvc.trim().length === 0 ||
      details.NomDuClient.trim().length === 0 ||
      checked === true
    ) {
      setChecked(true);
      console.log("not submit");
    } else {
      setChecked(false);
    }
  };
  const handleCheck = () => {
    console.log("ok");

    setChecked(false);
  };

  return (
    <form ref={form} className="form" onSubmit={handleSubmit}>
      <header>
        <div className="TitleSecure">
          <h3>Payment Details </h3>
          <GrSecure className="secureIcon" />
        </div>
        <div className="Amont">
          <p> Amount : </p>
          <label className="price">100/-</label>
        </div>
      </header>
      <main>
        {meta.isTouched && meta.error ? (
          <span className="span">Error: {meta.error}</span>
        ) : (
          <span className="span"></span>
        )}
        <div className="NomDuClient">
          <label> Name of the Client </label>
          <input name="NomDuClient" onChange={handleChange} />
        </div>
        <div className="NumDeCarte">
          <label> Card Number </label>
          <input
            // {...getCardNumberProps({ onChange: handleChangeCardNumber })}
            onChange={handleChangeCardNumber}
            placeholder="Valid Card Number"
            name="cardNumber"
            maxLength="19"
            value={cardNumber}
          />
        </div>
        <div className="DateEtCvc">
          <div className="Date">
            <label> Date expiration </label>
            <input
              {...getExpiryDateProps({ onChange: handleChange })}
              placeholder="MM/AA"
              name="expiryDate"
            />
          </div>
          <div className="CvC">
            <label> Cvv</label>
            <input
              {...getCVCProps({ onChange: handleChange })}
              name="cvc"
              maxLength="3"
            />
          </div>
        </div>
        <div className="terme">
          <input type="checkbox" onChange={handleCheck} />
          <p className="TermeConfidentialite">
            Accept terms and conditions
          </p>
        </div>
        <input
          disabled={checked}
          type="submit"
          value="Validate"
          className="btn"
        />
      </main>
      <footer>
      </footer>
    </form>
  );
}
