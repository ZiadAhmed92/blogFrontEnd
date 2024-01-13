import { useParams } from "react-router-dom"
import NavBar from "../Navbar/NavBar.jsx"
import { useEffect, useState } from "react"
import axios from "axios"

const Blog = () => {
    let { id } = useParams()
    console.log(id)

    const [blog, setBlog] = useState([]);

    let Blog = async () => {
        let { data } = await axios.get(`http://localhost:3000/userBlog/${id}`);
        console.log(data)
        setBlog(data.blogs)
    }
    useEffect(() => {
        Blog()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <NavBar />
            <div className="container py-3">
                <div className="row ">

                    <div className="col-md-3"></div>

                    <div className="col-md-6" key={blog._id}>
                        <div className="blog  ">
                            <div className="title d-flex justify-content-around align-items-center">
                                <div className="text-capitalize">{blog.createdBy?.name}</div>
                                <div className=" p-3 text-capitalize">{blog.title}</div>
                            </div>
                            <div>
                                <div className="p-3 text-center text-capitalize">{blog.desc}</div>
                                <div className="d-flex justify-content-center gap-1 p-3">
                                    <button className="btn btn-success">Read More</button>
                                    <button className="btn btn-info">Edit</button>
                                    <button className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                            <div className="date p-3">2 days ago</div>
                        </div>
                    </div>





                </div>
            </div>
        </>

    )
}

export default Blog