import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../actions/userActions';


const RegisterScreen = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [setRePassword] = useState('');
  const userRegister = useSelector(state => state.userRegister)
  const { loading, userInfo, error } = userRegister;
  const dispatch = useDispatch();
  const redirect = props.location.search ? props.location.search.split("=")[1] : '/';

  useEffect(() => {
      if (userInfo) {
          props.history.push(redirect);
      }
   
    return () => {
      //
    };
  }, [userInfo, props.history, redirect]);

  const submitHandler = (e) => {
      e.preventDefault();
      dispatch(register(name, email, password))
  }

  return <div className="form">
      <form onSubmit={submitHandler} >
          <ul className="form-container">
              <li>
                  <h2>Create a new account </h2>
              </li>
              <li>
                  {loading && <div>Loading...</div>}
                  {error && <div>{error}</div>}
              </li>
              <li>
                    <label htmlfor="name">Name</label>
                    <input type="name" name="name" id="name" onChange={(e) => setName(e.target.value)}>
                    </input>
              </li>
              <li>
                    <label htmlfor="email">Email</label>
                    <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}>
                    </input>
              </li>
              <li>
                    <label htmlfor="password">Password</label>
                    <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)}>
                    </input>
              </li>
              <li>
                    <label htmlfor="rePassword">Re-Enter Password</label>
                    <input type="rePassword" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)}>
                    </input>
              </li>
              <li>
                  <button type="submit" className="button-primary">Register</button>
              </li>
              <li>
                  Already have an account? 
                  <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button">Sign In</Link>
              </li>
          </ul>
      </form>
  </div>
}

export default RegisterScreen;


