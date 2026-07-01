// 基础模块
import React, { useState } from 'react';

// 公共组件
import HighlightCode from '@-react/components/Highlight';

// 组件
import CheckAnswer from './CheckAnswer';

const code = `
console.log('script start');

setTimeout(() => {
    console.log('time1');
}, 1 * 2000);

Promise.resolve()
.then(function() {
    console.log('promise1');
}).then(function() {
    console.log('promise2');
});

async function foo() {
  await bar();
  console.log('async1 end');
}
foo();

async function errorFunc () {
  try {
    await Promise.reject('error!!!');
  } catch (e) {
    console.log(e);
  }
  console.log('async1');
  return Promise.resolve('async1 success');
}

errorFunc().then(res => console.log(res));

function bar() {
  console.log('async2 end'); 
}

console.log('script end');
`;

function execute() {
  console.log('script start');

  setTimeout(() => {
      console.log('time1');
  }, 1 * 2000);

  Promise.resolve()
  .then(function() {
      console.log('promise1');
  }).then(function() {
      console.log('promise2');
  });

  async function foo() {
    await bar();
    console.log('async1 end');
  }
  foo();

  async function errorFunc () {
    try {
      await Promise.reject('error!!!');
    } catch (e) {
      console.log(e);
    }
    console.log('async1');
    return Promise.resolve('async1 success');
  }

  errorFunc().then(res => console.log(res));

  function bar() {
    console.log('async2 end'); 
  }

  console.log('script end');
}


export default () => {
  return (
    <div>
      <h3>Example 2:</h3>
      <HighlightCode language="javascript" code={ code } />
      <CheckAnswer onClick={ execute }>script start, async2 end, script end, promise1, async1 end, error!!!, async1, promise2, async1 success, time1</CheckAnswer>
    </div>
  );
};