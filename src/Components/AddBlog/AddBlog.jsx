/* eslint-disable react/prop-types */
import NavBar from "../Navbar/NavBar.jsx"
import "./AddBlog.css"
import { useState } from 'react';
import joi from 'joi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
const AddBlog = () => {

  let Navigate = useNavigate();
  const [error, setError] = useState("")
  const [errorList, setErrorList] = useState([])
  const [loading, setLoading] = useState(false)
  const [article, setArticle] = useState({
    title: "",
    desc: "",
    createdBy: `${localStorage.getItem("userId")}`
  });

  function getUserData(e) {
    let myArticle = { ...article };
    myArticle[e.target.name] = e.target.value;
    setArticle(myArticle)
    console.log(article)

  }
  async function sendArticle() {
    let { data } = await axios.post(`https://blog-facebook1.onrender.com/blogs`, article);
    console.log(data)
    if (data.message === "success") {
      Navigate("/home")
    } else {
      setLoading(false)
      setError(data.message)
      console.log("err")
    }
  }
  function submitArticle(e) {

    setLoading(true);
    e.preventDefault();
    let validation = validateLoginForm();

    if (validation.error) {
      setErrorList(validation.error.details);
      setLoading(false)
    }
    else {
      sendArticle();
    }

  }
  function validateLoginForm() {
    let schema = joi.object({
      title: joi.string().min(3).max(10).required(),
      desc: joi.string().min(3).max(10).required(),
      createdBy: joi.string().min(3).max(100),

    })
    return schema.validate(article, { abortEarly: false })
  }


  return (

    <>
      <NavBar />
      <form onSubmit={submitArticle} className="pt-5 d-flex justify-content-center align-items-center">
        <div className="addBlog blog p-5 w-50">
          {error ? <p className='w-100 alert alert-dark text-danger'>{error} </p> : ""}
          {errorList.map((error, i) => {
            if (error.context.label === 'password') {
              return <p key={i} className='w-100 p-2 alert alert-dark text-dark'>The password is weak and must not be less than five numbers </p>
            } else {
              return <p key={i} className='w-100 p2 alert alert-dark text-dark'>{error.message} </p>

            }
          })}
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Article Title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="This is title" name="title" onChange={getUserData} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Article</label>
            <textarea className="form-control" placeholder="Some text here" id="exampleFormControlTextarea1" rows={3} defaultValue={""} name="desc" onChange={getUserData} />
          </div>
          <button type="submit" className="btn btn-dark w-100 text-white">{loading ? <i className='fas fa-spinner fa-spin'></i> : 'Add Article'}</button>
        </div>
      </form>

    </>

  )
}

export default AddBlog