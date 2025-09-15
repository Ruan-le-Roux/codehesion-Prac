import { useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useFormik, Form, Field } from 'formik'
import styles from './CSS/Login.module.css';
import axios from 'axios'
import {useNavigate} from 'react-router-dom';
// import { formData } from "new FormData"

function Register() {
    const access_token = sessionStorage.getItem("access_token");
    const [error, setError] = useState("");
    const navigate = useNavigate();
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
        navigate('/home');
        // localStorage.setItem("access_token", response.data.access_token);
      })
      .catch(function (error){
        if(error.response && error.response.status === 400)
        {
            setError(`User with email: ${values.email} already exists`);
        }
        else
        {
            setError("Internal server error try again later.");
        }
        // console.log(error);
        // setError("There was an error loggin you in: ", error);
      })
    }

  });



  return (
    <div className = {styles.parent}>
        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <label className={`${styles.left} ${styles.text}`} htmlFor="name">Name:</label>
          <input className={`${styles.input}`} type="text" id="name" name="name" placeholder="Name"  value={formik.values.name} onChange={formik.handleChange}/>
          
          {/* <br/> */}
          
          <label className={`${styles.left} ${styles.text}`} htmlFor="surname">Surname:</label>
          <input className={`${styles.input}`} type="text" id="surname" name="surname" placeholder="Surname"  value={formik.values.surname} onChange={formik.handleChange}/>
          
          {/* <br/> */}


          <label className={`${styles.left} ${styles.text}`} htmlFor="email">Email:</label>
          <input className={`${styles.input}`} ype="email" id="email" name="email" placeholder="email@example.com"  value={formik.values.email} onChange={formik.handleChange}/>

          {/* <br/> */}
          {/* <br/> */}
          
          <button type="submit" className={styles.button}>Sign In</button>
        </form>

        {error.length > 0 && <p className={styles.error}>{error}</p>}

    </div>
  )
}

export default Register;
