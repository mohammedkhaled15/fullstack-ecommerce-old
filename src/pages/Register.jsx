import styled from "styled-components"
import { mobile } from "../responsive"
import { publicRequest } from "../requestMethods"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

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

const Error = styled.p`
  color: red;
  background-color: #af8686;
  font-size: 26px;
  font-weight: 700;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 7px;
  text-align: center;
`
const Success = styled.p`
  color: #0f5526;
  background-color: #8ab4a0;
  font-size: 26px;
  font-weight: 700;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 7px;
  text-align: center;
`
const Note = styled.p`
  font-size: 16px;
  margin:10px;
  cursor: pointer;
`

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Register = () => {

  const firstnameRef = useRef() // for autofocus on username input
  const navigate = useNavigate()

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")

  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(false)

  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)

  const [confPassword, setConfPassword] = useState("")
  const [validConfPassword, setValidConfPassword] = useState(false)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    firstnameRef.current.focus()
  }, [])

  useEffect(() => { // check validity of username against certain regex
    const res = username.match(USER_REGEX)
    setValidUsername(res)
  }, [username])

  useEffect(() => {// check validity of password against certain regex and equality of password and confirm password
    const res = password.match(PWD_REGEX)
    setValidPassword(res)
    setValidConfPassword(password === confPassword)
  }, [password, confPassword])

  //set error to empty when changing any of input
  useEffect(() => { setError("") }, [username, password, confPassword, firstname, lastname, email])

  const formReset = () => {
    setError("")
    setFirstname("")
    setLastname("")
    setUsername("")
    setEmail("")
    setPassword("")
    setConfPassword("")
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    // followed lines to precheck if someone sign up without enable sign up button (hack)
    const v1 = USER_REGEX.test(username)
    const v2 = PWD_REGEX.test(password)
    if (!v1 || !v2) {
      setError("Invaild Entry")
      setSuccess("")
      return
    }

    try {
      const res = await publicRequest.post("/auth/register", JSON.stringify({ username, password, email }), {
        headers: { 'Content-Type': "application/json" },
      })
      formReset()
      setSuccess(`You Have Registered successfully as ${username}`)
    } catch (error) {
      setSuccess("")
      if (!error?.response) {
        setError("No Server Response")
      } else {
        setError("Registeration Failed")
      }
    }
  }

  return (
    <Container>
      <Wrapper>
        {error && <Error>{error}</Error>}
        {success && <Success>{success}</Success>}
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="first name" value={firstname} onChange={(e) => setFirstname(e.target.value)} ref={firstnameRef} />
          <Input placeholder="last name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          <Input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          <Input placeholder="confirm password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} type="password" />
          <Agreement>
            By creating an account, I consent to the proccesing of my personal data in accordance with <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister}>CREATE</Button>
          <Note onClick={() => navigate("/login")}>Already have account?</Note>
        </Form>
      </Wrapper>
    </Container>
  )
}

export default Register