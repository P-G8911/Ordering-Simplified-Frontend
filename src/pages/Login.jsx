import axios from 'axios';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import styled from "styled-components";
import {mobile} from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
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
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Link = styled.a`
  margin: 8px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {

  const [user, setUser] = useState({
    email: 'a@123.com',
    password: '1234'
  });

  const [msg, setMsg] = useState(undefined);
  const [err, setErr] = useState(undefined);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:5000/api/users/signin',
      data: user,
    }).then((response) => {
       if(response.data.msg === 'logged In') {
        localStorage.setItem('user', JSON.stringify({ email: response.data.email, id: response.data.id }))
        document.cookie='auth_token=' + response.data.token;
        console.log(document.cookie.split('=')[1]);
        setMsg(response.data.msg);
       } else if (response.data.err) {
        setErr(response.data.err);
       }
    })
  }

  if(msg === 'logged In') {
    return <Navigate to="/home" replace={true}/>
  }

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={onSubmitHandler}>
          <Input type='email' placeholder="email" onChange={(e) => { setUser({ ...user, email: e.target.value }) }} required />
          <Input type='password' placeholder="password" onChange={(e) => { setUser({ ...user, password: e.target.value }) }} required />
          <Button>LOGIN</Button>
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;