import styled from "styled-components"
import StripeCheckout from 'react-stripe-checkout';
import { useState, useEffect } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Button = styled.button`
    background-color: black;
    width:150px;
    font-size: 22px;
    color: white;
    font-weight: 400;
    cursor: pointer;
`

const stripeKey = "pk_test_51MZZ73DGrKqTRj4p9kiAh7cmqKaX3F5XYDs5fLHywXbjhAj6wAIYfkJbGnWrymYTEzlwW2m85DVxMQLuU5KJFxJW00Gv60GYRa"

const Pay = () => {
  const [stripeToken, setStripeToken] = useState(null)

  const onToken = (token) => {
    setStripeToken(token)
  }

  const navigate = useNavigate()

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await axios.post("http://localhost:5000/api/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 2000,
        })
        console.log(res.data)
        navigate("/success")
      } catch (err) {
        console.log(err)
      }
    }
    stripeToken && makeRequest()
  }, [stripeToken, navigate])
  return (

    stripeToken ? "Processing Please Wait" :

      <StripeCheckout
        name="Mohammed Shop"
        billingAddress
        shippingAddress
        token={onToken}
        stripeKey={stripeKey}
        amount={2000}
      >
        <Button>Pay Now</Button>
      </StripeCheckout>

  )
}

export default Pay