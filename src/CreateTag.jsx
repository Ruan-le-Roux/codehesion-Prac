import {useState, useEffect} from 'react';
import axios from 'axios';
import {useFormik} from 'formik';
import {useNavigate} from 'react-router-dom';
import styles from "./CSS/CreateTag.module.css";
import Alert from './Alert';

function CreateTag()
{
    const access_token = sessionStorage.getItem("access_token");
    const navigate = useNavigate();
    // const [alert, setAlert] = useState(false);
    const [error, setError] = useState("");
    
    const formik = useFormik({
        initialValues: {
            name: '',
            color: '',
        },
        onSubmit: values => {
        axios.post('https://edeaf-api-staging.azurewebsites.net/v1/admin/Tags', {
            "name": values.name,
            "color": values.color,
        },
        {
            headers:
            {
                "Authorization": `Bearer ${access_token}`,
            }
        })
        .then(function (response){
            // setAlert(true);
            navigate('/tags', {state: {alert: true, message: "Tag CREATED successfully!", isGood: "success"}});
        })
        .catch(function (error){
            if(error.response && error.response.status === 400)
            {
                setError("A tag with that name or colour already exists");
            }
            else
            {
                setError("Internal server error try again later");
            }
        })
        }
    });


    return(
        <div className={styles.parent}>
            {/* <Alert message="Tag created successfully" show={alert} onClose={() => setAlert(false)} /> */}
            <div className={styles.formParent}>
                <h1 className={styles.heading2}>Create Tag</h1>
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <div className={styles.formInput}>
                        <label htmlFor='name'>Name</label>
                        <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange} required/>
                    </div>

                    {/* <div className={styles.formInput}> */}
                    <div className={styles.colorParent} >
                        <label htmlFor='color'>Color</label>
                        <input className={styles.color} type="color" id="color" name="color" value={formik.values.color || '#ff0000'} onChange={formik.handleChange} required/>
                    </div>

                    <div className={styles.buttonsParent}>
                        <button className={styles.button} type="submit">Create Tag</button>
                        <button className={styles.button2} onClick={() => `${formik.handleReset()} ${setError("")}`}>Reset Form</button>
                        <button className={styles.button3} type="button" onClick={() => navigate(-1)}>Back</button>
                    </div>

                    {error.length > 0 && <p className={styles.error}>{error}</p>}
                </form>

            </div>
            
        </div>
    );
}

export default CreateTag;