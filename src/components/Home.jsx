import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Link to="/aboutme" className="btn btn-primary mx-2">About Me</Link>
            <Link to="/blog" className="btn btn-secondary mx-2">Blog</Link>
            <Link to="/contact" className="btn btn-info mx-2">Contact</Link>
        </div>
    );
};

export default Home;
