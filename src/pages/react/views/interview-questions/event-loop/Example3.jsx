// 基础模块
import React from 'react';

// 公共组件
import HighlightCode from '@-react/components/Highlight';

// 组件
import CheckAnswer from './CheckAnswer';

const code = `
setTimeout(() => {
  console.log(1);
}, 0);

const P = new Promise((resolve, reject) => {
  console.log(2);
  setTimeout(() => {
      resolve();
      console.log(3);
  }, 0);
});

P.then(() => {
  console.log(4);
});

console.log(5);
`;

function execute() {
  setTimeout(() => {
    console.log(1);
  }, 0);
  
  const P = new Promise((resolve, reject) => {
    console.log(2);
    setTimeout(() => {
        resolve();
        console.log(3);
    }, 0);
  });
  
  P.then(() => {
    console.log(4);
  });
  
  console.log(5);
}


export default () => {
  return (
    <div>
      <h3>Example 3:</h3>
      <HighlightCode language="javascript" code={ code } />
      <CheckAnswer onClick={ execute }>2, 5, 1, 3, 4</CheckAnswer>
    </div>
  );
};