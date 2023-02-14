import styled from "styled-components"
import { mobile } from "../responsive"
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../redux/userSlice"
import LoaderSpinner from "../components/LoaderSpinner"
import { useNavigate } from "react-router-dom"

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background:linear-gradient(rgba(255,255,255,0.5),rgba(255,255,255,0.5)), url("/assets/images/login.jpg") center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Wrapper = styled.div`
  width: 35%;
  padding: 20px;
  background-color: rgba(255, 255, 255,0.8);
  border-radius: 20px;
  ${mobile({ width: "75%" })}
`
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  `
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0 ;
  padding: 10px;
  border-radius: 5px;
  border: none;
  border: 1px solid rgb(204, 202, 202);
  background-color: rgba(255, 255, 255,0.8);
`
const Button = styled.button`
  width: 40%;
  border:none;
  padding: 15px 20px;
  background-color: teal;
  color:white;
  cursor: pointer;
  margin-bottom: 10px;
  border-radius: 10px;
  ${mobile({ alignSelf: "center" })}
`
const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`
const Error = styled.h5`
  color: red;
  background-color: #f7a0a0;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  text-align: center;
`

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector(state => state.user)
  const navigate = useNavigate()
  const userRef = useRef()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch, { username, password })
  }
  return (
    <Container>
      {
        isFetching && <LoaderSpinner />
      }
      <Wrapper>
        {error && <Error>Something Went Wrong...</Error>}
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} ref={userRef} />
          <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleClick}>LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD</Link>
          <Link onClick={() => navigate("/register")}>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Login