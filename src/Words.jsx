import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import styles from './CSS/Words.module.css';

function Words ()
{
    const id = useParams();
    // const id = useState("");
    // console.log("iod: ", id);
    const [words, setWords] = useState([]);
    const [filteredWords, setFilteredWords] = useState([]);
    const [noResults, setResults] = useState(false);
    const access_token = sessionStorage.getItem("access_token") || "";
    const navigate = useNavigate();

    useEffect(() => {
        axios("https://edeaf-api-staging.azurewebsites.net/v1/admin/Words?PageSize=1000", {
            headers:
            {
                "Authorization": `Bearer ${access_token}`
            }
        })
        .then(function (response) {
            if(response.data.data.items.length > 0)
            {
                setWords(response.data.data.items);
            }
            else
            {
                setResults(true);
            }
            // console.log(words.filter(word => word.categories.id === id.id));
            // console.log(id);
        })
        .catch(function (error) {
            console.log(error);
            setResults(true);
        })
    }, []);

    useEffect (() => {
        const filter = words.filter(word => {return word.categories.some(category => category.id === parseInt(id.id) );});
        // console.log(filteredWords);

        if(filter.length > 0)
        {
            setFilteredWords(filter);
            setResults(false);
        }
        else
        {
            setResults(true);
        }

    }, [words]);

    const handleGoBack = () => {
        navigate(-1);
    }

    return(
        <div className={styles.parent}>
            <button onClick={handleGoBack} className={styles.button}>Go Back</button>
            <div className={styles.contentParent}>
                {noResults ? (<p className={styles.noResults}>No results</p> ) : (
                    filteredWords.map((word, index) => (
                        <div key={word.id} className={styles.div}>
                            <p className={styles.text}>{word.name}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );




}

export default Words;