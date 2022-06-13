import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url('../shipping.jpg') center;
  background-repeat: no-repeat;
  background-position: center right;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: '75%' })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  margin-left: 82px;
`;

const Address = () => {
  const [address, setAddress] = useState({
    address: undefined,
    pincode: undefined,
    city: undefined,
    state: undefined,
  });

  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [err, setErr] = useState(undefined);
  const user_id = JSON.parse(localStorage.getItem('user')).id;

  const confirmOrderHandler = (e) => {
    e.preventDefault();
    let orders = [];
    axios({
      method: 'GET',
      url: `http://localhost:5000/api/cart/${user_id}`,
      headers: {
        authorization: document.cookie.split('=')[1],
      },
    })
      .then((response) => {
        orders = response.data.rows.map((order) => {
          return {
            product_id: order.product_id,
            address: address.address,
            pincode: address.pincode,
            city: address.city,
            state: address.state,
          };
        });

        return axios({
          method: 'POST',
          url: `http://localhost:5000/api/orders`,
          headers: {
            authorization: document.cookie.split('=')[1],
          },
          data: orders,
        });
      })
      .then((response) => {
        if (response.data.err) {
          setErr(err);
        } else {
          setOrderConfirmed(true);
        }
      });
  };

  if (orderConfirmed) {
    return <Navigate to="/orders" />;
  }

  return (
    <Container>
      <Wrapper>
        <Title>SHIPPING DETAILS</Title>
        <Form>
          <Input
            type="text"
            placeholder="address"
            onChange={(e) => {
              setAddress({ ...address, address: e.target.value });
            }}
            required
          />
          <Input
            type="number"
            placeholder="pincode"
            onChange={(e) => {
              setAddress({ ...address, pincode: e.target.value });
            }}
            required
          />
          <Input
            type="text"
            placeholder="state"
            // onChange={(e) => {
            //   setUser({ ...user, password: e.target.value });
            // }}
            required
          />
          <Input
            type="text"
            placeholder="city"
            onChange={(e) => {
              setAddress({ ...address, city: e.target.value });
            }}
            required
          />
          <Button onClick={confirmOrderHandler}>CONFIRM ORDER</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Address;
