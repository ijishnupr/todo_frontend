import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/navbar";
import { useNavigate } from "react-router-dom";

function Main_page() {
  const [todo, setTodo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Adjust as needed
  const navigate = useNavigate();

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
        .get("/home/list_todo/", config)
        .then((response) => {
          setTodo(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, []);

  const handleCheckboxChange = (index, id) => {
    const updatedTodo = [...todo];
    updatedTodo[index].completed = !updatedTodo[index].completed;
    setTodo(updatedTodo);

    const data = {
      id: id,
      completed: updatedTodo[index].completed,
    };
    console.log("hai", data);
    axios
      .patch("/home/edit_todo/", data)
      .then((response) => {})
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  const handleDelete = (id) => {
    
    const updatedTodo = todo.filter((item) => item.id !== id);
    setTodo(updatedTodo);

   
    axios
      .delete(`/home/delete_todo/?id=${id}`,)
      .then((response) => {
        console.log("Todo deleted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  const renderTodoList = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentTodos = todo.slice(startIndex, endIndex);

    return (
      <div>
        {currentTodos.map((item, index) => (
          <div key={index} className="row mt-3">
            <div
              className="col"
              style={{
                marginTop: "10px",
                cursor: "pointer",
                border: "1px solid",
                borderRadius: "20px",
                textDecoration: item.completed ? "line-through" : "none",
              }}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() =>
                  handleCheckboxChange(index + startIndex, item.id)
                }
              />
              <span>&nbsp;{item.title}</span>
            </div>
            <div className="col">
              
              <button
                onClick={() => navigate("/edit/" + item.id)}
                className="btn btn-outline-info "
              >
                edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="btn btn-outline-danger "
              >
                delete
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="">
        <div className="col-4 mx-auto d-block">
          <h2 style={{ textAlign: "center" }}>Todo</h2>
          <div style={{ marginTop: "100px", textAlign: "center" }}>
            {renderTodoList()}
            <br></br>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main_page;
