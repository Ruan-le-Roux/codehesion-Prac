import axios from 'axios';
import {useState, useEffect} from 'react'
import {useNavigate, Link} from 'react-router-dom'

import styles from './CSS/Home.module.css';

function Home ()
{
    const [categories, setCategories] = useState([]);
    const access_token = sessionStorage.getItem("access_token") || "";
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("https://edeaf-api-staging.azurewebsites.net/v1/admin/categories", {
            headers: 
            {
                "Authorization": `Bearer ${access_token}`,
            }
        })
        .then(function (response){
            let tempArr = [];

            response.data.data.forEach((user) => {
                tempArr.push([user.id, user.name]);
                // console.log(tempArr);

            })


            setCategories(tempArr);
            setError("");    
            // console.log(categories);
        })
        .catch(function (error) {
            // console.log(error);
            setError("Internal server error try again later");    
        })
        .finally(() => setLoading(false))

    }, []);

    return (
        loading ? (<p>Loading...</p>) : error.length > 0 ? (<p>{error}</p>) : (
                <div className={styles.parent}>
                    <h1 className={styles.heading}>Select a tag to view all words</h1>
                    <div className={styles.categoriesParent}>
                        {categories.length == 0 && <p>No categories</p>}

                        {categories.map((category, index) => (
                            // <div key={category[0]} onClick={() => navigate(`/words/${category[0]}`)}>
                                <Link to= {`/words/${category[0]}`} key={category[0]} className={styles.link} >{category[1]}</Link>
                                // <p key={category[0]}>{category[1]}</p>
                            // </div>
                        ))}

                    </div>

                </div>
            
        )
    );
}

export default Home;