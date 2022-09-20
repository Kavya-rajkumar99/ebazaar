import React from 'react';
import Alert from 'react-bootstrap/Alert';

export const MessageBox = ({variant,children}) => {
  return (
    <Alert variant={variant || "danger"}>{children}</Alert>
  )
}
