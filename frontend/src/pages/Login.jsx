import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux";
import {login, reset} from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
      alert("Invalid username or password!")
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {email, password}

    dispatch(login(userData))
  };

  return ( <div className="container">
  <div className="row mt-5">
    <div className="col-md-6">
      <div className="row mt-5">
        <h2 className="text-center mb-5 fw-bold fs-1">Login</h2>
      </div>
      <div className="row">
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            {/* <Form.Label>Email address</Form.Label> */}
            <Form.Control
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            {/* <Form.Label>
              {" "}
              Password <Link to="/fogot">forgot password ?</Link>
            </Form.Label> */}
            <Form.Control
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mb-3">
            Login
          </Button>
          <Form.Text className="text-muted">
            <p>
              {" "}
              New User? <Link to="/register">Register Here</Link>
            </p>
          </Form.Text>
        </Form>
      </div>
    </div>
    <div className="col-md-6">
      <Image src="./img/login.jpg" thumbnail style={{ border: "none" }} />
    </div>
  </div>
</div>
);
};

export default Login;
