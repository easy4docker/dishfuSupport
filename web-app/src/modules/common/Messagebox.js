import React from 'react';
import { Container } from 'react-bootstrap';

const Mssagebox = ({ message, title, className }) => {
  return (<Container className={className + ' rounded p-3 message-box grid-bg'}>
      <b style={{textTransform: 'capitalize'}}>{title}</b>
      <h3 className="text-secondary m-3 p-3">{message}</h3>
    </Container>);
};
export default Mssagebox;
