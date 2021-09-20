import React , { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link, useLocation  } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import { AddressInput, Engine } from '../common';
import { SettingStore } from '../../stores';

function UsersList(props) {
  const engine = new Engine();
  const [list, setList] = useState([]);

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
        Users List
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
                <td><Link to={'/authUsers/'+v.id}>{v.address}</Link></td>
                <td>{v.roles}</td>
                <td>{v.specialFoodie}</td>
                <td>{v.status}</td>
                <td>{new Date(v.created).toLocaleString('en-US')}</td>
              </tr>
            )})}
            </tbody>
          </Table>
    </Container>);

  const errorBox = () => {
    const title = (<span className="text-success">You application submitted! </span>)
    const message = (<span className="text-success">
    You might become a supie automatically upon our AI valification. or you will be contacted sooner. </span>)
    return (<alert message={message} title={title} className="mt-3"/>)
  }

  const inputForm = ()=> (
   <Container className="mb-3 p-3">
     Users List
     {list.map((v, k)=> (<Container>v.address</Container>))}
   </Container>);

   return showList();
}

export { UsersList }