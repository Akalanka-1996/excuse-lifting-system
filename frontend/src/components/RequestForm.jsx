import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { createRequest } from "../features/request/requestSlice";

const RequestForm = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [picMessage, setPicMessage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    name: "",
    idPic:"",
    phone: "",
    address: "",
  });

  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );

  const { title, description, name, phone, address, idPic, } = formData;

  const disptach = useDispatch();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const requestData = {
      title,
      description,
      name,
      idPic,
      phone,
      address,
      pic
    };

    console.log("abc")
    console.log('request', requestData)
    disptach(createRequest(requestData));
    handleClose();
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage("Please select an Image");
    }

    setPicMessage(null);

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "MERNAuthentication");
      data.append("cloud_name", "dinmf92zr");
      fetch("https://api.cloudinary.com/v1_1/dinmf92zr/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
          console.log('picture', pic)
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage("Please select an Image");
    }
  };


  return (
    <>
      <Button className="btn-create" variant="primary" onClick={handleShow}>
        Create Request
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control 
                as="select" 
                id="title"
                name="title"
                value={title} 
                onChange={onChange}>
                {/* <default value="Default">Abc</default> */}
                <option style={{color: "red"}}>Select Option</option>
                <option value="Academic">Academic</option>
                <option value="Personnal">Personnal</option>
                <option value="Accident">Accident</option>
                <option value="Financial">Financial</option>
                <option value="Work Load">Work Load</option>
                <option value="Sickness">Sickness</option>
                <option value="Death">Death</option>
                <option value="Travel">Travel</option>
                <option value="Other">Other</option>



              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                type="text"
                required
                id="description"
                name="description"
                value={description}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required
                id="name"
                name="name"
                value={name}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Student Id</Form.Label>
              <Form.Control
                type="text"
                required
                id="idPic"
                name="idPic"
                placeholder="Insert image URL"
                value={idPic}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                required
                id="phone"
                name="phone"
                value={phone}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                required
                id="address"
                name="address"
                value={address}
                onChange={onChange}
              />
            </Form.Group>
            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Small file input example</Form.Label>
              <Form.Control 
                type="file" 
                size="sm" 
                onChange={(e) => postDetails(e.target.files[0])}
                />
              {/* <Form.File /> */}
           </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onSubmit}>
            Send Request
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RequestForm;
