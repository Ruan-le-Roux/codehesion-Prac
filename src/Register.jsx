import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useFormik, Form, Field } from 'formik'
import './App.css'
import axios from 'axios'
// import { formData } from "new FormData"

function Register() {
    const access_token = localStorage.getItem("access_token");
    const [error, setError] = useState("");
    // console.log(access_token);



  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
    },
    onSubmit: values => {
      axios.post('https://edeaf-api-staging.azurewebsites.net/v1/admin/Users', {
        "name": values.name,
        "surname": values.surname,
        "email": values.email,
        "role": "Administrator",
      },
      {
        headers:
        {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json",
        }
      })
      .then(function (response){
        console.log(response);
        // localStorage.setItem("access_token", response.data.access_token);
      })
      .catch(function (error){
        console.log(error);
        setError("There was an error loggin you in: ", error);
      })
    }

  });



  return (
    <div>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Name"  value={formik.values.name} onChange={formik.handleChange}/>
          
          <br/>
          
          <label htmlFor="surname">Surname:</label>
          <input type="text" id="surname" name="surname" placeholder="Surname"  value={formik.values.surname} onChange={formik.handleChange}/>
          
          <br/>


          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" placeholder="email@example.com"  value={formik.values.email} onChange={formik.handleChange}/>

          {/* <br/> */}
          <br/>
          
          <button type="submit">Sign In</button>
        </form>

        {error.length !== 0 && <p>{error}</p>}

    </div>
  )
}

export default Register;
