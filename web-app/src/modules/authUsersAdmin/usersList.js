import React , { useState, useEffect } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

import {Engine } from '../common';


function UsersList (props) {
  const engine = new Engine();
  const [list, setList] = useState([]);
  const params = useParams();
  const id = params.id;

  const getAuthUsers = ()=> {
    engine.loadingOn();
    engine.DatabaseApi('usersAdmin', {
      action: 'getAuthUsers',
      data: {

      }
    }, (result)=>{
      engine.loadingOff();
      setList(result.data);
    });
  }

  useEffect(()=> {
    getAuthUsers();
  }, []);

  const showList = () =>  (
    <Container className="mb-3 p-3">
        <Link to="/authUsers">UserItem {id}</Link>
        <Container>
          <Row>
            <Col xs={6}>
            {list.map((v, k)=> (<Container className="p-1"><Link to={'/authUsers/'+id}>{v.address}</Link></Container>))}
            </Col>
            <Col xs={6}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Roles</th>
                  <th>Mark</th>
                  <th>Status</th>
                  <th>Created</th>

                </tr>
              </thead>
              <tbody>
              {list.map((v, k)=> {
              return (
                <tr key={k}>
                  <td><Link to={'/authUsers/'+id}>{v.address}</Link></td>
                  <td>{v.roles}</td>
                  <td>{v.specialFoodie}</td>
                  <td>{v.status}</td>
                  <td>{new Date(v.created).toLocaleString('en-US')}</td>
                </tr>
              )})}
              </tbody>
            </Table>
            </Col>
          </Row>
        </Container>
    </Container>);

  const errorBox = () => {
    const title = (<span className="text-success">You application submitted! </span>)
    const message = (<span className="text-success">
    You might become a supie automatically upon our AI valification. or you will be contacted sooner. </span>)
    return (<alert message={message} title={title} className="mt-3"/>)
  }

   return showList();
}

export { UsersList }