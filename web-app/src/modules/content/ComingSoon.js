import React from 'react';
import { Messagebox } from '../common';
import { useParams } from "react-router-dom";

function ComingSoon(props) {
  const param = useParams();
  return (
    <div className="m-0 p-0">
        <Messagebox message="Coming soon..." title={param.title} />
    </div>
   
  );
}

export default ComingSoon;
