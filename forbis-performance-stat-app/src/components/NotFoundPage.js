import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <p>Page not exists</p>
      <p>Go to {<Link to='/'>Main page</Link>}</p>
    </div>
  );
};

export default NotFoundPage;