import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { privateRequest } from "../requestMethods"

const Container = styled.div`
    height: "100vh";
        display: "flex";
        flex-direction: "column";
        align-items: "center";
        justify-content: "center";
`

const Success = () => {
  const [orderId, setOrderId] = useState(null)
  const location = useLocation()
  const cart = location.state.cart
  const stripeData = location.state.stripeData
  console.log(cart, stripeData)
  useEffect(() => {
    const makeRequest = async () => {
      try {
        // const res = await privateRequest.post("/orders", {
        //   userId:
        // })
      } catch (error) {

      }
    }
  }, [orderId])

  return (
    <Container>
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
    </Container>
  )
}

export default Success