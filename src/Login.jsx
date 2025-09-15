import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useFormik, Form, Field } from 'formik'
import {useNavigate} from 'react-router-dom'
import './CSS/App.css'
import axios from 'axios'
// import { formData } from "new FormData"

function Login() {
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [scope, setScope] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [isError, setError] = useState(false);

  const navigate = useNavigate();
  


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: values => {
      const formData = new URLSearchParams();
      formData.append("grant_type", "password");
      formData.append("client_id", "web-dashboard");
      formData.append("client_secret", "SuperSecretPassword");
      formData.append("scope", "openid profile role email offline_access adminApi mobileApi");
      formData.append("username", values.username);
      formData.append("password", values.password);

      // console.log("here is the form data: ");
      // for(let [key, value] of formData.entries())
      // {
      //   console.log(`${key}: ${value}`);
      // }
      // const formData = new FormData();
      // formData.append("grant_type", "password");
      // formData.append("client_id", "web-dashboard");
      // formData.append("client_secret", "SuperSecretPassword");
      // formData.append("scope", "openid profile role email offline_access adminApi mobileApi");
      // formData.append("username", values.username);
      // formData.append("password", values.password);

      // console.log("here is the form data: ");
      // for(let [key, value] of formData.entries())
      // {
      //   console.log(`${key}: ${value}`);
      // }

      axios.post('https://edeaf-api-staging.azurewebsites.net/connect/token', formData)
      .then(function (response){
        // console.log(response);
        localStorage.setItem("access_token", response.data.access_token);
        navigate('/register');
      })
      .catch(function (error){
        localStorage.setItem("access_token","");
        console.log(error);
      })
    }

  });



  return (
    <div>
      {/* <Formik
        initialValues={{username: '', password: ''}}
        // validate={values => {
        //   const errors = {};
        //   if(!values.username)
        //   {
        //     errors.email = 'Required';
        //   }
        // }}
        // onSubmit= (values, {setSubmitting, resetForm}) => {

        
      > */}
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="username">UserName:</label>
          <input type="email" id="username" name="username" placeholder="Username"  value={formik.values.username} onChange={formik.handleChange}/>

          <br/>
          
          <label htmlFor="passwors">Password:</label>
          <input type="password" id="password" name="password" placeholder="Password" value={formik.values.password} onChange={formik.handleChange}/>

          <br/>
          
          <button type="submit">Sign In</button>
        </form>

      {/* </Formik> */}

    </div>
  )
}

export default Login;
