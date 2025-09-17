import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import axios from 'axios';
import Alert from './Alert';

import styles from './CSS/Tags.module.css';


function Tags()
{
    const [tags, setTags] = useState([]);
    const access_token = sessionStorage.getItem("access_token");
    const navigate = useNavigate();
    const location = useLocation();
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [isGood, setIsGood] = useState("");

    useEffect(() => {
        if(location.state?.alert)
        {
            setAlert(true);
            setMessage(location.state.message);
            setIsGood(location.state.isGood);
            navigate(location.pathname, { replace: true });
        }

    }, [location.state]);

    useEffect(() => {
        axios.get('https://edeaf-api-staging.azurewebsites.net/v1/admin/Tags?PageSize=1000',
            {
                headers:
                {
                    "Authorization": `Bearer ${access_token}`
                }
            }
        )
        .then(function (response){
            setTags(response.data.data.items);
        })
        .catch(function (error) {
            console.log(error);
        })
    }, []);

    const handleEdit = (id) => {
        navigate(`/tags/edit/${id}`);
    }

    const handleDelete = (id) => {
        axios.delete(`https://edeaf-api-staging.azurewebsites.net/v1/admin/Tags/${id}`,
        {
            headers: 
            {
                "Authorization": `Bearer ${access_token}`
            }
        })
        .then(function (response) {
            setAlert(true);
            setIsGood("success");
            setMessage("Tag DELETED Successfully!");
            setTags(prev => prev.filter(t => t.id !== id));
        })
        .catch(function (error) {
            setAlert(true);
            setIsGood("error");
            setMessage("Tag NOT deleted!");
        })
    }

    const handleCopyToClipboard = (color) => {
        navigator.clipboard.writeText(color)
        .then(() => {
            setAlert(true);
            setIsGood("success");
            setMessage("ADDED to clipboard!");
        })
        .catch(() => {

        });
    };


    return(
        <div className={styles.parent}>
            {alert && <Alert message={message} show={alert} type={isGood} onClose={() => {setAlert(false)}}/>}
            <h1 className={styles.heading}>All tags</h1>
            <button className={styles.button} onClick={() => navigate('/tags/create')}>Create a tag</button>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Tag Name</th>
                        <th>Tag hex code</th>
                        <th>Tag color swatch</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tags.map((tag) => (
                        <tr key={tag.id}>
                            <td>{tag.name}</td>
                            <td><div className={styles.code}><span>{tag.color}</span><button className={styles.copy} onClick={() => handleCopyToClipboard(tag.color)}>&#x1F5D0; copy</button></div></td>
                            {/* <td className={styles.code}>x1F5D0; copy</td> */}
                            <td><div style={{backgroundColor: tag.color}} className={styles.colorSwatch}></div></td>
                            <td><div><button className={styles.button2} onClick={() => handleEdit(tag.id)} >Edit Tag</button> | <button className={styles.button3} onClick={() => handleDelete(tag.id)}>Delete Tag</button></div></td>
                        </tr>

                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Tags;