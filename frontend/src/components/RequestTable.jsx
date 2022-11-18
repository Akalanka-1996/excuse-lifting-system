import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequests, reset } from "../features/request/requestSlice";
import { Table } from "react-bootstrap";
import "./style.css";

const RequestTable = () => {
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

  return (
    <div className="request-table">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Reason Type</th>
            <th>Reason Comment</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.name}</td>
              <td>{request.phone}</td>
              <td>{request.title}</td>
              <td>{request.description}</td>
              <td>{request.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RequestTable;
