import React , { useEffect } from 'react';
import {useParams } from "react-router-dom";
import { Container } from 'react-bootstrap';
import socketClient  from "socket.io-client";



function InfoCatch(props) {
  const { InfoCode } = useParams();
  const SOCKET_URL = '/dishFu';

  useEffect(() => {
    const socket = socketClient.connect(SOCKET_URL);
    /*
    socket.on('connect', function(){
        socket.emit("transfer",InfoCode , socket.id, 'BODY BODY');
        history.push('/');
    });*/
    return ()=> {
        socket.disconnect();
    }
  }, []);

  return (
    <Container fluid={true} className="m-0 p-0">
        <h1>Mobile InfoCatch--AAA-</h1>
        {InfoCode}
    </Container>
  );
}
export { InfoCatch };
