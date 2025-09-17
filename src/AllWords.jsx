import {useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useLocation} from 'react-router-dom';
import Alert from './Alert';

import styles from './CSS/AllWords.module.css'

function AddToCategory()
{
    const [words, setWords] = useState([]);
    const [filteredWords, setFiltered] = useState(words);
    const [search, setSearch] = useState("");
    const access_token = sessionStorage.getItem("access_token");
    const navigate = useNavigate();
    const location = useLocation(); 
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [isGood, setIsGood] = useState("");

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

    useEffect(() => {
        if(location.state?.alert)
        {
            setAlert(true);
            setMessage(location.state.message);
            setIsGood(location.state.isGood);
            navigate(location.pathname, { replace: true });
        }

    }, [location.state]);

    return(
        <div className={styles.wordsParent}>
            {alert && <Alert message={message} show={alert} type={isGood} onClose={() => {setAlert(false)}}/>}
            
            <div className={styles.searchParent}>
                <input type="text" value={search} placeholder="Search words..." onChange={e => setSearch(e.target.value)}/>
            </div>

            <div className={styles.parent}>
                {filteredWords.map((word) => (
                    <div key={word.id} className={styles.contentParent}>
                        <h1>{word.name}</h1>
                        <div className={styles.categoryParent}>
                            {word.categories.length == 0 && <p className={styles.noCat}>No category</p>}
                            {word.categories.map((cat) => (
                                <p className={styles.cat} key={cat.id} >{cat.name}</p>
                            ))}
                        </div>
                        <button className={styles.button} type="button" onClick={() => navigate(`/category/${word.id}`)}>Add this word to a category</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddToCategory;