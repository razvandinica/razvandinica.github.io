import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Contact = () => {
  useDocumentTitle('Contact | Razvan Dinica');
  return (
    <div>
      <h1>Contact</h1>
      <p>This is the contact page.</p>
    </div>
  );
};

export default Contact;
