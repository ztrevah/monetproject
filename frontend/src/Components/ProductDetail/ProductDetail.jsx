import React from 'react'
import "./ProductDetail.css"
import { useParams } from 'react-router-dom'

const ProductDetail = () => {
    const param = useParams(); 
  return (
    <div>{param.productid}</div>
  )
}

export default ProductDetail