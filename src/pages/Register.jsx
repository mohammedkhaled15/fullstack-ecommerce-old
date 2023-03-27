import styled from "styled-components"
import { mobile } from "../responsive"
import { publicRequest } from "../requestMethods"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../firebaseConfig"

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
  font-size: 20px;
  font-weight: 700;
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 7px;
  text-align: center;
`
const ImageUpload = styled.div`
  flex: 1;
  min-width: 50%;
  margin: 20px 10px 0 0;
  background-color: rgba(255, 255, 255,0.5);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 15px;
`
const ProfilePreview = styled.img`
  width: 80px;
    height: 80px;
    border-radius: 50%;
    padding: 0px 25px;
    object-fit: cover;
`
const ImageInput = styled.input`
  display: none;
`
const UploadLabel = styled.label`
  cursor: pointer;
  color: #008057;
  background-color: #81c9c9;
  border-radius: 5px;
  width: 60px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
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

  const initialUserData = { firstname: "", lastname: "", email: "", address: "", mobile: 0 }
  const [userData, setUserData] = useState(initialUserData)

  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(false)

  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)

  const [confPassword, setConfPassword] = useState("")
  const [validConfPassword, setValidConfPassword] = useState(false)

  const [imageFile, setImageFile] = useState("")
  const [profileImg, setProfileImg] = useState("/assets/images/defaultUser.png")

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleUserData = (e) => {
    setUserData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

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
  useEffect(() => { setError("") }, [username, password, confPassword, userData])


  const formReset = () => {
    setError("")
    setUserData({ ...initialUserData })
    setUsername("")
    setPassword("")
    setConfPassword("")
    setProfileImg("/assets/images/defaultUser.png")
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    // followed lines to precheck if someone sign up without enable sign up button (hack)
    const v1 = USER_REGEX.test(username)
    const v2 = PWD_REGEX.test(password)
    if (!v1) {
      setError("Invaild username Pattern!")
      setSuccess("")
      return
    } else if (!v2) {
      setError("Invaild password Pattern!")
      setSuccess("")
      return
    }
    try {
      const res = await publicRequest.post("/auth/register", JSON.stringify({ ...userData, username, password, img: profileImg }), {
        headers: { 'Content-Type': "application/json" },
      })
      formReset()
      setSuccess(`You Have Registered successfully as ${username}`)
    } catch (error) {
      setSuccess("")
      console.log(error)
      if (!error?.response) {
        setError("No Server Response")
      } else if (error?.response?.data?.code === 11000) {
        setError("Username Already Registered Before!")
      } else {
        setError("Registeration Failed")
      }
    }
  }

  useEffect(() => {
    const handleImgUpload = async () => {
      const fileName = new Date().getTime() + imageFile.name
      const storage = getStorage(app); // Create a root reference
      const storageRef = ref(storage, 'profileImgs/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
          }
        },
        (error) => {
          console.log(error)
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log('File available at', downloadURL);
            setProfileImg(downloadURL)
          });
        }
      );
    }
    imageFile && handleImgUpload()
  }, [imageFile])



  return (
    <Container>
      <Wrapper>
        {error && <Error>{error}</Error>}
        {success && <Success>{success}</Success>}
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="first name" type={"text"} value={userData.firstname} name="firstname" onChange={handleUserData} ref={firstnameRef} />
          <Input placeholder="last name" type={"text"} value={userData.lastname} name="lastname" onChange={handleUserData} />
          <Input placeholder="Mobile" type={"number"} value={userData.mobile} name="mobile" onChange={handleUserData} />
          <Input placeholder="Address" type={"text"} value={userData.address} name="address" onChange={handleUserData} />
          <Input placeholder="username" type={"text"} value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="email" type={"text"} value={userData.email} name="email" onChange={handleUserData} />
          <Input placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          <Input placeholder="confirm password" value={confPassword} onChange={(e) => setConfPassword(e.target.value)} type="password" />
          <ImageUpload>
            <ProfilePreview src={profileImg} />
            <UploadLabel htmlFor='file'>
              <FileUploadIcon style={{ fontSize: "32px" }} />
            </UploadLabel>
            <ImageInput type={"file"} id="file" onChange={(e) => setImageFile(e.target.files[0])} />
          </ImageUpload>
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