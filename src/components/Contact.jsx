import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1>Contact</h1>
            <p>This is the contact page.</p>
            <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
        </div>
    );
};

export default Contact;
