// Loader.js
import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ loading,color }) => {

  return (
    <div className="loader">
      <ClipLoader color={color} loading={loading} size={80} />
    </div>
  );
};

export default Loader;
