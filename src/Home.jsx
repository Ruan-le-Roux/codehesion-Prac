import axios from 'axios';
import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

import styles from './CSS/Home.module.css';

function Home ()
{
    const [categories, setCategories] = useState([]);
    const access_token = localStorage.getItem("access_token");
    const navigate = useNavigate();

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
            // console.log(categories);
        })
        .catch(function (error) {
            console.log(error);
        })

    }, []);

    return (
        <div className={styles.categoriesParent}>
            {categories.map((category, index) => (
                <div key={category[0]} onClick={() => navigate(`/words/${category[0]}`)}>
                    <p key={category[0]}>{category[1]}</p>
                </div>
            ))}

        </div>
    );
}

export default Home;