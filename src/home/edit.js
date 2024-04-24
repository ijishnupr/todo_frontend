import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/navbar";
import { useParams } from "react-router-dom";

function Edit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    } else {
      const config = {
        headers: {
          Authorization: `token ${token}`,
        },
      };

      axios
        .get(`/home/view_todo/?id=${id}`, config)
        .then((response) => {
          const { title, description, due_date } = response.data;
          setTitle(title);
          setDescription(description);
          setDueDate(due_date);
        })
        .catch((error) => {
          console.error("Error:", error);
          setError("Error fetching todo details. Please try again.");
        });
    }
  }, [id]);

  const handleEditTodo = () => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return;
    }

    const data = {
      id: id,
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
      .patch(`/home/edit_todo/`, data, config)
      .then((response) => {
        console.log("Todo updated successfully:", response.data);
        alert("data updated successfully");
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
        setError("Error updating todo. Please try again.");
      });
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        <h3 className="text-center mt-5">Edit Todo</h3>
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
              onClick={handleEditTodo}
            >
              Update Todo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Edit;
