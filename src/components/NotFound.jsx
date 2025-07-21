import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" className="btn btn-primary mt-3">Go to Homepage</Link>
        </div>
    );
};

export default NotFound;
