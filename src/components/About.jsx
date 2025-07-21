import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const About = () => {
  useDocumentTitle('About Me | Razvan Dinica');
  return (
    <div>
      <h1>About Me</h1>
      <p>This is the about me page.</p>
    </div>
  );
};

export default About;
