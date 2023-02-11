import { useEffect, useState } from "react"
import styled from "styled-components"
import ProductItem from "./ProductItem"
import { publicRequest } from "../requestMethods"

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
        const res = await publicRequest.get(cat ? `/products?category=${cat}` : `/products`)
        setProducts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllProducts()
  }, [cat])

  useEffect(() => {
    cat ? setFilteredProducts(products.filter(product => Object.entries(filters).every(([key, value]) => product[key].includes(value))).sort((a, b) => a.createdAt - b.createdAt)) : setFilteredProducts(products.slice(0, 8).sort((a, b) => a.createdAt - b.createdAt))
  }, [filters, products, cat])

  console.log(filteredProducts.map(a => a.createdAt))

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts(prev => [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
      console.log(sort)
    } else if (sort === "priceAsc") {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price))
    } else if (sort === "priceDesc") {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price))
    }
  }, [sort])

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