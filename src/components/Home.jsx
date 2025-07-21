import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Home = () => {
  useDocumentTitle('Home | Razvan Dinica');
  return (
    <div className="text-center">
      <h1>Welcome to my Website</h1>
      <p>Navigate using the links in the header.</p>
    </div>
  );
};

export default Home;
