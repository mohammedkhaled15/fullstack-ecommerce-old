import styled from "styled-components"
import { mobile } from "../responsive"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)), url("/assets/images/register.jpg") ;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({ backgroundPosition: "right 22% bottom 20%" })}
`
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: rgba(255, 255, 255,0.8);
  border-radius: 20px;
  ${mobile({ width: "75%" })}
`
const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 300;
  ${mobile({ textAlign: "center" })}
`
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
  border-radius: 5px;
  border: none;
  border: 1px solid #cccaca;
  background-color: rgba(255, 255, 255,0.5);
`
const Agreement = styled.span`
  font-size: 12px;
  margin:20px 0px;
`
const Button = styled.button`
  width: 40%;
  border:none;
  padding: 15px 20px;
  background-color: teal;
  color:white;
  cursor: pointer;
  border-radius: 10px;
  font-size: 1.1rem;
  ${mobile({ margin: "auto" })}
`

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input placeholder="username" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Input placeholder="confirm password" />
          <Agreement>
            By creatin an account, I consent to the proccesing of m personal data in accordance with <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register