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
  return (
    <Container>
      <Wrapper>
        <Title>SHIPPING DETAILS</Title>
        <Form>
          <Input
            type="text"
            placeholder="address"
            // onChange={(e) => {
            //   setUser({ ...user, email: e.target.value });
            // }}
            required
          />
          <Input
            type="number"
            placeholder="pincode"
            // onChange={(e) => {
            //   setUser({ ...user, password: e.target.value });
            // }}
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
            // onChange={(e) => {
            //   setUser({ ...user, password: e.target.value });
            // }}
            required
          />
          <Button>CONFIRM ORDER</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Address;
