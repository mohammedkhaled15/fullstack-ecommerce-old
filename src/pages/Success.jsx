import styled from "styled-components"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import usePrivateRequest from "./../hooks/usePrivateRequestInterceptors"

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
  const user = useSelector(state => state.user)
  const privateRequest = usePrivateRequest()
  console.log(stripeData)

  useEffect(() => {
    setOrderId(stripeData.id)
  }, [stripeData.id])

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await privateRequest.post("/orders", {
          userID: user.currentUser._id,
          products: [...cart.products.map(prod => {
            return {
              productID: prod._id,
              quantity: prod.quantity
            }
          })],
          amount: stripeData.amount,
          address: stripeData.billing_details.address,
          status: stripeData.status,
        })
        console.log(res.data)
      } catch (error) {
        console.log(error.response.data.error.message)
      }
    }
    orderId && makeRequest()
  }, [cart.products, cart.totalPrice, orderId, stripeData.amount, stripeData.billing_details.address, stripeData.source, stripeData.status, user.currentUser._id])

  return (
    <Container>
      {`Order has been created successfully. Your order number is ${orderId}, thanks ${user.currentUser.username}`}
    </Container>
  )
}

export default Success