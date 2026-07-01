// 基础模块
import React from 'react';

// 公共组件
import HighlightCode from '@-react/components/Highlight';

// 组件
import CheckAnswer from './CheckAnswer';

const code = `
let p1 = new Promise(function(resolve, reject){
  resolve('2');
});

setTimeout(function(){
  console.log('1');
}, 10);

p1.then(function(value){
  console.log(value);
});

setTimeout(function(){
  console.log('3');
}, 0);
`;

function execute() {
  let p1 = new Promise(function(resolve, reject){
    resolve('2');
  });

  setTimeout(function(){
    console.log('1');
  }, 10);

  p1.then(function(value){
    console.log(value);
  });

  setTimeout(function(){
    console.log('3');
  }, 0);
}


export default () => {
  return (
    <div>
      <h3>Example 3:</h3>
      <HighlightCode language="javascript" code={ code } />
      <CheckAnswer onClick={ execute }>2, 3, 1</CheckAnswer>
    </div>
  );
};