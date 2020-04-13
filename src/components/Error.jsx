import React from 'react';

const Error = ({ msg }) => {
  return <div>{msg ? msg : 'Page not found.'}</div>;
};

export default Error;
