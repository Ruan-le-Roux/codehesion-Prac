import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

import styles from './CSS/AllWords.module.css'

function AddToCategory()
{
    const [words, setWords] = useState([]);
    const [filteredWords, setFiltered] = useState(words);
    const [search, setSearch] = useState("");
    const access_token = sessionStorage.getItem("access_token");
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('https://edeaf-api-staging.azurewebsites.net/v1/admin/Words?PageSize=1000', {
            headers:
            {
                "Authorization": `Bearer ${access_token}`
            }
        })
        .then(function (response) {
            setWords(response.data.data.items);
            // console.log(response.data.data.items);
        })
        .catch(function (error) {

        })

    }, []);

    useEffect(() => {
        if(search === "")
        {
            setFiltered(words);
        }
        else
        {
            const filtered = words.filter(word => word.name.toLowerCase().includes(search.toLowerCase())) 
            setFiltered(filtered);
        }

    }, [search, words]);
    return(
        <div>
            <div>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>

            </div>
            <div className={styles.parent}>
                {filteredWords.map((word) => (
                    <div key={word.id}>
                        <h1>{word.name}</h1>
                        <div className={styles.categoryParent}>
                            {word.categories.map((cat) => (
                                <p key={cat.id}>{cat.name}</p>
                            ))}
                        </div>
                        <button type="button" onClick={() => navigate(`/category/${word.id}`)}>Add this word to a category</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddToCategory;