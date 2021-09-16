import React  from 'react';
import { Container, Alert, Form, Button } from 'react-bootstrap';
import { InfoHeader } from '../common';
import {useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import { SettingStore } from '../../stores';

function SuccessInfo(props) {
  const params = useParams();
  const code = params.code;
  let info = {};
  switch (code) {
    case 'phone':
      info = {
        header : 'Success submitted!',
        title : '',
        body : `The authentication request has been sent to ${params.id}. A text message is coming!`
      };
      break;
    case 'linkMobile':
        const removeAuth = () =>{
          SettingStore.dispatch({
            type: 'signOff',
          });
        };
        const authedPage = (<Container className="p-1 text-center">
              <Form.Text className="text-secondary h4 p-3 mt-3">
              {(params.id === 'keepExist') ? 'Nothing changed' : 'Authentication placed'}
              </Form.Text>
              <FontAwesomeIcon size="9x" icon={faUserCheck} className="text-success" />
              <Form.Text className="text-success h4 p-3 mt-3 mb-3">
              The equipment is authrized</Form.Text>
              <Form.Text className="text-success h4 p-0 m-3">
                <Button className="btn btn-warning mt-3" onClick={removeAuth}>Remove the authentication</Button>
              </Form.Text>
            </Container>);

        const nonAuthedPage = (<Container className="p-3 mt-3 text-center">
                <Form.Text className="text-secondary h4 p-3 mt-3">
                  {(params.id === 'failure') ? 'Invalid or expired link.':''}
                </Form.Text>
                <FontAwesomeIcon size="9x" icon={faUserTimes} className="text-danger" />

                <Form.Text className="text-danger h4 p-3 mt-3">
                  The equipment is not authrized
                </Form.Text>
              </Container>);

        info = {
          header : '',
          title : '',
          body : (props.isAuth) ? authedPage:  nonAuthedPage
        };
        break;
    case 'crossFromMobile':
          const crossFromSection = (<Container fluid={true} className="p-3">
          <Form.Text className="text-info h4 p-3">
              {(params.id === 'success') ? 'Succeess!' : (params.id === 'stop') ? 'Stopped!': ''}
          </Form.Text>
          <Form.Text className="text-info h4 p-3">
              {(params.id === 'success') ? 'The authentication has been issued to the target desktop application.' : 
               (params.id === 'stop') ? 'No worry. The mobile authentication did not go through!' : ''}
          </Form.Text>
        </Container>)
          info = {
            header : '',
            title : '',
            body : crossFromSection
          };
          break;
    default:
      info = {
        header : 'nothing',
        title : 'nothing',
        body : 'nothing'
      };
  }
  return (<Container fluid={true} className="m-0 p-0">
  <InfoHeader comp={info.title}/>
  <Container>
    <Alert variant="light mt-3">
    <Alert.Heading>{info.header}</Alert.Heading>
      {info.body}
    </Alert>
  </Container>
  </Container>)
}
export { SuccessInfo }; 