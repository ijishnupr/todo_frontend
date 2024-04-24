import { NavLink, useNavigate } from "react-router-dom";
function Navbar() {
function logout(){
    window.localStorage.removeItem('token');
    window.location.href='/login'
    
}
let navigate=useNavigate()
    return <nav className="navbar navbar-expand-sm navbar-light">
        <div className="navbar-brand">
            <h2>TODO</h2>
        </div>
        <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span className="navbar-toggler-icon"></span>
        </button>
        <div
            className="collapse navbar-collapse mr-auto"
            id="navbarNav"
            style={{ float: "left" }}
        >
            <ul className="navbar-nav ml-auto" style={{ color: "#ffffff" }}>

                <li className="nav-item">
                    <NavLink to={"/home"} className="nav-link mr-5">
                        Home
                    </NavLink>
                </li>
                <li>
                <button
                onClick={() => navigate("/add")}
                className="btn btn-success ml-2 mr-2"
              >
                add
              </button>
                </li>
                
                <li className="nav-item">
                    <button onClick={logout} className="btn btn-danger">Logout</button>
                </li>
            </ul>
        </div>
    </nav>;
}
export default Navbar;