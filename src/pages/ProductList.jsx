import { useState } from "react"
import styled from "styled-components"
import Announcement from "../components/Announcement"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import NewsLetter from "../components/NewsLetter"
import Products from "../components/Products"
import { mobile } from "../responsive"
import { useLocation } from "react-router-dom"

const Container = styled.div``
const Title = styled.h1`
margin: 20px;
`
const FilterContainer = styled.div`
display: flex;
justify-content: space-between;
margin: 20px;
`
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0px", display: "flex", flexDirection: "column" })}
`

const FilterText = styled.span`
  font-style: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0" })}
`
const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  ${mobile({ margin: "10px 0px" })}
`
const Option = styled.option``

const ProductList = () => {
  const location = useLocation()
  const cat = location.pathname.split("/")[2]

  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState("newest")

  const handleSelectChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }
  const handleSortChange = (e) => {
    setFilters(e.target.value)
  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat ? cat.toUpperCase() : "All Products"}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select name="color" onChange={handleSelectChange}>
            <Option >
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>yellow</Option>
            <Option>blue</Option>
            <Option>pink</Option>
          </Select>
          <Select name="size" onChange={handleSelectChange}>
            <Option >
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products</FilterText>
          <Select onChange={handleSortChange}>
            <Option value={"newest"}>Newest</Option>
            <Option value={"priceAsc"}>Price (asc)</Option>
            <Option value={"priceDesc"}>Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </Container>
  )
}

export default ProductList