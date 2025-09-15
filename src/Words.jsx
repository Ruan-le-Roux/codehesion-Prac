import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from './CSS/Words.module.css';

function Words ()
{
    const id = useParams();
    // const id = useState("");
    // console.log("iod: ", id);
    const [words, setWords] = useState([]);
    const [filteredWords, setFilteredWords] = useState([]);
    const access_token = localStorage.getItem("access_token");

    useEffect(() => {
        axios("https://edeaf-api-staging.azurewebsites.net/v1/admin/Words?PageSize=1000", {
            headers:
            {
                "Authorization": `Bearer ${access_token}`
            }
        })
        .then(function (response) {
            setWords(response.data.data.items);
            // console.log(words.filter(word => word.categories.id === id.id));
            // console.log(id);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    useEffect (() => {
        const filter = words.filter(word => {return word.categories.some(category => category.id === parseInt(id.id) );});
        // console.log(filteredWords);

        setFilteredWords(filter);
    }, [words]);

    return(
        <div className={styles.parent}>
            {filteredWords.map((word, index) => (
                <div key={word.id}>
                    <p>{word.name}</p>
                </div>
            ))}
        </div>
    );




}

export default Words;