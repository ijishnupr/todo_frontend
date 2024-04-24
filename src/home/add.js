import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/navbar";

export default function Add() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);

  const handleAddTodo = () => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    const data = {
      title: title,
      description: description,
      due_date: dueDate,
    };

    const config = {
      headers: {
        Authorization: `token ${token}`,
      },
    };

    axios
      .post("/home/add_todo/", data, config)
      .then((response) => {
        console.log("Todo added successfully:", response.data);
        alert("data added successfully");
      })
      .catch((error) => {
        console.error("Error adding todo:", error);
        setError("Error adding todo. Please try again.");
      });
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        <h3 className="text-center mt-5">Add Todo</h3>
        <div className="col-md-6 offset-md-3">
          {error && <div className="alert alert-danger">{error}</div>}
          <form>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="form-control"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddTodo}
            >
              Add Todo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
