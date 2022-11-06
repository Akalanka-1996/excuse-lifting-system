import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequests, reset } from "../features/request/requestSlice";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import "./style.css";

const AdminTable = () => {
  const dispatch = useDispatch();

  const { requests, isLoading, isError, message } = useSelector(
    (state) => state.requests
  );

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getRequests());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const approveHandler = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const res = await axios.put(
        `http://localhost:8080/api/requests/approve-request/${id}`
      );
      alert("Request Approved");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  const rejectHandler = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const res = await axios.put(
        `http://localhost:8080/api/requests/reject-request/${id}`
      );
      alert("Request Rejected");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="request-table">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Name</th>
            <th>Student Id</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} style={{ fontSize: 15 }}>
              <td>{request.title}</td>
              <td>{request.description}</td>
              <td>{request.name}</td>
              <td>
                <a href={request.idPic} target="_blank">Click to View </a>
              </td>
              <td>{request.address}</td>
              <td>{request.status}</td>

              <td>
                <Button
                  size="sm"
                  variant="success"
                  onClick={() => approveHandler(request._id)}
                >
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => rejectHandler(request._id)}
                >
                  Reject
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminTable;
