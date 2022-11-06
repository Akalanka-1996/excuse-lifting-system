import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequests, reset } from "../features/request/requestSlice";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import "./style.css";

const PostTable = () => {
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

  const postHandler = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const res = await axios.put(
        `http://localhost:8080/api/requests/post-request/${id}`
      );
      alert("Package Posted!");
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  }

  return (
    <div className="request-table">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Name</th>
            <th>Address</th>
            <th>Status</th>
            <th>Posted Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.title}</td>
              <td>{request.description}</td>
              <td>{request.name}</td>
              <td>{request.address}</td>
              <td>{request.status}</td>
              <td>{moment(request.createdAt).format("YYYY-MMM-DD")}</td>
              <td>
              <Button variant="warning" onClick={() => postHandler(request._id)}>Post</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostTable;
