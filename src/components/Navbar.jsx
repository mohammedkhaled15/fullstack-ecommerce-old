import styled from "styled-components"
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { resetUser } from "../redux/userSlice";
import { resetCart } from "../redux/cartSlice";
import { persistor } from "../redux/store";


const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px" })}
`

const Wrapper = styled.div`
    padding:  10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ padding: "10px 0px" })}
`

const Left = styled.div`
  flex:1;
  display: flex;
  align-items: center;
`
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`
const SearchContainer = styled.div`
border:1px solid lightgray;
display: flex;
align-items: center;
margin-left: 25px;
padding: 5px;
`
const Input = styled.input`
  border:none;
  ${mobile({ width: "50px" })}
`
const Center = styled.div`
flex:1; 
text-align: center;
`
const Logo = styled.h1`
  font-weight: bold;
  color: black;
  ${mobile({ fontSize: "24px" })}
`
const Right = styled.div`
flex:1;
display: flex;
align-items: center;
justify-content: flex-end;
${mobile({ flex: 2, justifyContent: "center" })}
`
const MenueItem = styled.div`
font-size: 14px;
cursor: pointer;
margin-left: 25px;
border-radius: 4px;
background-color: ${props => props.color};
padding: ${props => props.color === "teal" ? "10px" : "0"};
${mobile({ fontSize: "12px", marginLeft: "10px" })}
`

const Navbar = () => {


  const cart = useSelector(state => state.cart)

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    persistor.purge()
    dispatch(resetUser())
    dispatch(resetCart())
    navigate("/", { replace: true })
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link style={{ textDecoration: "none" }} to={"/"}>
            <Logo>
              SHOP.
            </Logo>
          </Link>
        </Center>
        <Right>
          {!user.currentUser ?
            <>
              <MenueItem color="teal" onClick={() => navigate("/register")}>Register</MenueItem>
              <MenueItem color="teal" onClick={() => navigate("/login")}>Sign In</MenueItem>
            </> :
            <>
              <MenueItem>{`Welcome ${user?.currentUser?.username}`}</MenueItem>
              <MenueItem color="teal" onClick={handleLogout}>Log Out</MenueItem>
            </>
          }
          <Link to={cart.quantity > 0 ? "/cart" : ""}>
            <MenueItem color="inherit">
              <Badge badgeContent={cart.quantity} color="success">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenueItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar