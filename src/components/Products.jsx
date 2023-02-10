import { useEffect, useState } from "react"
import styled from "styled-components"
import ProductItem from "./ProductItem"
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`
const Title = styled.h2`
  margin: auto;
  font-size: 28px;
`

const Products = ({ cat, filters, sort }) => {

  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios.get(cat ? `http://localhost:5000/api/products?category=${cat}` : `http://localhost:5000/api/products`)
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllProducts()
  }, [cat])

  useEffect(() => {
    filters ? setFilteredProducts(products.filter(product => Object.entries(filters).every(([key, value]) => product[key].includes(value)))) : setFilteredProducts(products.slice(0, 5))
  }, [filters, products])

  console.log(filteredProducts, filters, sort)


  return (
    <Container>
      {
        filteredProducts.length ? filteredProducts.map(item => (
          <ProductItem key={item._id} item={item} />
        )) : <Title>No Products To View</Title>
      }
    </Container>
  )
}

export default Products