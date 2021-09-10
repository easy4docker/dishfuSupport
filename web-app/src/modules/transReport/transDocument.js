import React , { useState, useEffect } from 'react';
import { Container, } from 'react-bootstrap';
import { SettingStore } from '../../stores';
import { TransSocketSync } from '../transReport';

function TransDocument (props) {
   return (<Container>
      <TransSocketSync/>
   </Container>)
}
export { TransDocument }