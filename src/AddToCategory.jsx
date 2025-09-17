import {useFormik} from 'formik';
import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

import styles from './CSS/AddToCategory.module.css';

function AddToCategory()
{
    const [word, setWord] = useState({});
    const {wordId} = useParams();
    const [categories, setCategories] = useState([]);
    const access_token = sessionStorage.getItem('access_token');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://edeaf-api-staging.azurewebsites.net/v1/admin/categories`, {
            headers: 
            {
                "Authorization": `Bearer ${access_token}`
            }
        })
        .then(function (response) {
            setCategories(response.data.data);
            console.log(response.data.data);
        })
        .catch(function (error) {
            // setNoResults
        })

        axios.get(`https://edeaf-api-staging.azurewebsites.net/v1/admin/Words/${wordId}`, {
            headers: 
            {
                "Authorization": `Bearer ${access_token}`
            }
        })
        .then(function (response) {
            setWord(response.data.data);
            // console.log()
        })
        .catch(function (error) {
            // setNoResults
        })
    }, []);




    const formik = useFormik({
        initialValues: {
            name: word.name,
            formCategories: word.categories ? word.categories.map((c) => String(c.id)) : [],
        },
        enableReinitialize: true,
        onSubmit: values => {
            for(let cat of values.formCategories)
            {
                console.log(cat);
                axios.patch(`https://edeaf-api-staging.azurewebsites.net/v1/admin/categories/${cat}/words`, {
                    "wordId": word.id,
                },
                {
                    headers:
                    {
                        "Authorization": `Bearer ${access_token}`,
                    }
                })
                .then(function (response){
                    navigate('/category', {state: {alert: true, message: "Categories ADDED successfully!", isGood: "success"}});
                    // setAlert(true);
                    // setUpdated(true);
                })
                .catch(function (error){
                    if(error.response && error.response.status === 404)
                    {
                        // setError(`User does not exits. Double check all values`);
                    }
                    else
                    {
                        // setError("Internal server error try again later.");
                    }
                    // console.log(error);
                    // setError("There was an error loggin you in: ", error);
                })
            }
        }
    });

    const handleCategoryChange = (e) => {
        const value = e.target.value;
        if (formik.values.formCategories.includes(value)) 
        {
            formik.setFieldValue(
                "formCategories",
                formik.values.formCategories.filter((id) => id !== value)
        );
        } 
        else 
        {
            formik.setFieldValue("formCategories", [
                ...formik.values.formCategories,
                value,
            ]);
        }
    };

    return(
        <div className={styles.parent}>
            <h1 className={styles.heading}>Add word to categories</h1>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                
                <h2 >Select Categories:</h2>
                <h3>Word: {word.name}</h3>

                {categories.map((cat, index) => (
                    <div key={cat.id} className={styles.categoryParent}>
                        <label htmlFor={`category-${cat.id}`}>{cat.name}:</label>            
                        <input type="checkbox" id={`category-${cat.id}`} name="category" value={String(cat.id)} onChange={handleCategoryChange} checked={formik.values.formCategories.includes(String(cat.id))}/>
                    </div>                    
                ))}

                <button type="submit" className={styles.button}>Add to categories</button>
                <button  type="button" className={styles.button2} onClick={() => navigate(-1)}>Cancel</button>
            </form>
        </div>
    );
}

export default AddToCategory;