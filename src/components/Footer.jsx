import styled from "styled-components"
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { mobile } from "../responsive"


const Container = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const Logo = styled.h2`

`
const Desc = styled.p`
  margin: 20px 0px;
`
const SocialContainer = styled.div`
  display: flex;
  `
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`
const Center = styled.div`
  flex:1;
  padding: 20px;
  ${mobile({ display: "none" })}
`
const Title = styled.h3`
  margin-bottom: 30px;
`
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  cursor: pointer;
`
const Right = styled.div`
  flex:1;
  padding: 20px;
  ${mobile({ backgroundColor: "#eee" })}
`
const ContactItem = styled.div`
margin-bottom: 20px;
display: flex;
align-items: center;
`
const Paymeent = styled.img`
  width: 90%;
`

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Shop.</Logo>
        <Desc>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque minima nisi eligendi. Laborum unde est pariatur voluptate amet rem tenetur eius rerum cumque, voluptatibus magni quibusdam ad numquam molestias dolore.
        </Desc>
        <SocialContainer>
          <SocialIcon color={"#3b5999"}><FacebookIcon /></SocialIcon>
          <SocialIcon color={"#5aceee"}><TwitterIcon /></SocialIcon>
          <SocialIcon color={"#e4405f"}><InstagramIcon /></SocialIcon>
          <SocialIcon color={"#e60023"}><PinterestIcon /></SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Women Fasion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>WishList</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <LocationOnIcon style={{ marginRight: "10px" }} />64 El-Gesh St, Tanta Al-gharbya
        </ContactItem>
        <ContactItem>
          <LocalPhoneIcon style={{ marginRight: "10px" }} />+10  6966 7123
        </ContactItem>
        <ContactItem>
          <EmailIcon style={{ marginRight: "10px" }} /> Mkhaled_farag@outlook.com
        </ContactItem>
        <Paymeent src={"https://drive.google.com/uc?export=view&id=15zki5rZMahH78ZBPyIC_oM3C8PjGY1c9"} />
      </Right>
    </Container>
  )
}

export default Footer