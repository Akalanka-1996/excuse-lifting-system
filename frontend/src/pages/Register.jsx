import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from "react-redux";
import {login, reset} from '../features/auth/authSlice'
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Form, Button, Image, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";


function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    grade: "",
    password: "",
    password2: "",
  });

  const { name, email, studentId, grade, password, password2 } = formData;

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
        studentId,
        grade,
        password
      }

      // dispatch(register(userData))
    }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-6">
          <h2 className="text-center mb-5 fw-bold fs-1">Register</h2>
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formGridMemberName">
              <Form.Label>Member Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                // value={memberName}
                // onChange={(e) => setMemberName(e.target.value)}
              />
            </Form.Group>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridBirthDate">
                <Form.Label>Birth Date</Form.Label>
                <Form.Control
                  type="date"
                  // value={birthDate}
                  // onChange={(e) => setBirthDate(e.target.value)}
                  placeholder="Date of Birth"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridConfirmPassword">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control type="file" placeholder="Upload your Photo" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  // value={city}
                  // onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>Avenue</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  // value={avenue}
                  // onChange={(e) => setAvenue(e.target.value)}
                >
                  <option>...</option>
                  <option>Club Service</option>
                  <option>Professional Development</option>
                  <option>Community Service</option>
                  <option>International Service</option>
                  <option>Sports and Recreational Activities</option>
                  <option>Public Image</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridZip">
                <Form.Label>Acedemic Year</Form.Label>
                <Form.Select
                  defaultValue="Choose..."
                  // value={academicYear}
                  // onChange={(e) => setAcademicYear(e.target.value)}
                >
                  <option>...</option>
                  <option>1st Year</option>
                  <option>2nd Year</option>
                  <option>3rd Year</option>
                  <option>4th Year</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridRACUOKID">
                <Form.Label>RACUOK ID</Form.Label>
                <Form.Control
                  placeholder="RACUOK21_0001"
                  // value={racId}
                  // onChange={(e) => setRacId(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  // onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  // value={confirmPassword}
                  // onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="col-md-6">
          <Image src="./img/signup.jpg" thumbnail style={{ border: "none" }} />
        </div>
      </div>
    </div>
  );
}

export default Register;
