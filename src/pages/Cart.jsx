import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"

const Container = styled.div`

`
const Wrapper = styled.div`
  padding: 20px;
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
  
`
const TopText = styled.span`
  text-decoration: underline;
  font-weight: 600;
  margin: 0px 10px;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`
const Info = styled.div`
  flex: 3;
`
const Product = styled.div`
  display: flex;
  justify-content: space-between;
`
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  /* height: 60vh; */
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
`

const Summary = styled.div`
  flex: 1;
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
                <Image src="https://drive.google.com/uc?export=view&id=1rrvykkdl9b64Hw0VdFvJp0Y0AtXbWHht" />
                <Details>
                  <ProductName><b>Product:</b> Jeans</ProductName>
                  <ProductId><b>ID:</b> 4354351568</ProductId>
                  <ProductColor color="red" />
                  <ProductSize><b>Size:</b> 37.5</ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>Price</PriceDetail>
            </Product>
          </Info>
          <Summary>Summary</Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  )
}

export default Cart