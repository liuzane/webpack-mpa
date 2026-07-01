// 基础模块
import React, { useState } from 'react';


export default ({ initVisible = false, onClick, children }) => {
  const [ visible, setVisible ] = useState(initVisible);

  return (
    <React.Fragment>
      <button onClick={ () => (setVisible(!visible), onClick & onClick(!visible)) }>{ visible ? 'Hidden Answer' : 'Check Answer' }</button>
      <span hidden={ !visible }>Result: {children}</span>
    </React.Fragment>
  );
};