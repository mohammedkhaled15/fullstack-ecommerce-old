import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import { Add, Remove } from "@mui/icons-material"
import { mobile } from "../responsive"

const Container = styled.div`

`
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
`

const Cart = () => {
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <TopButton >Continue Shopping</TopButton>
          <TopTexts>
            <TopText>Shooping Bag (2)</TopText>
            <TopText>Your Whishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">Checkout Now</TopButton>
        </Top>
        <Bottom>
          <Info>
            <Product>
              <ProductDetail>
                <Image src="/assets/images/cart.jpg" />
                <Details>
                  <ProductName><b>Product:</b> Jeans</ProductName>
                  <ProductId><b>ID:</b> 4354351568</ProductId>
                  <ProductColor color="red" />
                  <ProductSize><b>Size:</b> 37.5</ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>2</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$20</ProductPrice>
              </PriceDetail>
            </Product>
            <HR />
            <Product>
              <ProductDetail>
                <Image src="/assets/images/cart.jpg" />
                <Details>
                  <ProductName><b>Product:</b> Jeans</ProductName>
                  <ProductId><b>ID:</b> 4354351568</ProductId>
                  <ProductColor color="red" />
                  <ProductSize><b>Size:</b> 37.5</ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <Add />
                  <ProductAmount>2</ProductAmount>
                  <Remove />
                </ProductAmountContainer>
                <ProductPrice>$20</ProductPrice>
              </PriceDetail>
            </Product>
          </Info>
          <Summary>
            <SummaryTitle>Order Summary</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 20</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.6</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ 80</SummaryItemPrice>
            </SummaryItem>
            <SummaryButton>Checkout Now</SummaryButton>
          </Summary>
        </Bottom>
      </Wrapper>

      <Footer />
    </Container>
  )
}

export default Cart