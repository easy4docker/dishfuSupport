import React from 'react';
import BarcodeScannerComponent from "./BarcodeScannerComponent.js";

function ThreeStamps() {

  const [ data, setData ] = React.useState('Not Found');

  return (
    <span>yyy
      <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text)
          else setData('Not Found')
        }}
      />
      <p>{data}</p>
    </span>
  )
}

export { ThreeStamps };