import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='error-section'>
      <div className='justify-content-center text-center error-wrapper'>
      <h1>Page not found</h1>
      <Link to='/' className='button'>Back Home</Link>
      </div>
    </div>
  );
};

export default Error;
