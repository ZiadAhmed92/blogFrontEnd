import NavBar from '../Navbar/NavBar.jsx'
import axios from "axios"
import '../Home/Home.css'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// eslint-disable-next-line react/prop-types, no-unused-vars
const Profile = ({ userData }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [id, setId] = useState('');

  let AllBlogs = async (nameID) => {
    let { data } = await axios.get(`http://localhost:3000/blogs/${nameID}`);
    // let { data } = await axios.get("http://localhost:3000/blogs", {
    //     headers: {
    //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiemlhZCIsInJvbGUiOiJ1c2VyIiwidXNlcklkIjoiNjVhMDAzYmQ2NzU5MTE3ZTMzNWNkOTJiIiwiaWF0IjoxNzA0OTg2NjQwfQ.Aij7mSCjsdrGnlRxtX7KLwdDwtD7H8hyC0OcLI2IhWc"
    //     }
    // });
    setAllBlogs(data.blogs)
  }
  let DeleteBlog = async (id) => {
    // eslint-disable-next-line no-unused-vars
    let { data } = await axios.delete(`http://localhost:3000/delete/${id}`);

  }
  useEffect(() => {
    AllBlogs(localStorage.getItem("userId"))
  }, [])
  useEffect(() => {
    DeleteBlog(id)
    AllBlogs(localStorage.getItem("userId"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <NavBar />
      <div className="container py-3">
        <div className="row gy-3">
          <div className="col-md-12 text-center">
            <Link to='/addBlog'><button className="btn btn-dark ">Add Article</button></Link>
          </div>
          {
            allBlogs.map(({ title, _id, desc, createdBy }) => {
              return (
                <div className="col-md-4" key={_id}>
                  <div className="blog  ">
                    <div className="title d-flex justify-content-around align-items-center">
                      <div className="text-capitalize">{createdBy?.name}</div>
                      <div className=" p-3 text-capitalize">{title}</div>
                    </div>
                    <div>
                      <div className="p-3 text-center text-capitalize">{desc}</div>

                      {localStorage.getItem("userId") == createdBy?._id ? <div className="d-flex justify-content-center gap-1 p-3">
                        <Link to={`/blog/${_id}`}><button className="btn btn-success">Read More</button></Link>
                        <Link to={`/update/${_id}`}><button className="btn btn-info">Edit</button></Link>
                        <button className="btn btn-danger" onClick={() => setId(_id)}>Delete</button>
                      </div> : <div className="text-center py-3"><Link to={`/blog/${_id}`}><button className="btn btn-success">Read More</button></Link></div>}

                    </div>
                    <div className="date p-3">2 days ago</div>
                  </div>
                </div>
              )
            })
          }



        </div>
      </div>
    </>
  )
}

export default Profile