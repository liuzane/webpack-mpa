// 基础模块
import React from 'react';

// 公共组件
import HighlightCode from '@-react/components/Highlight';

// 组件
import CheckAnswer from './CheckAnswer';

const code = `
setTimeout(() => {
  console.log(1);
}, 1000);

new Promise(function(resolve){
  console.log(2);
  for (let i = 0; i < 10000; i++){
    i == 99 && resolve();
  }
}).then(function(){
  console.log(3);
});

console.log(4);
`;

function execute() {
  setTimeout(() => {
    console.log(1);
  }, 1000);
  
  new Promise(function(resolve){
    console.log(2);
    for (let i = 0; i < 10000; i++){
      i == 99 && resolve();
    }
  }).then(function(){
    console.log(3);
  });
  
  console.log(4);
}


export default () => {
  return (
    <div>
      <h3>Example 1:</h3>
      <HighlightCode language="javascript" code={ code } />
      <CheckAnswer onClick={ execute }>2, 4, 3, 1</CheckAnswer>
    </div>
  );
};