import { useEffect, useState } from "react"
import styled from "styled-components"
import ProductItem from "./ProductItem"
import { privateRequest } from "../requestMethods"
import { useNavigate } from "react-router-dom"

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
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await privateRequest.get(cat ? `/products?category=${cat}` : `/products`)
        if (res?.data) setProducts(res.data)
      } catch (error) {
        console.log(error)
        navigate("/", { replace: true })
      }
    }
    getAllProducts()
  }, [cat, navigate])

  useEffect(() => {
    cat ? setFilteredProducts(products.filter(product => Object.entries(filters).every(([key, value]) => product[key].includes(value))).sort((a, b) => a.createdAt - b.createdAt)) : setFilteredProducts(products.slice(0, 8).sort((a, b) => a.createdAt - b.createdAt))
  }, [filters, products, cat])


  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts(prev => [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
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