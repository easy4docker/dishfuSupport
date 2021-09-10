import React , { useState, useEffect } from 'react';
import { SettingStore } from '../../stores';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';

function Setting(props) {
    const roles = [
        {code:'foodie', description:'Foodie'},
        {code:'supie', description:'Food supplier / Restaurent / Grocery'}
    ];
    const [myRole, setMyRole] = useState([]);
    const [userInfo, setUserInfo] = useState({address:''});
    const [tm, setTm] = useState(new Date().getTime());
    if (tm) {}

    const changeAddress = (e)=> {
        setUserInfo({
            address : e.target.value
        });
    }

    const changeRole = (code)=> {

        const idx = myRole.indexOf(code);
        if (idx === -1) {
            myRole.push(code);
        } else {
            myRole.splice(idx, 1);
        }
        setMyRole(myRole);
        setTm(new Date().getTime());
    }
    


    const save = ()=> {
        SettingStore.dispatch({
            type: 'saveUserInfo',
            userInfo: userInfo
        });
        SettingStore.dispatch({
            type: 'saveRoles',
            roles: myRole
        });
    }


    useEffect(()=> { 
        const handleSubscribe = SettingStore.subscribe(() => {
            if (SettingStore.getState()._watcher === 'role') {
                setMyRole(SettingStore.getState().data.roles);
                setUserInfo(SettingStore.getState().data.userInfo);
                setTm(new Date().getTime());
            }
            return false;
        }); 
        
        setMyRole(SettingStore.getState().data.roles);
        setUserInfo(SettingStore.getState().data.userInfo);
        setTm(new Date().getTime());
        return ()=> {
            handleSubscribe();
        }
    },[])
    return (
        <Container className="p-3">
            <h5>Setting</h5>
            <Container className="m-2 mr-3 p-2 alert-secondary">
            <b className="p-0 mb-3">My roles</b>
            {roles.map((v, k)=> {
                return (<div key={k} className="p-0 pl-3 pr-3 text-primary" onClick={()=>{
                    changeRole(v.code);
                }}>
                    {v.description}
                    {(myRole.indexOf(v.code) !== -1) && 
                        (
                            <Button variant="link" className="p-0 pl-3">
                                <FontAwesomeIcon size="1x" icon={faCheck} className="ml-2 text-danger"/>
                            </Button>
                        )}
                    {(myRole.indexOf(v.code) === -1) && 
                        (
                            <Button variant="link" className="p-0 pl-3">
                                <FontAwesomeIcon size="1x" icon={faTimes} className="ml-2 text-secondary"/>
                            </Button>
                        )}
                </div>);
            })}
            </Container>
            <Container className="m-2 mr-3 p-2 alert-secondary">
            <b>My address</b>
                <Form>
                    <Form.Group controlId="formFileSm" className="p-0 pl-3">
                        <Form.Label><b>Country:</b></Form.Label>
                        {['USA', 'CANADA'].map((v, k)=> {
                            return (myRole.indexOf(v.code) !== -1) ?
                            (
                                <Button variant="link" key={k} className="p-0 pl-3">{v}
                                    <FontAwesomeIcon size="1x" icon={faCheck} className="ml-1 mr-2 text-danger"/>
                                </Button>
                            ) :
                            (
                                <Button variant="link" key={k} className="p-0 pl-3">{v}
                                    <FontAwesomeIcon size="1x" icon={faTimes} className="ml-1 mr-2  text-secondary"/>
                                </Button>
                            )
                        })}
                    </Form.Group>
                    <Form.Group className="p-0 pl-3">
                        <Form.Label><b>Street:</b></Form.Label>
                        <Form.Control placeholder="Address, City" 
                            as="textarea" rows="3"
                            value={userInfo.address}
                            onChange={changeAddress}/>
                    </Form.Group>
                </Form>
            </Container>
            <Row>
            <Col xs="12" align="center" className="m-1 ml-2">    
              <Button  type="button" className="btn btn-primary m-1 mr-3" onClick={save}>
              <FontAwesomeIcon size="1x" icon={faSave} className="m-0" /> Save
              </Button>
            </Col>
          </Row>
        </Container>
    );
}
export default Setting;