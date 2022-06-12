import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react'
import styled from "styled-components"
import {popularProducts} from '../data'
import Product from "./Product"


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = () => {

  const [products, setProducts] = useState([]);
  const [err, setErr] = useState(undefined);

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://localhost:5000/api/products/'
    }). then ((response) => {
      if(response.data.err) {
        setErr(response.data.err);
      } else {
        setProducts(response.data.items);
      }
    })
  }, []);

  return (
    <Container>
        {products.map(item=>(
            <Product item = {{...item, img: item.cover_image}} key={item.id}/>
        ))}
    </Container>
  )
}

export default Products