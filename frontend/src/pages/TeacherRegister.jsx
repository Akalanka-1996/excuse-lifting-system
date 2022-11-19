import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux";
import { register, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Form, Button, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


function TeacherRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "",
    password: "",
    password2: "",
  });

  const { name, email, grade, password, password2 } = formData;

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    if (isError) {
      toast.error(message)
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
    
    if (password !== password2) {
      alert("Passwords does not match!")
    } else {
      const userData = {
        name,
        email, 
        grade,
        password,
        userRole: 'admin'
      }

      dispatch(register(userData))
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-5 fw-bold fs-1">Register as a Teacher</h2>
          <Form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="grade"
              name="grade"
              value={grade}
              placeholder="Grade"
              onChange={onChange}
            />
          </div>
          {/* <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="studentId"
              name="studentId"
              value={studentId}
              placeholder="Student ID"
              onChange={onChange}
            />
          </div> */}
          {/* <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="pic"
              name="pic"
              value={pic}
              placeholder="Photograph"
              onChange={onChange}
            />
          </div> */}
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>

           
        

            <Button variant="primary" type="submit">
              Register
            </Button>
            {/* <Form.Text className="text-muted">
            <p>
              {" "}
              Click <Link to="/register-teacher">Here</Link> To register as a Teacher
            </p>
          </Form.Text> */}
          </Form>
        </div>
        <div className="col-md-6">
          <Image src="./img/signup.jpg" thumbnail style={{ border: "none" }} />
        </div>
      </div>
    </div>
  );
}

export default TeacherRegister;
