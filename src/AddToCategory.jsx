import {useFormik} from 'formik';
import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';

function AddToCategory()
{
    const [word, setWord] = useState([]);
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
            categories: []
        },
        enableReinitialize: true,
        onSubmit: values => {
            categories.forEach(cat => {
                
                
                    axios.put(`https://edeaf-api-staging.azurewebsites.net/v1/admin/categories/${cat.id}/words`, {
                        "word": word.id,
                    },
                    {
                        headers:
                        {
                            "Authorization": `Bearer ${access_token}`,
                        }
                    })
                    .then(function (response){
                        setAlert(true);
                        setUpdated(true);
                        navigate('/category', {state: {alert: true, message: "Word added to category successfully!", isGood: "success"}});
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
                
            })
        }
    });

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <p>Word: {word.name}</p>
                
                <h1>Categories:</h1>
                {categories.map((cat, index) => (
                    <div key={cat.id}>
                        <label htmlFor="category">{cat.name}:</label>            
                        <input type="checkbox" id="word" name="word" value={cat.name} onChange={formik.handleChange}/>
                    </div>                    
                ))}

                <button type="submit">Add to categories</button>


            </form>
        </div>
    );

}

export default AddToCategory;