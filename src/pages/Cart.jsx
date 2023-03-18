import React from "react"
import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import { Add, Remove } from "@mui/icons-material"
import { mobile } from "../responsive"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { privateRequest } from "../requestMethods"
import StripeCheckout from "react-stripe-checkout"
import { useNavigate } from "react-router-dom"
import { resetCart } from "../redux/cartSlice"

const stripeKey = process.env.REACT_APP_STRIPE

const Container = styled.div``
const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`
const Top = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 20px;
`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border:${props => props.type === "filled" && "none"};
  background-color:${props => props.type === "filled" && "black"};
  color:${props => props.type === "filled" && "white"};
`
const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`
const TopText = styled.span`
  text-decoration: underline;
  font-weight: 600;
  margin: 0px 10px;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`
const Info = styled.div`
  flex: 3;
`
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`
const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: cover;
`
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`
const ProductName = styled.span``
const ProductId = styled.span``
const ProductColor = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.color};
`
const ProductSize = styled.span``
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  `
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`
const ProductAmount = styled.span`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`
const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`
const HR = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin: 10px 0;
`

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`
const SummaryTitle = styled.h2`
  font-weight: 200;
`
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${props => props.type === "total" && "500"};
  font-size: ${props => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`

const Cart = () => {

  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [stripeToken, setStripeToken] = useState(null)

  const navigate = useNavigate()

  const onToken = (token) => {
    setStripeToken(token)
  }

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await privateRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.totalPrice * 100,
          currency: "usd"
        })
        dispatch(resetCart())
        console.log(res.data)
        navigate("/success", { state: { stripeData: res.data, cart, user }, replace: true })
      } catch (error) {
        console.log(error)
      }
    }
    stripeToken && cart.totalPrice > 0 && makeRequest()
  }, [stripeToken, cart, navigate, user, dispatch])

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <TopButton >Continue Shopping</TopButton>
          <TopTexts>
            <TopText>Shooping Bag {`(${cart.quantity})`}</TopText>
            <TopText>Your Whishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">Checkout Now</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map(prod => (
              <Product key={prod._id}>
                <React.Fragment >
                  <ProductDetail>
                    <Image src={prod.img} />
                    <Details>
                      <ProductName><b>Product:</b> {prod.title}</ProductName>
                      <ProductId><b>ID:</b> {prod._id}</ProductId>
                      <ProductColor color={prod.color} />
                      <ProductSize><b>Size:</b> {prod.size}</ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{prod.quantity}</ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>$ {prod.price * prod.quantity}</ProductPrice>
                  </PriceDetail>
                </React.Fragment>
                <HR />
              </Product>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice * 0.02}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice>$ {cart.totalPrice * 0.05}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {(cart.totalPrice * 0.97).toFixed(2)}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Mohammed Shop"
              billingAddress
              shippingAddress
              image="https://drive.google.com/uc?export=view&id=1wS2DHvRkbhmtkmDH2iXokN-5xxDWFIJ_"
              description={`Your total amount is ${cart.totalPrice}`}
              token={onToken}
              stripeKey={stripeKey}
              amount={cart.totalPrice * 0.97 * 100}
            >
              <SummaryButton>Checkout Now</SummaryButton>
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>

      <Footer />
    </Container >
  )
}

export default Cart