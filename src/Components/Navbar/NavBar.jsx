import { Link } from "react-router-dom"

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <Link to="/home" className="navbar-brand text-white" href="#">Blogs</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon " />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/home" className="nav-link active text-white" aria-current="page">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/addblog" className="nav-link active text-white" aria-current="page">AddBlog</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link active text-white" aria-current="page">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/" className="nav-link active text-danger" aria-current="page" onClick={() => localStorage.removeItem("userToken") & localStorage.removeItem("userId")}>LogOut</Link>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control search me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>

    )
}

export default NavBar