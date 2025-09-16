import {useState, useEffect} from 'react';
import axios from 'axios';
import {useFormik} from 'formik';
import Alert from './Alert';
import styles from './CSS/UpdateUser.module.css';

function UpdateUser()
{
    const access_token = sessionStorage.getItem("access_token");
    const [user, setUser] = useState({});
    const [error, setError] = useState("");
    const [edit, setEdit] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        axios.get('https://edeaf-api-staging.azurewebsites.net/v1/admin/Users/current',
            {
                headers:
                {
                    "Authorization": `Bearer ${access_token}`
                }
            }
        )
        .then(function (response){
            setUser(response.data.data);
            // console.log(response.data.data);
        })
        .catch(function (error){
            setError("Internal server error try again later");
        })
    }, [updated]);



    const formik = useFormik({
        initialValues: {
        //   name: user.name,
        name: user.name,
        surname: user.lastName,
        email: user.email,
        },
        enableReinitialize: true,
        onSubmit: values => {
        axios.put('https://edeaf-api-staging.azurewebsites.net/v1/admin/Users/current', {
            "name": values.name,
            "lastName": values.surname,
            "email": values.email,
        },
        {
            headers:
            {
                "Authorization": `Bearer ${access_token}`,
            }
        })
        .then(function (response){
            setAlert(true);
            
            // alert("User updated successfully");
            setEdit(false);
            setUpdated(true);
            // console.log(response);
            // navigate('/home');
            // localStorage.setItem("access_token", response.data.access_token);
        })
        .catch(function (error){
            if(error.response && error.response.status === 404)
            {
                setError(`User does not exits. Double check all values`);
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

    useEffect(() => {
            console.log(user);
        formik;

    }, [user]);




    return(
        <div className={styles.parent}>
            <Alert message='User updated successfully!' show={alert} onClose={() => setAlert(false)}/>
            {!edit ? (
                <div className={styles.contentParent}>
                    <h1 className={styles.heading}>Current user</h1>

                    <div className={styles.content}>
                        <h3>Name: </h3>
                        <p>{user.name}</p>

                        <h3>Surname: </h3>
                        <p>{user.lastName}</p>

                        <h3>Email: </h3>
                        <p>{user.email}</p>
                    </div>
                    <button className={styles.editButton} onClick={() => {setEdit(true), setUpdated(false)}}>Edit user</button>
                </div>) : (
                    <div className={styles.formParent}>
                        <h1 className={styles.heading2}>Edit User</h1>
                        <form onSubmit={formik.handleSubmit} className={styles.form}>
                            <div className={styles.formInput}>
                                <label htmlFor='name'>Name</label>
                                <input type="text" id="name" name="name" value={formik.values.name} onChange={formik.handleChange}/>
                            </div>

                            <div className={styles.formInput}>
                                <label htmlFor='surname'>Surname</label>
                                <input type="text" id="surname" name="surname" value={formik.values.surname} onChange={formik.handleChange}/>
                            </div>

                            <div className={styles.formInput}>
                                <label htmlFor='email'>Email</label>
                                <input type="email" id="email" name="email" value={formik.values.email} onChange={formik.handleChange}/>
                            </div>

                            <div className={styles.buttonsParent}>
                                <button className={styles.button} type="submit">Update User</button>
                                <button className={styles.button2} onClick={formik.handleReset}>Revert Changes</button>
                                <button className={styles.button3} onClick={() => setEdit(false)}>Cancel</button>
                            </div>

                        </form>

                        {error.length > 0 && <p>{error}</p>}

                    </div>

                )}
            

        </div>
    );
}

export default UpdateUser;