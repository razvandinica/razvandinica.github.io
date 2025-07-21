import React from 'react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const Blog = () => {
  useDocumentTitle('Blog | Razvan Dinica');
  return (
    <div>
      <h1>Blog</h1>
      <p>This is the blog page.</p>
    </div>
  );
};

export default Blog;
