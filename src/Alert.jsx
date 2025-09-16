import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles  from './CSS/Alert.module.css';

function Alert({ message = "Form submitted!", show, onClose }) 
{
    const navigate = useNavigate();

    useEffect(() => {
        if (show) 
        {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className={styles.notification}>{message}</div>
    );
}

export default Alert;
