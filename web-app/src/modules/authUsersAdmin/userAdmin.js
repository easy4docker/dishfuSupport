import React, { useState, useEffect  } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
function UserAdmin(props) {
  const [rec, setRec] = useState(props.rec)
  const showRec = () =>  (
    <Container className="mb-3 p-3">
      <iframe src="http://192.168.86.126:3001/_adminService_/authedUser"
      width="100%" height="400"
      ></iframe>
       {JSON.stringify(props.rec)} == {props.id}
       <hr/>
       Address: {props.rec.address}
       <br/>
       roles: {props.rec.roles}
       <br/>
       authCode: {props.rec.authCode}
    </Container>)

  const errorBox = () => {
    const title = (<span className="text-success">You application submitted! </span>)
    const message = (<span className="text-success">
    You might become a supie automatically upon our AI valification. or you will be contacted sooner. </span>)
    return (<alert message={message} title={title} className="mt-3"/>)
  }

   return showRec();
}

export {UserAdmin }