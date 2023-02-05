import styled from "styled-components"
import SendIcon from '@mui/icons-material/Send';
import { mobile } from "../responsive"

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ height: "45vh" })}
`
const Title = styled.h2`
  font-style: 70px;
  margin-bottom: 20px;
`
const Desc = styled.p`
  font-style: 24px;
  font-weight: 200;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color:white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`
const Input = styled.input`
  border:none;
  flex: 8;
  padding-left: 20px;
`
const Button = styled.button`
  flex:1;
  border: none;
  background-color: teal;
  flood-color: white;
  cursor: pointer;
`

const NewsLetter = () => {
  return (
    <Container>
      <Title>NEWS LETTER</Title>
      <Desc>GET ALL NEWS ABOUT OUR NEW PRODUCTS</Desc>
      <InputContainer>
        <Input placeholder="Your Email" />
        <Button>
          <SendIcon />
        </Button>
      </InputContainer>
    </Container>
  )
}

export default NewsLetter