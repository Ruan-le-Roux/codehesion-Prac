import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";

function Words ()
{
    const id = useParams();
    const [words, setWords] = useState({});
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
            // console.log(response.data.data.items);
        })
        .catch(function (error) {
            console.log(error);
        })

    }, [])



}

export default Words;