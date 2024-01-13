import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import { useState } from 'react';
import joi from 'joi'
import axios from 'axios';
// eslint-disable-next-line react/prop-types
const Login = ({ dataUser }) => {
  let Navigate = useNavigate();
  const [error, setError] = useState("")
  const [errorList, setErrorList] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  function getUserData(e) {
    let myuser = { ...user };
    myuser[e.target.name] = e.target.value;
    setUser(myuser)

  }
  async function sendUserData() {
    let { data } = await axios.post(`http://localhost:3000/signIn`, user);
    console.log(data)
    if (data.message === "login") {
      localStorage.setItem('userToken', data.token)
      Navigate("/home")
      dataUser()
    } else {
      setLoading(false)
      setError(data.message)
    }
  }
  function submitLogin(e) {

    setLoading(true);
    e.preventDefault();
    let validation = validateLoginForm();

    if (validation.error) {
      setErrorList(validation.error.details);
      setLoading(false)
    }
    else {
      sendUserData();
    }

  }
  function validateLoginForm() {
    let schema = joi.object({
      email: joi.string().email({ tlds: { allow: ['com', 'net'] } }),
      password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),

    })
    return schema.validate(user, { abortEarly: false })
  }

  return (

    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <h3 className='text-center pb-3'>Login</h3>
            <form onSubmit={submitLogin}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                <a href='https://www.facebook.com/profile.php?id=100009338019129'><button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-facebook-f" />
                </button></a>
                <a href='https://twitter.com/ZiadAhm27793817'><button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-twitter" />
                </button></a>
                <a href='https://www.linkedin.com/in/ziad-ahmed-5b1328265/'><button type="button" className="btn btn-primary btn-floating mx-1">
                  <i className="fab fa-linkedin-in" />
                </button>
                </a>
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              {error ? <p className='w-100 alert alert-danger text-danger'>{error} </p> : ""}
              {errorList.map((error, i) => {
                if (error.context.label === 'password') {
                  return <p key={i} className='w-100 p-2 alert alert-danger text-danger'>The password is weak and must not be less than five numbers </p>
                } else {
                  return <p key={i} className='w-100 p2 alert alert-danger text-danger'>{error.message} </p>

                }
              })}
              {/* Email input */}
              <div className="form-outline mb-4">
                <input type="email" id="form3Example3" className="form-control form-control-lg" placeholder="Enter a valid email address" name='email' onChange={getUserData} />
                {/* <label className="form-label" htmlFor="form3Example3">Email address</label> */}
              </div>
              {/* Password input */}
              <div className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg" placeholder="Enter password" name='password' onChange={getUserData} />
                {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
              </div>
              <div className="d-flex justify-content-between align-items-center">
                {/* Checkbox */}
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" defaultValue id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-body">Forgot password?</a>
              </div>
              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>{loading ? <i className='fas fa-spinner fa-spin'></i> : 'Login'}</button>

                <p className="small fw-bold mt-2 pt-1 mb-0">Create Account ? <Link to="/register" className="link-danger">Register</Link></p>
              </div>
            </form>
          </div>
        </div>
      </div>

    </section>


  )
}

export default Login