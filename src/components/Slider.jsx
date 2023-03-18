import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import styled from "styled-components"
import { sliderItems } from "../data"
import { mobile } from "../responsive"

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({ display: "none" })}
`
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${props => props.direction === "left" && "10px"};
  right: ${props => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: .5;
  z-index: 2;
`
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  transform: translate(${props => props.slideIndex * -100}vw);
  transition: all 1.4s ease;
`
const Slide = styled.div`
width: 100vw;
height: 100vh;
display: flex;
align-items: center;
background-color: #${props => props.bg};
`
const ImgContainer = styled.div`
height: 100%;
flex: 1;
align-items: center;
display: flex;
`
const Image = styled.img`
height: 80%;
`
const InfoConainer = styled.div`
padding: 50px;
flex: 1;
`
const Title = styled.h1`
font-style: 70px;
`
const Desc = styled.p`
margin:50px 0px;
font-style: 20px;
font-weight: 500;
letter-spacing: 3px;
`
const Button = styled.button`
padding:10px;
font-style: 20px;
background-color: transparent;
cursor: pointer;
`

const Slider = () => {

  const [slideIndex, setSlideIndex] = useState(0)

  const handleClick = (dir) => {
    if (dir === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : sliderItems.indexOf(sliderItems[sliderItems.length - 1]))
    } else {
      setSlideIndex(slideIndex < sliderItems.indexOf(sliderItems[sliderItems.length - 1]) ? slideIndex + 1 : 0)
    }
  }

  const delay = 7000

  useEffect(() => {
    setTimeout(() =>
      setSlideIndex(prev => prev === sliderItems.length - 1 ? 0 : prev + 1)
      , delay)
  }, [slideIndex])

  return (
    <Container>
      <Arrow direction={"left"} onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </Arrow>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map(item => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Image src={item.img} />
            </ImgContainer>
            <InfoConainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoConainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction={"right"} onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </Arrow>
    </Container>
  )
}

export default Slider